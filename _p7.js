/* ════════════════════════════════════════════════════════════════
   RUNTIME — screens, the round loop, feedback, report card.
   ════════════════════════════════════════════════════════════════ */

const Opt={
  timer:false,
  boot(){ try{ this.timer=localStorage.getItem(CFG.store+'.timer')==='1'; }catch(e){} return this; },
  setTimer(v){ this.timer=v; try{ localStorage.setItem(CFG.store+'.timer', v?'1':'0'); }catch(e){} }
};

let G=null;                 /* the live round, or null */
let curPart='pattern';
let lastShare='';

/* ── menu chrome ──────────────────────────────────────────── */
function paintMenu(){
  const p=Store.p();
  const who=Store.d.who||'Student';
  $('profName').textContent=who;
  $('profDot').textContent=who.slice(0,1).toUpperCase();
  $('streakN').textContent=Store.liveStreak();
  const bank=(p&&p.bank)?p.bank.length:0;
  const rev=$('revN');
  rev.hidden=bank===0; rev.textContent=bank;
  ['pattern','formula','word','sum'].forEach(part=>{
    const key={pattern:'Pat',formula:'Form',word:'Word',sum:'Sum'}[part];
    const L=$('pill'+key+'L'), P=$('pill'+key+'P');
    const total=LESSONS[part].length;
    const done=LESSONS[part].filter(l=>p&&p.lessons&&p.lessons[l.id]).length;
    L.textContent='Seekho '+done+'/'+total;
    L.className='pill'+(done===total?' done':'');
    const best=p&&p.best&&p.best[part];
    P.textContent=best?('Best '+best.pts+' · '+best.acc+'%'):'Practice';
    P.className='pill'+(best?' acc':'');
  });
  const wk=isoWeekKey(new Date());
  const w=p&&p.weekly&&p.weekly[wk];
  $('weeklyMeta').textContent=w?('Tumhara best: '+w.best+' · attempt '+w.attempts):'';

}

/* ── hub ──────────────────────────────────────────────────── */
function openHub(part){
  curPart=part;
  const P=PARTS[part], p=Store.p();
  $('hubKicker').textContent=P.kicker;
  $('hubTitle').innerHTML=P.name;
  $('hubBlurb').textContent=P.blurb;
  const host=$('hubList');
  let h='<p class="eyebrow" style="margin:2px 0 9px">Seekho</p>';
  LESSONS[part].forEach((L,i)=>{
    const done=p&&p.lessons&&p.lessons[L.id];
    h+='<button class="hubrow" data-lesson="'+L.id+'" style="--tint:rgba(255,106,69,.13);--tone:var(--sa-text)">'+
       '<span class="ic">'+(i+1)+'</span>'+
       '<span class="txt"><b>'+L.title+'</b><span>'+L.cards.length+' cards · 3 check questions</span></span>'+
       (done?'<span class="tick"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>':'')+
       '</button>';
  });
  h+='<p class="eyebrow" style="margin:16px 0 9px">Practice · '+CFG.runLen[part]+' sawaal</p>';
  [['Easy',1,'Chhote numbers, seedhe sawaal'],
   ['Medium',2,'Negative aur bade numbers'],
   ['Hard',3,'Fraction, decimal — aur answer type karna padega']].forEach(([nm,lv,sub])=>{
    h+='<button class="hubrow" data-play="'+lv+'" style="--tint:rgba(0,179,159,.13);--tone:var(--sd-text)">'+
       '<span class="ic">'+lv+'</span>'+
       '<span class="txt"><b>'+nm+'</b><span>'+sub+'</span></span></button>';
  });
  host.innerHTML=h;
  host.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>openLesson(part,b.dataset.lesson)));
  host.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>startRun(part,+b.dataset.play)));
  show('hub');
}

