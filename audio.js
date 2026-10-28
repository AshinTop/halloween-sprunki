import {STEP_SECONDS,STEPS,eventsFor} from './core.js';
const midi=n=>440*Math.pow(2,(n-69)/12);
export class PumpkinAudio {
  constructor(){this.ctx=null;this.playing=false;this.mix=[0,0,1,0];this.pending=null;this.mutes=[false,false,false,false];this.solo=-1;this.volume=.65;this.sources=new Set();this.onBar=()=>{};this.epoch=0;this.nextIndex=0;}
  async ready(){
    if(!this.ctx){
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error('Web Audio is not available');
      const c=this.ctx=new AC();this.master=c.createGain();this.master.gain.value=this.volume*.72;
      const compressor=c.createDynamicsCompressor();compressor.threshold.value=-14;compressor.knee.value=18;compressor.ratio.value=4;compressor.attack.value=.006;compressor.release.value=.18;
      this.master.connect(compressor);compressor.connect(c.destination);
      this.channels=Array.from({length:4},()=>{const g=c.createGain();g.connect(this.master);return g;});
      this.delay=c.createDelay(1);this.delay.delayTime.value=STEP_SECONDS*3;
      const feedback=c.createGain();feedback.gain.value=.18;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=2200;
      const wet=c.createGain();wet.gain.value=.17;this.delay.connect(filter);filter.connect(feedback);feedback.connect(this.delay);filter.connect(wet);wet.connect(this.master);
      this.noise=c.createBuffer(1,c.sampleRate*.5,c.sampleRate);const data=this.noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
      this.updateGains();
    }
    if(this.ctx.state!=='running')await this.ctx.resume();return this.ctx;
  }
  updateGains(){if(!this.ctx)return;this.channels.forEach((g,i)=>g.gain.setTargetAtTime(this.mutes[i]||(this.solo!==-1&&this.solo!==i)?0:1,this.ctx.currentTime,.018));this.master.gain.setTargetAtTime(this.volume*.72,this.ctx.currentTime,.018);}
  setVolume(v){this.volume=Math.max(0,Math.min(1,v));this.updateGains();}
  setMutes(mutes,solo=-1){this.mutes=[...mutes];this.solo=solo;this.updateGains();}
  queue(mix){if(this.playing)this.pending=[...mix];else{this.mix=[...mix];this.pending=null;}}
  async start(mix){
    if(this.playing)return true;const epoch=++this.epoch;await this.ready();if(epoch!==this.epoch)return false;
    this.mix=[...mix];this.pending=null;this.playing=true;this.origin=this.ctx.currentTime+.09;this.nextIndex=0;this.nextTime=this.origin;this.step=0;this.schedule();this.timer=setInterval(()=>this.schedule(),25);return true;
  }
  stop(){this.epoch++;this.playing=false;clearInterval(this.timer);this.timer=null;this.pending=null;if(!this.ctx)return;for(const s of this.sources){try{s.stop(this.ctx.currentTime+.015);}catch{}}this.sources.clear();}
  schedule(){
    if(!this.playing||this.ctx.state!=='running')return;
    const now=this.ctx.currentTime;
    // A frozen tab may miss minutes of timer callbacks. Skip the backlog in O(1),
    // retaining the original musical grid instead of replaying elapsed notes.
    const firstPlayable=Math.max(0,Math.ceil((now+.005-this.origin)/STEP_SECONDS));
    this.nextIndex=Math.max(this.nextIndex,firstPlayable);
    this.step=this.nextIndex%STEPS;this.nextTime=this.origin+this.nextIndex*STEP_SECONDS;
    while(this.nextTime<now+.13){
      if(this.step===0){if(this.pending){this.mix=this.pending;this.pending=null;}this.onBar([...this.mix],this.nextTime);}
      this.mix.forEach((v,r)=>eventsFor(r,v,this.step).forEach(e=>this.sound(e,r,this.nextTime)));
      this.nextIndex++;this.step=this.nextIndex%STEPS;this.nextTime=this.origin+this.nextIndex*STEP_SECONDS;
    }
  }
  currentStep(){return !this.playing||this.ctx.currentTime<this.origin?-1:Math.floor((this.ctx.currentTime-this.origin)/STEP_SECONDS)%STEPS;}
  track(source){this.sources.add(source);source.onended=()=>{this.sources.delete(source);try{source.disconnect();}catch{}};return source;}
  oscillator(type,freq,time,duration,volume,channel,{attack=.008,filter=0,delay=false,detune=0}={}){
    const c=this.ctx,o=this.track(c.createOscillator()),g=c.createGain();o.type=type;o.frequency.value=freq;o.detune.value=detune;
    g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(Math.max(.001,volume),time+attack);g.gain.exponentialRampToValueAtTime(.0001,time+duration);
    if(filter){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=filter;f.Q.value=.6;o.connect(f);f.connect(g);}else o.connect(g);
    g.connect(channel);if(delay)g.connect(this.delay);o.start(time);o.stop(time+duration+.03);
    return o;
  }
  noiseHit(time,duration,volume,channel,freq){const c=this.ctx,s=this.track(c.createBufferSource()),g=c.createGain(),f=c.createBiquadFilter();s.buffer=this.noise;f.type='highpass';f.frequency.value=freq;s.connect(f);f.connect(g);g.gain.setValueAtTime(volume,time);g.gain.exponentialRampToValueAtTime(.0001,time+duration);g.connect(channel);s.start(time);s.stop(time+duration+.01);}
  sound(e,role,time){
    if(this.mutes[role]||(this.solo!==-1&&this.solo!==role))return;
    const g=this.channels[role],f=midi(e.note);
    switch(e.type){
      case 'kick':{const o=this.oscillator('sine',148,time,.25,.5,g);o.frequency.exponentialRampToValueAtTime(45,time+.13);break;}
      case 'snare':this.noiseHit(time,.13,.12,g,1300);this.oscillator('triangle',180,time,.1,.14,g);break;
      case 'hat':this.noiseHit(time,.045,.065,g,7000);break;
      case 'wood':this.oscillator('sine',f,time,.075,.16,g);this.oscillator('sine',f*1.47,time,.04,.045,g);break;
      case 'ghostBass':this.oscillator('triangle',f,time,e.duration,.23,g,{filter:600,attack:.016});this.oscillator('sine',f,time,e.duration,.09,g);break;
      case 'bubbleBass':{const o=this.oscillator('sawtooth',f,time,e.duration,.13,g,{filter:420,attack:.012});o.frequency.setValueAtTime(f*1.07,time);o.frequency.exponentialRampToValueAtTime(f,time+.06);break;}
      case 'musicBox':this.oscillator('triangle',f,time,e.duration,.13,g,{delay:true});this.oscillator('sine',f*2,time,.12,.025,g,{delay:true});break;
      case 'bell':this.oscillator('sine',f,time,.6,.13,g,{delay:true});this.oscillator('sine',f*2.01,time,.22,.035,g,{delay:true});break;
      case 'boo':this.oscillator('triangle',f,time,e.duration,.095,g,{attack:.09,filter:900,delay:true});this.oscillator('sine',f*2,time,e.duration,.035,g,{attack:.13,delay:true,detune:5});break;
      case 'choir':[0,3,7].forEach((n,i)=>this.oscillator('sine',midi(e.note+n),time,e.duration,.055,g,{attack:.12,delay:true,detune:(i-1)*4}));break;
    }
  }
  async note(index,offset=0){const epoch=this.epoch;await this.ready();if(epoch!==this.epoch)return null;const time=this.ctx.currentTime+.02+offset;this.oscillator('sine',midi([72,75,79,82][index]),time,.42,.22,this.master,{delay:false});return time;}
}
