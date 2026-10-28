export const BPM = 96;
export const STEPS = 16;
export const STEP_SECONDS = 60 / BPM / 4;
export const ROLES = ['beat', 'bass', 'melody', 'voice'];
export const RECIPES = [
  { id:'parade', mix:[0,0,1,0] },
  { id:'ball', mix:[1,1,0,1] },
  { id:'choir', mix:[0,1,1,1] },
];
export const PRESETS = [[0,0,1,0],[1,0,0,1],[1,1,0,0]];
export function validMix(mix) { return Array.isArray(mix) && mix.length===4 && mix.every(v=>v===0||v===1||v===null); }
export function encodeMix(mix,mutes=[false,false,false,false]) {
  if (!validMix(mix) || !Array.isArray(mutes) || mutes.length!==4 || !mutes.every(v=>typeof v==='boolean')) throw new TypeError('Invalid arrangement');
  return 'v1-'+mix.map(v=>v===null?'x':v).join('')+'-'+mutes.map(v=>v?'1':'0').join('');
}
export function decodeMix(code) {
  if (typeof code!=='string' || !/^v1-[01x]{4}-[01]{4}$/.test(code)) return null;
  const [,a,b]=code.split('-'); return {mix:[...a].map(v=>v==='x'?null:Number(v)),mutes:[...b].map(v=>v==='1')};
}
export function recipeFor(mix,mutes=[false,false,false,false],solo=-1) {
  if(!validMix(mix)||mutes.some(Boolean)||solo!==-1) return null;
  return RECIPES.find(r=>r.mix.every((v,i)=>v===mix[i]))?.id??null;
}
export function nextBarTime(origin,now) { return origin+Math.max(0,Math.ceil((now-origin)/(STEP_SECONDS*STEPS)))*STEP_SECONDS*STEPS; }
export function echoSequence(seed=31) {
  let s=(Number(seed)>>>0)||31; const result=[];
  for(let i=0;i<7;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;let v=(s>>>16)%4;if(i>1&&v===result[i-1]&&v===result[i-2])v=(v+1)%4;result.push(v);}
  return result;
}
export function checkEcho(input,target) {
  if(input.some((v,i)=>v!==target[i])||input.length>target.length)return 'wrong';
  return input.length===target.length?'complete':'continue';
}
// A bar is 16 sixteenth-note steps. Every layer follows the same C-minor palette.
export function eventsFor(role,variant,step) {
  if(variant===null)return [];
  if(!Number.isInteger(step)||step<0||step>=16)throw new RangeError('Step outside bar');
  const out=[];const push=(type,note=0,duration=.2)=>out.push({type,note,duration});
  if(role===0){
    if((variant===0?[0,6,8,11]:[0,7,8]).includes(step))push('kick');
    if([4,12].includes(step))push(variant===0?'snare':'wood',variant===0?0:60);
    if((variant===0?[2,6,10,14]:[2,5,10,13,15]).includes(step))push(variant===0?'hat':'wood',72+((step%3)*3),.08);
  }
  if(role===1){
    const a=variant===0?{0:36,4:39,8:32,12:34}:{0:36,3:43,6:39,8:32,11:39,14:34};
    if(a[step]!==undefined)push(variant===0?'ghostBass':'bubbleBass',a[step],variant===0?.46:.22);
  }
  if(role===2){
    const a=variant===0?{0:72,3:75,6:79,8:82,11:79,14:75}:{1:79,4:84,7:82,9:79,12:75,15:79};
    if(a[step]!==undefined)push(variant===0?'musicBox':'bell',a[step],.44);
  }
  if(role===3){
    if(variant===0&&[0,8].includes(step))push('boo',step===0?48:44,.82);
    if(variant===1&&[0,8].includes(step))push('choir',step===0?60:56,1.02);
  }
  return out;
}