/* ── lesson ───────────────────────────────────────────────── */
let LS=null;
function openLesson(part,id){
  const L=LESSONS[part].find(x=>x.id===id);
  if(!L)return;
  LS={part:part, L:L, i:0};
  curPart=part;
  $('lessonNext').onclick=null;                 /* never leave a stale handler behind */
  paintLesson();
  show('lesson');
}
function paintLesson(){
  const {L,i}=LS;
  $('lessonRail').innerHTML=L.cards.map((_,k)=>'<i class="'+(k<=i?'on':'')+'"></i>').join('');
  $('lessonCard').innerHTML=L.cards[i];
  $('lessonPrev').disabled=i===0;
  $('lessonPrev').style.opacity=i===0?.4:1;
  $('lessonNext').textContent=(i===L.cards.length-1)?'3 sawaal karo':'Aage';
  $('lessonNext').onclick=()=>{
    Snd.tap();
    if(LS.i<L.cards.length-1){ LS.i++; paintLesson(); }
    else startCheck(LS.part,L);
  };
}
$('lessonPrev').addEventListener('click',()=>{ if(LS&&LS.i>0){ LS.i--; paintLesson(); Snd.tap(); } });
$('lessonBack').addEventListener('click',()=>{ openHub(LS?LS.part:curPart); });

/* ── round setup ──────────────────────────────────────────── */
function startCheck(part,L){
  const list=L.checks.map(t=>genForTopic(t, L.lvl||1));
  G={ mode:'check', part:part, lvl:L.lvl||1, lesson:L, list:list, i:0,
      pts:0, combo:0, best:0, right:0, wrong:0, missed:[], t0:Date.now(),
      timed:false, revenge:false, tries:0 };
  paintQ();
  show('play');
}
function startRun(part,lvl,opts){
  opts=opts||{};
  const n=CFG.runLen[part]||10;
  const list=opts.list||buildRun(part,lvl,n);
  G={ mode:opts.mode||part, part:part, lvl:lvl, list:list, i:0,
      pts:0, combo:0, best:0, right:0, wrong:0, missed:[], t0:Date.now(),
      timed:opts.timed!==undefined?opts.timed:Opt.timer,
      revenge:false, tries:0, weekKey:opts.weekKey||null };
  Snd.wake();
  paintQ();
  show('play');
  tick();
}
let timerH=null;
function tick(){
  clearInterval(timerH);
  const el=$('hudTime');
  el.hidden=!G||!G.timed;
  if(!G||!G.timed)return;
  const paint=()=>{
    if(!G)return;
    const s=Math.floor((Date.now()-G.t0)/1000);
    el.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
  };
  paint();
  timerH=setInterval(paint,1000);
}

/* ── question rendering ───────────────────────────────────── */
function paintQ(){
  const q=G.list[G.i];
  G.tries=0;
  $('hudQ').textContent=(G.revenge?'⚔ ':'')+(G.i+1)+'/'+G.list.length;
  $('hudPts').textContent=G.pts;
  $('hudCombo').hidden=G.combo<2;
  $('hudCombo').textContent='×'+(G.combo+1);
  $('hudBar').style.width=Math.round(G.i/G.list.length*100)+'%';

  let h='';
  if(q.context)h+='<div class="qcontext">'+q.context+'</div>';
  h+='<div class="qkicker">'+esc(q.kicker||'')+'</div>';
  if(q.lead)h+='<p class="qtext lead">'+q.lead+'</p>';
  if(q.seq){
    const cls='qseq'+((q.seq.length>34||q.seqSmall)?' long':'');
    h+='<div class="'+cls+'">'+q.seq+'</div>';
  }
  if(q.big)h+='<div class="qbig'+(q.big.length>15?' long':'')+'">'+q.big+'</div>';
  $('playBody').innerHTML=h;

  const foot=$('playFoot');
  if(q.mode==='type'){
    foot.innerHTML=
      '<div style="display:flex;gap:8px;align-items:stretch">'+
        '<div class="typed empty" id="typedBox" style="flex:1">Answer</div>'+
        '<button class="iconbtn" id="padBack" aria-label="Backspace" style="height:auto;width:52px">'+
          '<svg viewBox="0 0 24 24"><path d="M20 5H9L3 12l6 7h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM17 9l-6 6M11 9l6 6"/></svg>'+
        '</button>'+
      '</div>'+
      '<div class="pad" id="pad">'+
        [1,2,3,4,5,6,7,8,9].map(n=>'<button data-k="'+n+'">'+n+'</button>').join('')+
        '<button data-k="-" class="sm">&plusmn;</button>'+
        '<button data-k="0">0</button>'+
        '<button data-k="." class="sm">.</button>'+
      '</div>'+
      '<button class="btn btn-primary w100" id="checkBtn" style="margin-top:10px">Check</button>';
    G.typed='';
    foot.querySelectorAll('#pad button').forEach(b=>{
      b.addEventListener('pointerdown',e=>{ e.preventDefault(); padKey(b.dataset.k); });
    });
    $('padBack').addEventListener('pointerdown',e=>{ e.preventDefault(); padKey('back'); });
    $('checkBtn').addEventListener('click',()=>submitTyped());
  }else{
    foot.innerHTML='<div class="opts">'+q.opts.map((o,k)=>
      '<button class="opt'+(q.seqOpts?' seqopt':'')+'" data-i="'+k+'">'+
      '<span class="k">'+'ABCD'[k]+'</span><span class="lb">'+o.lb+'</span></button>').join('')+'</div>';
    foot.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>answerMCQ(+b.dataset.i)));
  }
}
function padKey(k){
  if(!G||G.locked)return;
  Snd.key();
  if(k==='back')G.typed=G.typed.slice(0,-1);
  else if(k==='-')G.typed=G.typed.startsWith('-')?G.typed.slice(1):'-'+G.typed;
  else if(k==='.'){ if(!G.typed.includes('.'))G.typed+= G.typed===''||G.typed==='-'?'0.':'.'; }
  else if(G.typed.replace(/[-.]/g,'').length<7)G.typed+=k;
  const box=$('typedBox');
  if(!box)return;
  box.classList.toggle('empty',G.typed==='');
  box.textContent=G.typed===''?'Answer':G.typed.replace(/-/g,MINUS);
}
document.addEventListener('keydown',e=>{
  if(curScreen!=='play'||!G||G.locked)return;
  const q=G.list[G.i];
  if(q.mode==='type'){
    if(/^[0-9]$/.test(e.key))padKey(e.key);
    else if(e.key==='.')padKey('.');
    else if(e.key==='-')padKey('-');
    else if(e.key==='Backspace')padKey('back');
    else if(e.key==='Enter')submitTyped();
  }else if(/^[1-4]$/.test(e.key))answerMCQ(+e.key-1);
  else if(/^[a-dA-D]$/.test(e.key))answerMCQ('abcd'.indexOf(e.key.toLowerCase()));
});

