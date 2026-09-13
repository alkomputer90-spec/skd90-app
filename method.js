/* SKD90 Method v1.0: data migration and calculations, independent of the UI. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Method = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const SCHEMA = 2;
  const uid = () => 'id_' + (globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2));
  const text = (x, n=2000) => String(x ?? '').slice(0,n);
  const obj = x => x && typeof x === 'object' && !Array.isArray(x) ? x : {};
  const arr = x => Array.isArray(x) ? x : [];
  const number = (x, fallback=0) => Number.isFinite(Number(x)) ? Number(x) : fallback;
  const nonnegative = x => Math.max(0,number(x));
  const id = x => /^[a-zA-Z0-9_-]{1,100}$/.test(x || '') ? x : uid();
  const ref = x => /^[a-zA-Z0-9_-]{1,100}$/.test(x || '') ? x : '';
  function validDate(x) { return typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x) && Number.isFinite(Date.parse(x+'T12:00Z')) && new Date(x+'T12:00Z').toISOString().slice(0,10) === x; }
  function localDate(d=new Date()) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function shift(k,n) { const d=new Date(k+'T12:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10); }
  const diff = (a,b) => Math.round((Date.parse(b+'T12:00Z')-Date.parse(a+'T12:00Z'))/86400000);
  const monday = k => shift(k,-((new Date(k+'T12:00Z').getUTCDay()+6)%7));
  const checks = x => Object.fromEntries(['mit','deep','habit','noscroll','review'].map(k=>[k,x?.[k]===true]));
  function day(x={}) {
    const d={...obj(x),habitText:text(x.habitText || 'Olahraga 20 menit',150),checks:checks(x.checks)};
    const source=Array.isArray(x.mitItems) ? x.mitItems : x.mitText ? [{text:x.mitText,done:x.checks?.mit===true}] : [];
    d.mitItems=source.map(m=>({...obj(m),id:id(m.id),text:text(m.text,300),done:m.done===true,goalId:ref(m.goalId),weeklyId:ref(m.weeklyId),time:/^([01]\d|2[0-3]):[0-5]\d$/.test(m.time||'')?m.time:'',trigger:text(m.trigger,200)})).filter(m=>m.text.trim());
    d.mitText=d.mitItems[0]?.text || '';
    d.checks.mit=d.mitItems.length>0 && d.mitItems.every(m=>m.done);
    // Preserve a legacy category score when no actual task text was recorded.
    d.legacyMitComplete=x.legacyMitComplete===true || (!Array.isArray(x.mitItems)&&!source.length&&x.checks?.mit===true);
    if (!source.length && d.legacyMitComplete) d.checks.mit=true;
    d.score=Object.values(d.checks).filter(Boolean).length;
    d.evening={...obj(x.evening),progress:text(x.evening?.progress),improve:text(x.evening?.improve)};
    return d;
  }
  function goal(g,start,today) {
    const configured=number(g.desired)>0 && g.configured!==false;
    return {...obj(g),id:id(g.id),title:text(g.title || 'Target',60),target:text(g.target,240),unit:text(g.unit,30),baseline:nonnegative(g.baseline),actual:nonnegative(g.actual),desired:nonnegative(g.desired),configured,
      deadline:validDate(g.deadline)?g.deadline:shift(start,89),legacyProgress:configured?undefined:number(g.legacyProgress ?? g.progress),
      milestones:arr(g.milestones).map(m=>({id:id(m.id),text:text(m.text,240),done:m.done===true})),
      updates:arr(g.updates).filter(u=>validDate(u.date)).map(u=>({date:u.date,actual:nonnegative(u.actual),note:text(u.note,300)})).sort((a,b)=>a.date.localeCompare(b.date))};
  }
  function migrate(input={},today=localDate(),archive=false) {
    if (input.schemaVersion>SCHEMA) throw Error('Backup berasal dari versi aplikasi yang lebih baru.');
    const v=obj(input),start=validDate(v.startDate)?v.startDate:today;
    const history={};for(const [k,d] of Object.entries(obj(v.history)))if(validDate(k))history[k]=day(d);
    const currentDate=validDate(v.todayDate)?v.todayDate:today;
    const current=day(v.today);
    // Current-day copy is authoritative; never drop unfinished MITs during rollover.
    history[currentDate]=current;
    const weekly={};for(const [k,items] of Object.entries(obj(v.weeklyFocus)))if(validDate(k))weekly[k]=arr(items).map(w=>({id:id(w.id),text:text(w.text,240),goalId:ref(w.goalId),done:w.done===true}));
    const reviews={};for(const [k,r] of Object.entries(obj(v.reviews)))if(validDate(k))reviews[k]={...obj(r),win:text(r.win),fail:text(r.fail),why:text(r.why),improve:text(r.improve),strategy:['keep','adjust','change'].includes(r.strategy)?r.strategy:'adjust'};
    if (v.review && !reviews[monday(currentDate)] && Object.values(v.review).some(Boolean)) reviews[monday(currentDate)]={...v.review,strategy:'adjust'};
    const d={...v,schemaVersion:SCHEMA,methodVersion:'1.0',cycleId:id(v.cycleId),name:text(v.name||'Kamu',40),onboarded:v.onboarded===true,startDate:start,todayDate:archive?currentDate:today,
      today:archive?current:(currentDate===today?current:day(history[today] || {habitText:current.habitText})),history,goals:arr(v.goals).map(g=>goal(g,start,today)),weeklyFocus:weekly,reviews,review:obj(v.review),
      focusSessions:arr(v.focusSessions).filter(s=>validDate(s.date)).map(s=>({...s,id:id(s.id),date:s.date,seconds:nonnegative(s.seconds),mitId:ref(s.mitId),goalId:ref(s.goalId)})),
      failures:arr(v.failures).map(f=>({...f,date:validDate(f.date)?f.date:today,what:text(f.what),why:text(f.why),repair:text(f.repair),next:text(f.next)})),
      rewards:arr(v.rewards).map(r=>({days:Math.max(1,Math.min(90,number(r.days,7))),text:text(r.text,300)})),consequences:arr(v.consequences).map(r=>({days:Math.max(1,Math.min(90,number(r.days,7))),text:text(r.text,300)})),
      threshold:80,settings:{focusMinutes:v.settings?.focusMinutes===50?50:25,theme:v.settings?.theme==='dark'?'dark':'light',notifications:v.settings?.notifications===true},cycleReview:{change:text(v.cycleReview?.change),learn:text(v.cycleReview?.learn),carry:text(v.cycleReview?.carry)},archives:[]};
    delete d.activeTimer;delete d.pendingFocus;
    const t=v.activeTimer;
    if(!archive&&t&&ref(t.id)&&['free','pomodoro'].includes(t.mode)&&Number.isFinite(t.elapsedMs)&&t.elapsedMs>=0&&Array.isArray(t.segments)&&(!t.running||(Number.isFinite(t.startedAt)&&t.startedAt>0&&t.startedAt<8640000000000000))){
      d.activeTimer={id:t.id,mode:t.mode,durationMs:t.durationMs===3000000?3000000:1500000,elapsedMs:t.elapsedMs,segments:t.segments.filter(s=>Number.isFinite(s.start)&&Number.isFinite(s.end)&&s.start>=0&&s.end>=s.start&&s.end<8640000000000000).map(s=>({start:s.start,end:s.end})),mitId:ref(t.mitId),goalId:ref(t.goalId),mitText:text(t.mitText,300),mitDate:validDate(t.mitDate)?t.mitDate:today,running:t.running===true,startedAt:t.running?t.startedAt:0};
    }
    if(!archive&&v.pendingFocus&&validDate(v.pendingFocus.mitDate))d.pendingFocus={mitId:ref(v.pendingFocus.mitId),mitDate:v.pendingFocus.mitDate,seconds:nonnegative(v.pendingFocus.seconds)};
    if (!archive) d.archives=arr(v.archives).map(a=>migrate({...a,archives:[]},today,true));
    return d;
  }
  function history(d) { return {...d.history,[d.todayDate]:d.today}; }
  function bounds(d,today=localDate()) {return {start:d.startDate,end:shift(d.startDate,89),through:[today,shift(d.startDate,89)].sort()[0]};}
  function result(g,asOf) {
    if(!g.configured || g.desired<=g.baseline)return null;
    let actual=g.actual;
    if(asOf) {const updates=g.updates.filter(u=>u.date<=asOf);actual=updates.length?updates[updates.length-1].actual:g.baseline;}
    return Math.max(0,Math.min(100,Math.round((actual-g.baseline)/(g.desired-g.baseline)*100)));
  }
  function metrics(d,start,end,goalId='') {
    const h=history(d),days=Object.keys(h).filter(k=>k>=start&&k<=end).sort();
    const mits=days.flatMap(k=>day(h[k]).mitItems).filter(m=>!goalId || m.goalId===goalId);
    const done=mits.filter(m=>m.done).length,linked=mits.filter(m=>m.goalId&&d.goals.some(g=>g.id===m.goalId)).length;
    const seconds=d.focusSessions.filter(s=>s.date>=start&&s.date<=end&&(!goalId||s.goalId===goalId)).reduce((n,s)=>n+s.seconds,0);
    return {total:mits.length,done,rate:mits.length?Math.round(done/mits.length*100):null,linked,linkedRate:mits.length?Math.round(linked/mits.length*100):null,seconds,days:days.length,consistent:days.filter(k=>day(h[k]).score>=4).length};
  }
  function streaks(d,today=localDate()) {
    const b=bounds(d,today),h=history(d);let run=0,best=0,last='';
    for(let k=b.start;k<=b.through;k=shift(k,1)){if(h[k]&&day(h[k]).score>=4){run++;best=Math.max(best,run);last=k;}else run=0;}
    let streak=0,k=h[today]&&day(h[today]).score>=4?today:shift(today,-1);
    if(k<=b.end)for(;k>=b.start&&h[k]&&day(h[k]).score>=4;k=shift(k,-1))streak++;
    return {best,streak};
  }
  function diagnosis(d,g,today=localDate()) {
    const b=bounds(d,today),m=metrics(d,b.start,b.through,g.id),r=result(g);
    const expected=Math.min(100,Math.max(0,(diff(d.startDate,today)+1)/(diff(d.startDate,g.deadline)+1)*100));
    if(r===null)return {label:'Lengkapi ukuran hasil',tone:'amber'};
    if(m.rate===null)return {label:'Belum ada MIT terkait',tone:'amber'};
    if(m.rate>=80)return r>=expected?{label:'Pertahankan',tone:'green'}:{label:'Evaluasi strategi',tone:'amber'};
    return r>=expected?{label:'Stabilkan eksekusi',tone:'amber'}:{label:'Perbaiki eksekusi',tone:'red'};
  }
  function backup(input,today=localDate()) {
    const v=input?.format==='skd90-backup'?input.data:input;
    if(!v||typeof v.name!=='string'||!v.today?.checks||!Array.isArray(v.goals)||!v.history||typeof v.history!=='object'||Array.isArray(v.history)||!Array.isArray(v.failures)||!Array.isArray(v.rewards))throw Error('Struktur backup tidak valid.');
    return migrate(v,today);
  }
  function newCycle(d,start=localDate()) {
    const old=structuredClone(d);delete old.archives;delete old.activeTimer;delete old.pendingFocus;
    const fresh=migrate({name:d.name,startDate:start,todayDate:start,today:{habitText:d.today.habitText},goals:[],history:{},settings:d.settings,rewards:d.rewards,consequences:d.consequences},start);
    fresh.archives=[...d.archives,old];fresh.onboarded=true;return fresh;
  }
  return {SCHEMA,uid,validDate,localDate,shift,diff,monday,day,migrate,history,bounds,result,metrics,streaks,diagnosis,backup,newCycle};
});
