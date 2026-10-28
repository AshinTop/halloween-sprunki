import test from 'node:test';
import assert from 'node:assert/strict';
import {PumpkinAudio} from '../audio.js';
import {STEP_SECONDS} from '../core.js';
function fixture(){
  const audio=new PumpkinAudio(),events=[],bars=[];
  audio.ctx={currentTime:0,state:'running'};audio.playing=true;audio.origin=.09;audio.nextTime=.09;audio.step=0;audio.nextIndex=0;
  audio.sound=(event,role,time)=>events.push({event,role,time});audio.onBar=(mix,time)=>bars.push({mix,time});
  return{audio,events,bars};
}
test('a 60 second frozen-timer jump never replays past notes or bar callbacks',()=>{
  const {audio,events,bars}=fixture();audio.schedule();events.length=0;bars.length=0;
  audio.ctx.currentTime=60;audio.schedule();
  assert.ok(events.length>0&&events.length<12);assert.equal(bars.length,1);
  assert.ok(events.every(e=>e.time>=60.005&&e.time<60.13));
  assert.equal(bars[0].time,60.09);assert.equal(audio.origin,.09);
  assert.equal(audio.nextTime,audio.origin+audio.nextIndex*STEP_SECONDS);
  const count=events.length;audio.schedule();assert.equal(events.length,count,'same clock tick cannot duplicate notes');
});
test('pending voices survive skipped beats and switch only on the next playable bar',()=>{
  const {audio,events,bars}=fixture();const next=[1,1,0,1];audio.queue(next);
  audio.ctx.currentTime=59.9;audio.schedule();assert.deepEqual(audio.pending,next);assert.equal(bars.length,0);
  audio.ctx.currentTime=60;audio.schedule();assert.deepEqual(audio.mix,next);assert.equal(audio.pending,null);assert.equal(bars.length,1);
  assert.ok(events.every(e=>e.time>=59.905));
});
test('arbitrarily large clock jumps remain bounded and aligned to the absolute origin',()=>{
  for(const now of [2.4,600.17,3600.02,86400.055,1000000.071]){
    const {audio,events,bars}=fixture();audio.ctx.currentTime=now;audio.schedule();
    assert.ok(events.length<12&&bars.length<=1);assert.ok(events.every(e=>e.time>=now+.005&&e.time<now+.13));
    assert.ok(audio.nextTime>=now+.005);assert.equal(audio.nextTime,audio.origin+audio.nextIndex*STEP_SECONDS);
  }
});
test('a suspended audio clock cannot dispatch scheduled notes',()=>{
  const {audio,events,bars}=fixture();audio.ctx.state='suspended';audio.schedule();assert.equal(events.length,0);assert.equal(bars.length,0);
});
test('stop cancels a start that is still waiting for AudioContext resume',async()=>{
  const audio=new PumpkinAudio();let release;audio.ready=()=>new Promise(resolve=>{release=resolve;});
  const start=audio.start([0,0,1,0]);audio.stop();release();
  assert.equal(await start,false);assert.equal(audio.playing,false);assert.equal(audio.timer,null);
});
test('stop cancels an Echo note waiting for AudioContext resume',async()=>{
  const audio=new PumpkinAudio();let release,calls=0;audio.ready=()=>new Promise(resolve=>{release=resolve;});audio.oscillator=()=>{calls++;};
  const note=audio.note(0);audio.stop();release();assert.equal(await note,null);assert.equal(calls,0);
});