/* ── answering ────────────────────────────────────────────── */
function sameNumber(a,b){
  const x=parseFloat(a), y=parseFloat(b);
  if(isNaN(x)||isNaN(y))return false;
  return Math.abs(x-y)<1e-9;
}
function submitTyped(){
  if(!G||G.locked)return;
  if(G.typed===''||G.typed==='-'){ toast('Answer likho phir Check dabao'); return; }
  const q=G.list[G.i];
  const ok=sameNumber(G.typed,q.ansTyped)||G.typed===q.ansTyped;
  const box=$('typedBox');
  box.classList.add(ok?'good':'bad');
  land(ok,null);
}
function answerMCQ(i){
  if(!G||G.locked||i<0)return;
  const q=G.list[G.i];
  if(!q.opts||!q.opts[i])return;
  const chosen=q.opts[i];
  const btns=$('playFoot').querySelectorAll('.opt');
  btns.forEach(b=>b.disabled=true);
  btns[i].classList.add(chosen.ok?'good':'bad');
  if(!chosen.ok){
    const ci=q.opts.findIndex(o=>o.ok);
    if(ci>=0)btns[ci].classList.add('good');
  }
  land(chosen.ok,chosen);
}

function land(ok,chosen){
  G.locked=true;
  const q=G.list[G.i];
  Store.scoreTopic(q.topic,ok);
  if(ok){
    G.right++;
    if(G.revenge)G.revRight=(G.revRight||0)+1;
    G.combo++;
    G.best=Math.max(G.best,G.combo);
    const speed=G.timed?Math.max(0,5-Math.floor((Date.now()-(G.qT0||G.t0))/4000)):3;
    const gain=G.revenge?150:(10+Math.min(10,G.combo*2)+speed)*(G.mode==='check'?1:G.lvl);
    G.pts+=gain;
    Snd.right(G.combo);
    Store.bankClear(q.topic);
    const pts=$('hudPts'); pts.textContent=G.pts; pts.classList.remove('pop'); void pts.offsetWidth; pts.classList.add('pop');
    setTimeout(next,900);
  }else{
    G.wrong++; G.combo=0;
    Snd.wrong();
    $('playBody').classList.remove('shake'); void $('playBody').offsetWidth; $('playBody').classList.add('shake');
    if(!G.revenge){ G.missed.push(q); Store.bankAdd(q); }
    showWork(q,chosen);
  }
  Store.save();
}
function next(){
  G.locked=false;
  G.i++;
  G.qT0=Date.now();
  if(G.i>=G.list.length)finishStage();
  else paintQ();
}
function finishStage(){
  if(!G.revenge && G.missed.length && G.mode!=='weekly' && G.mode!=='check' && G.mode!=='case'){
    const list=G.missed.map(q=>{
      if(q.opts)q.opts=shuffle(q.opts);
      return q;
    });
    G.mainRight=G.right; G.mainTotal=G.right+G.wrong;
    G.revRight=0; G.revTotal=list.length;
    G.revenge=true; G.list=list; G.i=0; G.missed=[];
    openSheet(
      '<h4>Badla round</h4>'+
      '<p class="diag">'+list.length+' sawaal jo chhoot gaye the, wapas aa rahe hain. Is baar +150 per sawaal, aur galat hone par kuch nahi katega.</p>'+
      '<button class="btn btn-primary w100" data-close>Chalo</button>',
      {onClose:()=>{ paintQ(); }});
    return;
  }
  endRun();
}

