import {BPM,PRESETS,RECIPES,encodeMix,decodeMix,recipeFor,echoSequence,checkEcho} from './core.js';
import {PumpkinAudio} from './audio.js';
import {character,moon} from './art.js';
const $=id=>document.getElementById(id);
let embedded=false;try{embedded=window.self!==window.top;}catch{embedded=true;}if(new URLSearchParams(location.search).get('embed')==='1')embedded=true;document.body.classList.toggle('embedded',embedded);
const strings={en:{edition:'THE HALLOWEEN SESSIONS · VOL. 01',eyebrow:'A LITTLE SPOOKY. A LOT OF GROOVE.',subtitle:'Four voices. One moonlit stage. Make a little magic.',echoTitle:'Ghost Echo',echoEntry:'A musical memory adventure',barLabel:'ONE BAR · FOUR BEATS',volume:'Master volume',cast:'Meet the midnight band',castHint:'Tap a character, or drag them onto their stage.',presetHeading:'A LITTLE INSPIRATION',clear:'Clear the stage',secrets:'Secret ensembles',howTitle:'How the midnight sessions work',howText:'Choose one character for each sound family. Start the music, then swap characters: changes land together on the next bar. Mute a part, or use Solo to hear it alone. Find three secret four-character ensembles, or visit Ghost Echo to test your musical memory. All sounds are original synthesizer voices made in your browser. Progress stays on this device.',footer:'An original Halloween music toy · Made for curious ears',echoEyebrow:'LISTEN. REMEMBER. PLAY IT BACK.',echoDescription:'The little ghosts have a tune for you. Listen, then tap the same notes in order.',listen:'Listen to the ghosts',echoHelp:'Keyboard: 1, 2, 3, 4 · Five rounds · No time pressure',shareEyebrow:'SEND A LITTLE MOONLIGHT',shareTitle:'Share your ensemble',shareText:'This link remembers your four characters and mute settings. Your friend presses Play to hear the mix.',shareLink:'Arrangement link',copy:'Copy link',ready:'READY WHEN YOU ARE',playing:'LIVE FROM THE MIDNIGHT STAGE',play:'Start the music',pause:'Pause the music',queued:'CHANGE QUEUED · NEXT BAR',readyStage:'Your midnight ensemble is ready.',emptyStage:'A quiet little town. Who will play first?',playingStage:'The windows are glowing. The night is yours.',pendingStage:'A new voice is waiting for the next bar.',solo:'Solo',mute:'Mute',unmute:'Unmute',empty:'Add a voice',roles:['RHYTHM','LOW END','MELODY','GHOST VOICES'],names:['Gourd','Bones','Wisp','Bubbles','Salem','Sugar','Boo','Moon choir'],sub:['Warm drums','Bone clicks','Soft bass','Bubbling bass','Music box','Candy bells','Boo harmony','Moonlit chord'],presetNames:['Lantern parade','Moonlit stroll','Witching hour'],recipeNames:['Lantern parade','Midnight ball','Ghost choir'],recipeHints:['Gourd + Wisp + Sugar + Boo','Bones + Bubbles + Salem + Moon choir','Gourd + Bubbles + Sugar + Moon choir'],locked:'Secret ensemble',found:'New ensemble discovered: ',clearToast:'A fresh stage for your next idea.',sameRole:'Choose the matching sound family for this stage.',audioError:'Audio could not start. Try another browser or check its sound permissions.',copied:'Your ensemble link is copied.',copyManual:'Select and copy the link below.',invalidShare:'This arrangement link is not valid. A fresh mix is ready.',restored:'A shared ensemble is ready. Press Play to listen.',listenFirst:'Round 1 of 5 · Listen when you are ready.',listening:'Listen carefully…',yourTurn:'Your turn. Follow the same order.',wrong:'Almost! Listen again and give it another try.',roundDone:'Lovely! Ready for the next little melody?',echoWon:'Five melodies remembered. You earned the Ghost Echo badge!',nextRound:'Listen to the next melody',again:'Play again',echoBest:'Best adventure: ',echoBestEnd:' / 5 rounds',linkReady:'Your arrangement link is ready.'},zh:{edition:'万圣节音乐会 · 第一辑',eyebrow:'一点神秘，一整晚的好节奏。',subtitle:'四个声部，一座月光舞台。一起制造小小魔法。',echoTitle:'幽灵回声',echoEntry:'一场音乐记忆冒险',barLabel:'一个小节 · 四拍',volume:'总音量',cast:'认识午夜乐队',castHint:'点击角色，或拖到对应的舞台位置。',presetHeading:'试试这些灵感',clear:'清空舞台',secrets:'隐藏乐队',howTitle:'午夜音乐会怎么玩',howText:'每个声部选择一个角色。开始音乐后，替换会在下一个小节一起进入，保持节拍同步。可以静音某个声部，或点击独奏只听它。寻找三种四角色隐藏组合，也可以去“幽灵回声”挑战音乐记忆。所有声音均由浏览器内的原创合成器生成。进度仅保存在这台设备上。',footer:'原创万圣节音乐小游戏 · 为好奇的耳朵而作',echoEyebrow:'听一听，记下来，再弹一遍。',echoDescription:'小幽灵为你唱了一段旋律。仔细听，然后按相同顺序点击音符。',listen:'听小幽灵演奏',echoHelp:'键盘：1、2、3、4 · 五轮冒险 · 没有时间压力',shareEyebrow:'送出一小片月光',shareTitle:'分享你的乐队',shareText:'链接会记住四个角色和静音设置。朋友打开后，点击播放就能听到同一组合。',shareLink:'编曲链接',copy:'复制链接',ready:'准备好就出发',playing:'午夜舞台 · 正在演奏',play:'开始音乐',pause:'暂停音乐',queued:'新声部将在下一小节进入',readyStage:'你的午夜乐队已经准备好了。',emptyStage:'安静的小镇。谁来奏响第一个音符？',playingStage:'窗户亮了，今晚的舞台属于你。',pendingStage:'新伙伴正在等待下一个小节。',solo:'独奏',mute:'静音',unmute:'开启',empty:'加入声音',roles:['鼓点节奏','低音声部','旋律声部','幽灵和声'],names:['南瓜鼓手','骨头先生','小雾灵','泡泡女巫','塞勒姆','糖糖','布布','月光合唱'],sub:['温暖鼓点','骨节敲击','柔软低音','气泡低音','神秘音乐盒','糖果铃声','幽灵和声','月光和弦'],presetNames:['南瓜巡游','月光散步','女巫时刻'],recipeNames:['南瓜巡游','午夜舞会','幽灵合唱'],recipeHints:['南瓜鼓手＋小雾灵＋糖糖＋布布','骨头先生＋泡泡女巫＋塞勒姆＋月光合唱','南瓜鼓手＋泡泡女巫＋糖糖＋月光合唱'],locked:'神秘组合',found:'发现了新乐队：',clearToast:'新的舞台，等待你的下一个点子。',sameRole:'请放到相同声部的位置。',audioError:'声音未能启动，请检查浏览器声音权限或尝试其他浏览器。',copied:'编曲链接已复制。',copyManual:'请选中并复制下方链接。',invalidShare:'这个编曲链接无效，已为你准备新的组合。',restored:'分享的乐队已就位，点击播放即可试听。',listenFirst:'第 1 / 5 轮 · 准备好就听一听。',listening:'仔细听……',yourTurn:'轮到你了，按相同顺序演奏。',wrong:'就差一点！再听一遍，重新试试。',roundDone:'很棒！准备好下一段小旋律了吗？',echoWon:'记住了五段旋律！你获得了幽灵回声徽章。',nextRound:'听下一段旋律',again:'再玩一次',echoBest:'最佳冒险：',echoBestEnd:' / 5 轮',linkReady:'编曲链接已准备好。'}};
function read(key,fallback){try{return JSON.parse(localStorage.getItem('pumpkin-jam-'+key))??fallback;}catch{return fallback;}}
function save(key,value){try{localStorage.setItem('pumpkin-jam-'+key,JSON.stringify(value));}catch{}}
let lang=read('lang','en')==='zh'?'zh':'en';const t=k=>strings[lang][k];
const stored=decodeMix(read('arrangement',''));let mix=stored?.mix??[...PRESETS[0]],mutes=stored?.mutes??[false,false,false,false],solo=-1;
let discoveries=new Set(read('discoveries',[]).filter?.(v=>RECIPES.some(r=>r.id===v))??[]),echoBest=Math.min(5,Math.max(0,Number(read('echo-best',0))||0));
const hash=new URLSearchParams(location.hash.slice(1));const shared=hash.has('mix')?decodeMix(hash.get('mix')):null;if(shared){mix=shared.mix;mutes=shared.mutes;}
const audio=new PumpkinAudio();let volume=Number(read('volume',65));if(!Number.isFinite(volume)||volume<0||volume>100)volume=65;audio.volume=volume/100;audio.mutes=mutes;
let toastTimer,playing=false,step=-1,queued=false,echo={round:0,seed:31,input:[],accept:false,won:false,epoch:0,status:'listenFirst'};
$('brand-icon').innerHTML=moon;$('volume').value=String(volume);
$('steps').innerHTML=Array.from({length:16},()=>'<i></i>').join('');
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function persist(){save('arrangement',encodeMix(mix,mutes));}
function render(){
  const focus=document.activeElement?.id;document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));$('language').textContent=lang==='en'?'中文':'EN';
  $('play-label').textContent=t(playing?'pause':'play');$('play-icon').textContent=playing?'Ⅱ':'▶';$('live-text').textContent=t(playing?'playing':'ready');$('live-dot').classList.toggle('live',playing);document.body.classList.toggle('playing',playing);
  $('queue-label').textContent=t(queued?'queued':'barLabel');$('queue-label').classList.toggle('queued',queued);
  $('stage-message').textContent=t(queued?'pendingStage':mix.every(v=>v===null)?'emptyStage':playing?'playingStage':'readyStage');
  $('performers').innerHTML=mix.map((v,r)=>`<div class="performer-slot" data-role="${r}"><div class="slot-avatar ${v===null?'empty':''} ${mutes[r]||(solo!==-1&&solo!==r)?'muted':''} ${queued&&audio.mix[r]!==v?'pending':''}">${character(v===null?6:r*2+v)}</div><div class="slot-info"><span class="slot-name">${v===null?t('empty'):t('names')[r*2+v]}</span>${v!==null?`<button id="remove-${r}" class="remove" data-remove="${r}" aria-label="${lang==='zh'?'移除':'Remove'} ${t('names')[r*2+v]}">×</button>`:''}</div><div class="slot-controls"><button id="mute-${r}" data-mute="${r}" class="${mutes[r]?'active':''}" aria-pressed="${mutes[r]}">${t(mutes[r]?'unmute':'mute')}</button><button id="solo-${r}" data-solo="${r}" class="${solo===r?'active':''}" aria-pressed="${solo===r}">${t('solo')}</button></div></div>`).join('');
  $('sound-library').innerHTML=[0,1,2,3].map(r=>`<div class="sound-family"><h3>${t('roles')[r]}</h3><div class="family-cards">${[0,1].map(v=>`<button id="voice-${r*2+v}" class="sound-card ${mix[r]===v?'selected':''}" data-voice="${r*2+v}" draggable="true" aria-pressed="${mix[r]===v}" aria-label="${t('names')[r*2+v]}, ${t('sub')[r*2+v]}">${character(r*2+v)}<span><strong>${t('names')[r*2+v]}</strong><small>${t('sub')[r*2+v]}</small></span></button>`).join('')}</div></div>`).join('');
  $('presets').innerHTML=PRESETS.map((_,i)=>`<button id="preset-${i}" data-preset="${i}">${t('presetNames')[i]}</button>`).join('');
  renderRecipes();if($('echo-dialog').open)renderEcho();if(focus&&$(focus))$(focus).focus({preventScroll:true});
}
function renderRecipes(){
  $('discovery-count').textContent=discoveries.size+' / 3';
  $('recipes').innerHTML=RECIPES.map((r,i)=>`<button class="recipe ${discoveries.has(r.id)?'unlocked':''}" data-recipe="${i}" aria-label="${t('recipeNames')[i]}: ${t('recipeHints')[i]}"><span aria-hidden="true">${discoveries.has(r.id)?'✦':'◇'}</span>${discoveries.has(r.id)?t('recipeNames')[i]:t('locked')+' '+(i+1)}</button>`).join('');
}
function changeMix(next){mix=[...next];queued=playing;audio.queue(mix);persist();render();}
function chooseVoice(id){const r=Math.floor(id/2);const next=[...mix];next[r]=id%2;mutes[r]=false;audio.setMutes(mutes,solo);changeMix(next);}
async function togglePlay(){
  if(playing){audio.stop();playing=false;queued=false;render();return;}
  if(mix.every(v=>v===null)){mix=[0,null,null,null];persist();}
  $('play').disabled=true;
  try{playing=await audio.start(mix);if(document.hidden){pauseForLifecycle();return;}audio.setMutes(mutes,solo);render();}catch{toast(t('audioError'));}finally{$('play').disabled=false;}
}
audio.onBar=(active,time)=>{const epoch=audio.epoch,wait=Math.max(0,(time-audio.ctx.currentTime)*1000);setTimeout(()=>{if(!audio.playing||epoch!==audio.epoch)return;queued=audio.pending!==null;const found=recipeFor(active,mutes,solo);if(found&&audio.volume>0&&!discoveries.has(found)){discoveries.add(found);save('discoveries',[...discoveries]);const index=RECIPES.findIndex(r=>r.id===found);toast(t('found')+t('recipeNames')[index]);$('stage').classList.remove('unlocked-pop');void $('stage').offsetWidth;$('stage').classList.add('unlocked-pop');renderRecipes();}$('queue-label').textContent=t(queued?'queued':'barLabel');$('queue-label').classList.toggle('queued',queued);document.querySelectorAll('.slot-avatar.pending').forEach(el=>el.classList.remove('pending'));$('stage-message').textContent=t(queued?'pendingStage':'playingStage');},wait);};
$('play').addEventListener('click',togglePlay);
$('language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';save('lang',lang);render();});
$('volume').addEventListener('input',e=>{volume=Number(e.target.value);audio.setVolume(volume/100);save('volume',volume);});
$('sound-library').addEventListener('click',e=>{const b=e.target.closest('[data-voice]');if(b)chooseVoice(Number(b.dataset.voice));});
$('sound-library').addEventListener('dragstart',e=>{const b=e.target.closest('[data-voice]');if(b){e.dataTransfer.setData('text/plain',b.dataset.voice);e.dataTransfer.effectAllowed='copy';}});
$('performers').addEventListener('dragover',e=>{const slot=e.target.closest('[data-role]');if(slot){e.preventDefault();slot.classList.add('drag-over');}});
$('performers').addEventListener('dragleave',e=>e.target.closest('[data-role]')?.classList.remove('drag-over'));
$('performers').addEventListener('drop',e=>{e.preventDefault();const slot=e.target.closest('[data-role]');document.querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));const raw=e.dataTransfer.getData('text/plain');if(!/^[0-7]$/.test(raw))return;const id=Number(raw);if(!slot)return;if(Math.floor(id/2)!==Number(slot.dataset.role)){toast(t('sameRole'));return;}chooseVoice(id);});
$('performers').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.remove!==undefined){const next=[...mix];next[Number(b.dataset.remove)]=null;changeMix(next);}if(b.dataset.mute!==undefined){const r=Number(b.dataset.mute);mutes[r]=!mutes[r];audio.setMutes(mutes,solo);persist();render();}if(b.dataset.solo!==undefined){const r=Number(b.dataset.solo);solo=solo===r?-1:r;audio.setMutes(mutes,solo);render();}});
$('presets').addEventListener('click',e=>{const b=e.target.closest('[data-preset]');if(b){mutes=[false,false,false,false];solo=-1;audio.setMutes(mutes,solo);changeMix(PRESETS[Number(b.dataset.preset)]);}});
$('clear').addEventListener('click',()=>{solo=-1;mutes=[false,false,false,false];audio.setMutes(mutes,solo);changeMix([null,null,null,null]);toast(t('clearToast'));});
$('recipes').addEventListener('click',e=>{const b=e.target.closest('[data-recipe]');if(b)toast(t('recipeHints')[Number(b.dataset.recipe)]);});
function frame(){const next=audio.currentStep();if(next!==step){step=next;[...$('steps').children].forEach((el,i)=>el.classList.toggle('current',i===step));}requestAnimationFrame(frame);}requestAnimationFrame(frame);
function shareLink(){const u=new URL(location.href);u.hash=new URLSearchParams({mix:encodeMix(mix,mutes)}).toString();return u.href;}
$('share').addEventListener('click',()=>{$('share-link').value=shareLink();$('share-dialog').showModal();});
$('share-close').addEventListener('click',()=>$('share-dialog').close());
$('copy-link').addEventListener('click',async()=>{try{if(!navigator.clipboard)throw new Error();await navigator.clipboard.writeText($('share-link').value);toast(t('copied'));}catch{$('share-link').focus();$('share-link').select();toast(t('copyManual'));}});
function renderEcho(){
  $('echo-progress').innerHTML=Array.from({length:5},(_,i)=>`<i class="${echo.won||i<echo.round?'done':i===echo.round?'current':''}"></i>`).join('');
  $('echo-status').textContent=echo.status==='listenFirst'?(lang==='zh'?`第 ${echo.round+1} / 5 轮 · 准备好就听一听。`:`Round ${echo.round+1} of 5 · Listen when you are ready.`):t(echo.status);
  $('echo-pads').innerHTML=[0,1,2,3].map((i)=>`<button class="echo-pad" data-note="${i}" aria-label="${lang==='zh'?'音符':'Note'} ${i+1}" ${echo.accept?'':'disabled'}>${character([0,2,4,6][i])}<span>${i+1} · ${['C','E♭','G','B♭'][i]}</span></button>`).join('');
  $('echo-listen').textContent=t(echo.won?'again':echo.round>0&&echo.status==='roundDone'?'nextRound':'listen');$('echo-listen').disabled=echo.status==='listening';
  $('echo-best').textContent=t('echoBest')+echoBest+t('echoBestEnd');
}
function openEcho(){if(playing){audio.stop();playing=false;queued=false;}echo.epoch++;echo.status=echo.won?'echoWon':'listenFirst';echo.accept=false;render();renderEcho();$('echo-dialog').showModal();}
function closeEcho(){echo.epoch++;echo.accept=false;audio.stop();$('echo-dialog').close();$('echo-open').focus();}
$('echo-open').addEventListener('click',openEcho);$('echo-mini').addEventListener('click',openEcho);$('echo-close').addEventListener('click',closeEcho);$('echo-dialog').addEventListener('cancel',e=>{e.preventDefault();closeEcho();});
function flashPad(i){const pad=$('echo-pads').querySelector(`[data-note="${i}"]`);if(!pad)return;pad.classList.add('flash');setTimeout(()=>pad.classList.remove('flash'),300);}
$('echo-listen').addEventListener('click',async()=>{
  if(echo.won){echo.round=0;echo.seed++;echo.won=false;}
  const epoch=++echo.epoch;echo.accept=false;echo.input=[];echo.status='listening';renderEcho();
  try{await audio.ready();if(echo.epoch!==epoch||document.hidden)return;const target=echoSequence(echo.seed).slice(0,echo.round+3);target.forEach((note,i)=>{audio.note(note,i*.48).catch(()=>{});setTimeout(()=>{if(echo.epoch===epoch)flashPad(note);},30+i*480);});setTimeout(()=>{if(echo.epoch===epoch){echo.accept=true;echo.status='yourTurn';renderEcho();}},target.length*480+220);}catch{echo.status='audioError';renderEcho();}
});
function playEchoNote(note){
  if(!echo.accept)return;audio.note(note).catch(()=>{});flashPad(note);echo.input.push(note);
  const verdict=checkEcho(echo.input,echoSequence(echo.seed).slice(0,echo.round+3));
  if(verdict==='wrong'){echo.accept=false;echo.status='wrong';setTimeout(renderEcho,200);}
  else if(verdict==='complete'){echo.accept=false;echoBest=Math.max(echoBest,echo.round+1);save('echo-best',echoBest);if(echo.round===4){echo.won=true;echo.status='echoWon';}else{echo.round++;echo.status='roundDone';}setTimeout(renderEcho,250);}
}
$('echo-pads').addEventListener('click',e=>{const b=e.target.closest('[data-note]');if(b)playEchoNote(Number(b.dataset.note));});
document.addEventListener('keydown',e=>{if($('echo-dialog').open&&/^[1-4]$/.test(e.key)&&!e.repeat){e.preventDefault();playEchoNote(Number(e.key)-1);}else if(e.code==='Space'&&!$('echo-dialog').open&&!$('share-dialog').open&&!$('sets-dialog').open&&!$('help-dialog').open&&!['INPUT','BUTTON','SUMMARY'].includes(document.activeElement?.tagName)){e.preventDefault();togglePlay();}});
const setsPanel=document.querySelector('.bottom-grid'),setsAnchor=document.querySelector('.how');
$('sets-open').addEventListener('click',()=>{$('sets-content').appendChild(setsPanel);$('sets-dialog').showModal();});
$('sets-close').addEventListener('click',()=>$('sets-dialog').close());
$('sets-dialog').addEventListener('close',()=>document.querySelector('.app').insertBefore(setsPanel,setsAnchor));
$('help-open').addEventListener('click',()=>$('help-dialog').showModal());$('help-close').addEventListener('click',()=>$('help-dialog').close());
function pauseForLifecycle(){
  audio.stop();playing=false;queued=false;echo.epoch++;echo.accept=false;echo.input=[];echo.status=echo.won?'echoWon':'listenFirst';
  render();
}
// Hidden pages stay paused on return. Players deliberately restart the band or
// replay the Echo melody; stale playback promises and visual timers are invalidated.
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseForLifecycle();});
document.addEventListener('freeze',pauseForLifecycle);
window.addEventListener('pagehide',pauseForLifecycle);
window.addEventListener('pageshow',e=>{if(e.persisted)pauseForLifecycle();});
render();if(hash.has('mix'))setTimeout(()=>toast(t(shared?'restored':'invalidShare')),400);