/* ── the teaching moment ──────────────────────────────────── */
function showWork(q,chosen){
  const lines=(q.work||[]).map((w,i)=>
    '<div class="ln" style="animation-delay:'+(i*60)+'ms">'+w.t+
    (w.why?'<span class="why">'+w.why+'</span>':'')+'</div>').join('');
  const diag = chosen&&chosen.why ? chosen.why
             : (q.mode==='type' ? 'Sahi answer: <strong>'+q.ansLabel+'</strong>' : '');
  const html=
    '<div class="verdict no"><span class="mark"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></span>'+
    '<h3>Ye silly mistake nahi hai</h3></div>'+
    (diag?'<p class="diag">'+diag+'</p>':'')+
    (q.mode==='type'&&chosen===null?'<p class="diag">Sahi answer: <strong>'+q.ansLabel+'</strong></p>':'')+
    '<div class="work">'+lines+'</div>'+
    (q.say?'<p class="diag" style="color:var(--honey-text);font-weight:600">'+q.say+'</p>':'')+
    '<button class="btn btn-primary w100" data-close style="margin-top:6px">Samajh gaya</button>';
  openSheet(html,{locked:false,onClose:next});
}

/* ── end of round ─────────────────────────────────────────── */
function endRun(){
  clearInterval(timerH);
  const secs=Math.round((Date.now()-G.t0)/1000);
  const total=G.mainTotal!==undefined?G.mainTotal:(G.right+G.wrong);
  const rightMain=G.mainRight!==undefined?G.mainRight:G.right;
  const acc=total?Math.round(rightMain/total*100):0;
  G.rightMain=rightMain;
  const p=Store.p();

  if(G.mode==='check'){
    if(p){ p.lessons=p.lessons||{}; p.lessons[G.lesson.id]=true; Store.save(); }
    Snd.done();
    const part=G.part;
    openSheet(
      '<div class="verdict ok"><span class="mark"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>'+
      '<h3>Lesson complete</h3></div>'+
      '<p class="diag">'+G.right+'/'+total+' sahi. Ab isi topic ki practice karo — jo seekha hai wo tabhi tikta hai.</p>'+
      '<button class="btn btn-primary w100" data-close>Theek hai</button>',
      {onClose:()=>{ G=null; openHub(part); }});
    return;
  }

  Store.bumpStreak();
  if(p){
    p.runs=(p.runs||0)+1;
    p.pts=(p.pts||0)+G.pts;
    const key=G.mode;
    const b=p.best[key];
    if(!b||G.pts>b.pts)p.best[key]={pts:G.pts,acc:acc,time:secs};
    p.log=p.log||[];
    p.log.unshift({m:key,lvl:G.lvl,pts:G.pts,acc:acc,t:secs,d:Store.today(),timed:!!G.timed});
    if(p.log.length>40)p.log.length=40;
    if(G.weekKey){
      p.weekly=p.weekly||{};
      const w=p.weekly[G.weekKey]||{first:G.pts,best:0,attempts:0};
      w.attempts++; w.best=Math.max(w.best,G.pts);
      p.weekly[G.weekKey]=w;
    }
    Store.save();
  }
  Snd.done();
  paintReport(acc,secs,total);
  show('report');
}

const MODE_NAME={pattern:'Pattern',formula:'a + (n−1)d',word:'Exam sawaal',sum:'Sum (Sₙ)',
  case:'Case study',mixed:'Mixed test',weekly:'Hafte ka paper',revenge:'Badla mode'};
function paintReport(acc,secs,total){
  const p=Store.p();
  const who=Store.d.who||'Student';
  const mm=Math.floor(secs/60)+':'+String(secs%60).padStart(2,'0');
  const lvlName=['','Easy','Medium','Hard'][G.lvl]||'';
  const topics=Object.keys(p&&p.topics?p.topics:{}).map(k=>{
    const t=p.topics[k], n=t.r+t.w;
    return {k:k, n:n, pct:n?Math.round(t.r/n*100):0};
  }).filter(t=>t.n>=2).sort((a,b)=>a.pct-b.pct);
  const weak=topics[0];

  let h='<div class="topbar"><button class="iconbtn" id="repBack" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button><span class="spacer"></span></div>';
  h+='<div class="scorecard glass"><span class="eyebrow">'+esc(MODE_NAME[G.mode]||'')+(lvlName?' · '+lvlName:'')+'</span>'+
     '<div class="n" id="bigScore">0</div>'+
     '<p class="tiny" style="color:var(--ink-2)">'+esc(who)+' · '+G.rightMain+'/'+total+' sahi'+
       (G.revTotal?' · badla '+(G.revRight||0)+'/'+G.revTotal:'')+(G.timed?'':' · bina timer')+'</p>'+
     '<div class="statrow">'+
       '<div class="stat"><b>'+acc+'%</b><span>Accuracy</span></div>'+
       '<div class="stat"><b>'+G.best+'</b><span>Combo</span></div>'+
       '<div class="stat"><b>'+mm+'</b><span>Time</span></div>'+
     '</div></div>';

  if(topics.length){
    h+='<div class="panel glass"><span class="eyebrow">Kahan kaam baaki hai</span><div style="margin-top:8px">';
    topics.slice(0,5).forEach(t=>{
      h+='<div class="topicrow"><span class="nm">'+esc(TOPICS[t.k]||t.k)+'</span>'+
         '<span class="bar"><i class="'+(t.pct<70?'weak':'')+'" style="width:'+t.pct+'%"></i></span>'+
         '<span class="tiny" style="width:34px;text-align:right;color:var(--ink-3)">'+t.pct+'%</span></div>';
    });
    h+='</div>';
    if(weak&&weak.pct<80){
      const part=TOPIC_PART[weak.k]||'pattern';
      h+='<button class="btn btn-ghost w100" id="goWeak" style="margin-top:12px">'+
         esc(TOPICS[weak.k])+' phir se seekho</button>';
      h+='<input type="hidden" id="weakPart" value="'+part+'">';
    }
    h+='</div>';
  }

  if(acc>=90&&!Opt.timer&&G.mode!=='weekly'){
    h+='<div class="panel glass"><span class="eyebrow">Ab speed</span>'+
       '<p class="tiny" style="color:var(--ink-2);margin-top:6px">Accuracy '+acc+'% hai — ab timer on karke khelo. Pehle sahi, phir tez.</p>'+
       '<button class="btn btn-ghost w100" id="turnTimer" style="margin-top:10px">Timer on karo</button></div>';
  }

  lastShare=buildShare(acc,mm,total);
  h+='<button class="btn btn-wa w100" id="shareBtn" style="margin-bottom:9px">'+CFG.teacher+' ko score bhejo</button>';
  h+='<div style="display:flex;gap:9px;width:100%">'+
     '<button class="btn btn-ghost" id="againBtn" style="flex:1">Phir se</button>'+
     '<button class="btn btn-primary" id="menuBtn" style="flex:1">Menu</button></div>';

  $('reportBody').innerHTML=h;
  countTo($('bigScore'),G.pts,760);
  const mode=G.mode, lvl=G.lvl, part=G.part, wk=G.weekKey;
  $('repBack').onclick=()=>{ G=null; paintMenu(); show('menu'); };
  $('menuBtn').onclick=()=>{ G=null; paintMenu(); show('menu'); };
  $('againBtn').onclick=()=>{
    G=null;
    if(mode==='weekly')startWeekly();
    else if(mode==='mixed')startRun('mixed',lvl,{mode:'mixed'});
    else if(mode==='revenge')startRevenge();
    else startRun(part,lvl);
  };
  $('shareBtn').onclick=()=>{
    window.open('https://wa.me/?text='+encodeURIComponent(lastShare),'_blank');
  };
  const gw=$('goWeak');
  if(gw)gw.onclick=()=>{
    const pt=$('weakPart').value;
    G=null;
    const covers=l=>l.checks.map(topicOfCheck).concat(l.also||[]).indexOf(weak.k)>=0;
    const L=LESSONS[pt].find(covers)||LESSONS[pt][0];
    openHub(pt);                       /* build the list first, so Back has somewhere to land */
    openLesson(pt,L.id);
  };
  const tt=$('turnTimer');
  if(tt)tt.onclick=()=>{ Opt.setTimer(true); toast('Timer on. Ab har round timed hoga.'); tt.disabled=true; tt.textContent='Timer on hai'; };
}
function buildShare(acc,mm,total){
  const p=Store.p();
  const who=Store.d.who||'Student';
  const lvlName=['','Easy','Medium','Hard'][G.lvl]||'';
  const L=[];
  L.push('📐 SIDHI — Arithmetic Progression');
  L.push(who+' · '+(MODE_NAME[G.mode]||G.mode)+(lvlName?' ('+lvlName+')':''));
  L.push('Score: '+G.pts+' points');
  L.push('Sahi: '+G.rightMain+'/'+total+' — '+acc+'%');
  if(G.revTotal)L.push('Badla round: '+(G.revRight||0)+'/'+G.revTotal);
  L.push('Time: '+mm+(G.timed?'':' (bina timer)'));
  L.push('Best combo: '+G.best);
  const st=Store.liveStreak();
  if(st>1)L.push('Streak: '+st+' din 🔥');
  const topics=Object.keys(p&&p.topics?p.topics:{}).map(k=>{
    const t=p.topics[k], n=t.r+t.w;
    return {k:k,n:n,pct:n?Math.round(t.r/n*100):0};
  }).filter(t=>t.n>=2).sort((a,b)=>a.pct-b.pct);
  if(topics[0]&&topics[0].pct<80)L.push('Kamzor: '+TOPICS[topics[0].k]+' ('+topics[0].pct+'%)');
  if(G.weekKey&&p&&p.weekly&&p.weekly[G.weekKey])L.push('Weekly attempt #'+p.weekly[G.weekKey].attempts);
  L.push('');
  L.push('🏫 FLUENCE');
  return L.join('\n');
}

/* ── special modes ────────────────────────────────────────── */
function startWeekly(){
  const key=isoWeekKey(new Date());
  const seed=strHash(CFG.appId+'|'+key);
  const saved=Math.random;
  rng=mulberry32(seed);
  const list=buildRun('weekly',2,CFG.runLen.weekly);
  rng=saved;                                    /* normal play must never be seeded */
  startRun('weekly',2,{mode:'weekly',list:list,timed:true,weekKey:key});
}
function startRevenge(){
  const p=Store.p();
  const bank=(p&&p.bank)?p.bank.slice(-10):[];
  if(!bank.length){ toast('Abhi koi galti bank me nahi hai. Pehle practice karo.'); return; }
  const list=bank.map(b=>genForTopic(b.topic,2));
  /* about one in ten is a fresh question from a nearby topic, so it stays a test */
  const extra=Math.max(1,Math.round(list.length*0.1));
  for(let i=0;i<extra;i++){
    const t=pick(bank).topic;
    list.push(genQuestion(TOPIC_PART[t]||'pattern',2));
  }
  startRun('revenge',2,{mode:'revenge',list:shuffle(list)});
}

/* ── sheets: settings, records, profile ───────────────────── */
function sheetSettings(){
  openSheet(
    '<h4>Sound &amp; settings</h4>'+
    '<div class="switchrow"><span class="lbl"><b>Sound</b><span>Sahi, galat aur keypad ki awaaz</span></span>'+
      '<button class="sw'+(Snd.on?' on':'')+'" id="swSnd"><i></i></button></div>'+
    '<div class="switchrow"><span class="lbl"><b>Vibration</b><span>Phone me halka sa buzz</span></span>'+
      '<button class="sw'+(Snd.haptics?' on':'')+'" id="swHap"><i></i></button></div>'+
    '<div class="switchrow"><span class="lbl"><b>Timer</b><span>Pehle accuracy, phir speed. Weekly paper hamesha timed hai.</span></span>'+
      '<button class="sw'+(Opt.timer?' on':'')+'" id="swTim"><i></i></button></div>'+
    '<button class="btn btn-primary w100" data-close style="margin-top:14px">Ho gaya</button>');
  const t=(id,get,set)=>{
    const el=$(id);
    el.addEventListener('click',()=>{ const v=!get(); set(v); el.classList.toggle('on',v); Snd.tap(); });
  };
  t('swSnd',()=>Snd.on,v=>Snd.set(v));
  t('swHap',()=>Snd.haptics,v=>Snd.setHap(v));
  t('swTim',()=>Opt.timer,v=>Opt.setTimer(v));
}
function sheetRecords(){
  const p=Store.p();
  let h='<h4>Records</h4>';
  if(!p||!p.log||!p.log.length){
    h+='<p class="diag">Abhi tak koi round poora nahi hua. Ek round khelo — yahan aa jayega.</p>';
  }else{
    h+='<div class="statrow" style="margin-top:4px">'+
       '<div class="stat"><b>'+(p.runs||0)+'</b><span>Rounds</span></div>'+
       '<div class="stat"><b>'+(p.pts||0)+'</b><span>Total points</span></div>'+
       '<div class="stat"><b>'+Store.liveStreak()+'</b><span>Streak</span></div></div>';
    h+='<p class="eyebrow" style="margin:14px 0 6px">Pichle rounds</p>';
    p.log.slice(0,12).forEach(r=>{
      h+='<div class="logrow"><b>'+r.pts+'</b><span style="flex:1">'+esc(MODE_NAME[r.m]||r.m)+
         (r.lvl?' · L'+r.lvl:'')+'</span><span style="color:var(--ink-3)">'+r.acc+'% · '+r.d+
         (r.timed?'':' · bina timer')+'</span></div>';
    });
    const topics=Object.keys(p.topics||{}).map(k=>{
      const t=p.topics[k], n=t.r+t.w;
      return {k:k,n:n,pct:n?Math.round(t.r/n*100):0};
    }).filter(t=>t.n>=2).sort((a,b)=>a.pct-b.pct);
    if(topics.length){
      h+='<p class="eyebrow" style="margin:16px 0 6px">Topic ke hisaab se</p>';
      topics.forEach(t=>{
        h+='<div class="topicrow"><span class="nm">'+esc(TOPICS[t.k]||t.k)+'</span>'+
           '<span class="bar"><i class="'+(t.pct<70?'weak':'')+'" style="width:'+t.pct+'%"></i></span>'+
           '<span class="tiny" style="width:34px;text-align:right;color:var(--ink-3)">'+t.pct+'%</span></div>';
      });
    }
  }
  h+='<button class="btn btn-primary w100" data-close style="margin-top:16px">Band karo</button>';
  openSheet(h);
}
function sheetProfile(){
  const names=Object.keys(Store.d.players||{});
  let h='<h4>Kaun khel raha hai?</h4>';
  names.forEach(n=>{
    h+='<button class="hubrow" data-who="'+esc(n)+'" style="--tint:rgba(47,75,255,.12)">'+
       '<span class="ic">'+esc(n.slice(0,1).toUpperCase())+'</span>'+
       '<span class="txt"><b>'+esc(n)+'</b><span>'+(Store.d.players[n].runs||0)+' rounds · '+(Store.d.players[n].pts||0)+' points</span></span>'+
       (n===Store.d.who?'<span class="tick"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>':'')+
       '</button>';
  });
  h+='<div style="display:flex;gap:8px;margin-top:12px">'+
     '<input class="namefield" id="newWho" placeholder="Naya naam" maxlength="14" style="flex:1">'+
     '<button class="btn btn-primary" id="addWho" style="flex:0 0 96px">Add</button></div>'+
     '<button class="btn btn-quiet w100" data-close style="margin-top:10px">Band karo</button>';
  const close=openSheet(h);
  document.querySelectorAll('[data-who]').forEach(b=>b.addEventListener('click',()=>{
    Store.d.who=b.dataset.who; Store.save(); paintMenu(); close();
  }));
  $('addWho').addEventListener('click',()=>{
    const v=$('newWho').value.trim();
    if(!v){ toast('Naam likho'); return; }
    if(!Store.d.players[v])Store.mk(v);
    else { Store.d.who=v; Store.save(); }
    paintMenu(); close();
  });
}

/* ── wiring ───────────────────────────────────────────────── */
$('startBtn').addEventListener('click',()=>{
  Snd.wake(); Snd.tap();
  const inp=$('nameIn');
  if(!Store.d.who){
    if(inp.hidden){ inp.hidden=false; inp.focus(); $('startBtn').textContent='Chalo'; return; }
    const v=inp.value.trim();
    if(!v){ toast('Apna naam likho — score isi naam se jayega'); inp.focus(); return; }
    Store.mk(v);
  }
  paintMenu(); show('menu');
});
$('nameIn').addEventListener('keydown',e=>{ if(e.key==='Enter')$('startBtn').click(); });
$('titleSettings').addEventListener('click',()=>{ Snd.wake(); sheetSettings(); });
$('setBtn').addEventListener('click',sheetSettings);
$('recBtn').addEventListener('click',sheetRecords);
$('profChip').addEventListener('click',sheetProfile);
$('doorPat').addEventListener('click',()=>{ Snd.tap(); openHub('pattern'); });
$('doorForm').addEventListener('click',()=>{ Snd.tap(); openHub('formula'); });
$('doorWord').addEventListener('click',()=>{ Snd.tap(); openHub('word'); });
$('doorSum').addEventListener('click',()=>{ Snd.tap(); openHub('sum'); });
$('doorCase').addEventListener('click',()=>{ Snd.tap(); startRun('case',2,{mode:'case'}); });
$('doorMixed').addEventListener('click',()=>{ Snd.tap(); startRun('mixed',2,{mode:'mixed'}); });
$('doorRevenge').addEventListener('click',()=>{ Snd.tap(); startRevenge(); });
$('doorWeekly').addEventListener('click',()=>{ Snd.tap(); startWeekly(); });
document.querySelectorAll('[data-back="menu"]').forEach(b=>b.addEventListener('click',()=>{ paintMenu(); show('menu'); }));
$('playBack').addEventListener('click',()=>{
  if(!G){ show('menu'); return; }
  const part=G.part, isCheck=G.mode==='check';
  openSheet(
    '<h4>Round chhod dein?</h4>'+
    '<p class="diag">Is round ke points nahi gine jayenge. Koi baat nahi — wapas aa ke phir se kar lena.</p>'+
    '<div style="display:flex;gap:9px;margin-top:12px">'+
      '<button class="btn btn-ghost" id="quitYes" style="flex:1">Haan, chhodo</button>'+
      '<button class="btn btn-primary" data-close style="flex:1">Nahi, khelte hain</button></div>');
  $('quitYes').addEventListener('click',()=>{
    clearInterval(timerH); G=null; closeSheet();
    if(isCheck)openHub(part); else { paintMenu(); show('menu'); }
  });
});

/* ── boot ─────────────────────────────────────────────────── */
Store.boot(); Snd.boot(); Opt.boot();
if(Store.d.who){
  $('startBtn').textContent='Khelo, '+Store.d.who;
}
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{ navigator.serviceWorker.register('ap-sw.js').catch(()=>{}); });
}

/* test hook — the suite runs this script in a vm and needs the internals */
globalThis.__ap={
  F,Fadd,Fsub,Fmul,Fdiv,Fscale,Fneg,Feq,Fis0,Fnum,fmt,decStr,moneyStr,fracStr,typedForm,
  term,seqStr,nOf,MINUS,
  POOLS,TOPICS,TOPIC_PART,LESSONS,PARTS,CFG,
  genQuestion,genForTopic,buildRun,buildCaseRun,CASE_STUDIES,
  gIsAP,gFindD,gFindAD,gBuild,gNth,gFindN,gFromEnd,gMid,gSymb,
  gSituation,gTranslate,gApply,gTwoEq,gFigure,
  gSumN,gSumTo,gSumTable,gSumHowMany,gSumFromTerms,gSumFormula,gSumMultiples,gSumApply,gSumSymb,
  sumN,signed,
  mulberry32,strHash,isoWeekKey,
  setRng(f){ rng=f; }, getRng(){ return rng; },
  topicOfCheck, CHECK_TOPIC,
  round(){ return G; }
};
