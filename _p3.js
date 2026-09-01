/* ════════════════════════════════════════════════════════════════
   FLUENCE · SIDHI — Arithmetic Progression, class 10 chapter 5.

   Built from the 30–31 August class transcripts. Every worked
   line, every analogy and every wrong option in here came out of
   that room: the staircase (8 steps, 7 gaps), the cheat-code rule
   (AP ka rule sirf AP pe chalega), paisa for decimals, and the
   errors the students actually made — a + nd instead of
   a + (n−1)d, a₁ − a₂ for the common difference, calling
   0.2, 0.22, 0.222 an AP because it "looks" patterned.

   Questions are generated fresh every time. There is no bank.
   ════════════════════════════════════════════════════════════════ */

const CFG = {
  appId:'sidhi',
  store:'fluence.ap.v1',
  runLen:{ pattern:10, formula:10, word:8, mixed:12, weekly:12, revenge:10, check:3 },
  teacher:'Aman Sir',
  atoms:'AP1 AP2 AP3 AP4 AP5 AP6'          // atoms this game drills (see MATH-ATLAS)
};

/* ═══ 1. NUMBERS — exact rationals, never floats ══════════════ */
const MINUS='−';                       /* U+2212, never ASCII '-' */
const DOTS='…';
const TIMES='×';

function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t; } return a||1; }
function F(n,d){
  if(d===undefined)d=1;
  if(d===0)throw new Error('Frac /0');
  if(d<0){ n=-n; d=-d; }
  const g=gcd(n,d);
  return {n:n/g, d:d/g};
}
const Fz=F(0), Fone=F(1);
function Fadd(a,b){ return F(a.n*b.d+b.n*a.d, a.d*b.d); }
function Fsub(a,b){ return F(a.n*b.d-b.n*a.d, a.d*b.d); }
function Fmul(a,b){ return F(a.n*b.n, a.d*b.d); }
function Fdiv(a,b){ if(b.n===0)throw new Error('Frac /0'); return F(a.n*b.d, a.d*b.n); }
function Fscale(a,k){ return F(a.n*k, a.d); }
function Fneg(a){ return F(-a.n, a.d); }
function Fabs(a){ return F(Math.abs(a.n), a.d); }
function Feq(a,b){ return a.n===b.n && a.d===b.d; }
function Fis0(a){ return a.n===0; }
function Fneg_(a){ return a.n<0; }
function Fnum(a){ return a.n/a.d; }           /* comparisons only — never for display */
function Fint(a){ return a.d===1; }

/* string-built decimals: 0.03/100 in JS is 0.00030000000000000003 */
function decStr(f){
  if(f.d===1)return (f.n<0?MINUS:'')+Math.abs(f.n);
  if(1000%f.d!==0)return null;
  const sc=f.n*(1000/f.d);                    /* exact integer thousandths */
  const neg=sc<0, a=Math.abs(sc);
  let frac=String(a%1000).padStart(3,'0').replace(/0+$/,'');
  return (neg?MINUS:'')+Math.floor(a/1000)+(frac?'.'+frac:'');
}
function moneyStr(f){                          /* rupees: whole, else exactly two places */
  if(f.d===1)return String(Math.abs(f.n)).replace(/^/,f.n<0?MINUS:'');
  if(100%f.d!==0)return decStr(f);
  const sc=f.n*(100/f.d), neg=sc<0, a=Math.abs(sc);
  if(a%100===0)return (neg?MINUS:'')+(a/100);
  return (neg?MINUS:'')+Math.floor(a/100)+'.'+String(a%100).padStart(2,'0');
}
function fracStr(f){
  if(f.d===1)return (f.n<0?MINUS:'')+Math.abs(f.n);
  return (f.n<0?MINUS:'')+Math.abs(f.n)+'/'+f.d;
}
/* the default: integers plain, tidy decimals as decimals, else a fraction */
function fmt(f,style){
  if(style==='money')return moneyStr(f);
  if(style==='frac')return fracStr(f);
  if(style==='dec'){ const s=decStr(f); return s!==null?s:fracStr(f); }
  if(f.d===1)return (f.n<0?MINUS:'')+Math.abs(f.n);
  const s=decStr(f);
  return s!==null?s:fracStr(f);
}
/* what a student would type on the pad for this value */
function typedForm(f,style){
  const s=fmt(f,style);
  return s.replace(/−/g,'-');
}

/* ═══ 2. RANDOM (swappable, so the weekly paper can be seeded) ═ */
let rng=Math.random;
function rnd(a,b){ return a+Math.floor(rng()*(b-a+1)); }
function pick(arr){ return arr[Math.floor(rng()*arr.length)]; }
function shuffle(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
function nz(a,b){ let v=rnd(a,b); if(v===0)v=b||1; return v; }       /* never zero */
function mulberry32(s){
  return function(){
    s|=0; s=s+0x6D2B79F5|0;
    let t=Math.imul(s^s>>>15, 1|s);
    t=t+Math.imul(t^t>>>7, 61|t)^t;
    return ((t^t>>>14)>>>0)/4294967296;
  };
}
function strHash(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); }
  return h>>>0;
}
function isoWeekKey(dt){
  const d=new Date(Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate()));
  const day=d.getUTCDay()||7;
  d.setUTCDate(d.getUTCDate()+4-day);
  const y0=new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const wk=Math.ceil(((d-y0)/86400000+1)/7);
  return d.getUTCFullYear()+'-W'+String(wk).padStart(2,'0');
}

/* ═══ 3. SEQUENCE HELPERS ═════════════════════════════════════ */
/* An AP is nothing but {a, d}. Everything else is derived. */
function term(a,d,n){ return Fadd(a, Fscale(d, n-1)); }
function seqStr(a,d,count,style,opts){
  opts=opts||{};
  const out=[];
  for(let i=1;i<=count;i++)out.push(fmt(term(a,d,i),style));
  let s=out.join(', ');
  if(opts.dots!==false)s+=', '+DOTS;
  if(opts.last!==undefined)s+=', '+opts.last;
  return s;
}
function nOf(a,d,val){                        /* position of val, or null if not a term */
  if(Fis0(d))return null;
  const q=Fdiv(Fsub(val,a),d);
  if(q.d!==1)return null;
  const n=q.n+1;
  return n>=1?n:null;
}

/* ═══ 4. STORAGE ══════════════════════════════════════════════ */
const Store={
  d:null,
  boot(){
    let raw=null;
    try{ raw=localStorage.getItem(CFG.store); }catch(e){}
    try{ this.d=raw?JSON.parse(raw):null; }catch(e){ this.d=null; }
    if(!this.d||typeof this.d!=='object')this.d={v:1,who:'',players:{}};
    if(!this.d.players)this.d.players={};
    if(this.d.who&&!this.d.players[this.d.who])this.mk(this.d.who);
    return this;
  },
  mk(name){
    this.d.players[name]={
      pts:0, runs:0, streak:0, lastDay:'',
      best:{},          /* mode -> {pts,acc,time} */
      lessons:{},       /* lessonId -> true */
      topics:{},        /* topicId -> {r:right, w:wrong} */
      bank:[],          /* mistake bank: {topic, q, ts} */
      weekly:{},        /* weekKey -> {first,best,attempts} */
      log:[]            /* last 40 runs */
    };
    this.d.who=name; this.save();
  },
  p(){ return this.d.who ? (this.d.players[this.d.who]||null) : null; },
  save(){ try{ localStorage.setItem(CFG.store, JSON.stringify(this.d)); }catch(e){} },
  today(){ const t=new Date(); return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate(); },
  bumpStreak(){
    const p=this.p(); if(!p)return;
    const td=this.today();
    if(p.lastDay===td)return;
    const y=new Date(); y.setDate(y.getDate()-1);
    const yd=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    p.streak=(p.lastDay===yd)?(p.streak||0)+1:1;
    p.lastDay=td; this.save();
  },
  liveStreak(){
    const p=this.p(); if(!p||!p.lastDay)return 0;
    const td=this.today();
    const y=new Date(); y.setDate(y.getDate()-1);
    const yd=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    return (p.lastDay===td||p.lastDay===yd)?(p.streak||0):0;
  },
  scoreTopic(topic,ok){
    const p=this.p(); if(!p)return;
    if(!p.topics[topic])p.topics[topic]={r:0,w:0};
    p.topics[topic][ok?'r':'w']++;
  },
  bankAdd(q){
    const p=this.p(); if(!p||!q||!q.topic)return;
    p.bank=p.bank||[];
    if(p.bank.length>=40)p.bank.shift();
    p.bank.push({topic:q.topic, ts:Date.now()});
  },
  bankClear(topic){
    const p=this.p(); if(!p||!p.bank)return;
    const i=p.bank.findIndex(b=>b.topic===topic);
    if(i>=0)p.bank.splice(i,1);
  }
};

/* ═══ 5. SOUND — synthesized, no files ════════════════════════ */
const Snd={
  ctx:null, on:true, haptics:true,
  boot(){
    try{
      const s=localStorage.getItem(CFG.store+'.snd');
      if(s!==null)this.on=s==='1';
      const h=localStorage.getItem(CFG.store+'.hap');
      if(h!==null)this.haptics=h==='1';
    }catch(e){}
    return this;
  },
  set(v){ this.on=v; try{ localStorage.setItem(CFG.store+'.snd', v?'1':'0'); }catch(e){} if(v)this.wake(); },
  setHap(v){ this.haptics=v; try{ localStorage.setItem(CFG.store+'.hap', v?'1':'0'); }catch(e){} },
  wake(){
    if(this.ctx)return this.ctx;
    try{
      const AC=window.AudioContext||window.webkitAudioContext;
      if(!AC)return null;
      this.ctx=new AC();
      if(this.ctx.state==='suspended')this.ctx.resume();
    }catch(e){ this.ctx=null; }
    return this.ctx;
  },
  tone(freq,dur,type,vol,slideTo,lp){
    if(!this.on)return;
    const c=this.wake(); if(!c)return;
    const t=c.currentTime;
    const o=c.createOscillator(), g=c.createGain();
    o.type=type||'sine';
    o.frequency.setValueAtTime(freq,t);
    if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,t+dur);
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime((vol||0.45)*0.45, t+0.014);   /* ~14ms attack */
    g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
    let node=o;
    if(lp){ const f=c.createBiquadFilter(); f.type='lowpass'; f.frequency.value=lp; o.connect(f); node=f; }
    node.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t+dur+0.02);
  },
  key(){ this.tone(1180,0.03,'sine',0.18); },
  tap(){ this.tone(720,0.07,'sine',0.32); },
  right(streak){
    const base=[659.25,987.77,1318.5];         /* E5 · B5 · E6 */
    base.forEach((f,i)=>setTimeout(()=>this.tone(f*(streak>4?1.06:1),0.16,'triangle',0.34),i*70));
    this.buzz([12,40,12]);
  },
  wrong(){ this.tone(210,0.30,'sine',0.30,128,700); this.buzz(90); },
  done(){
    [523.25,659.25,783.99,1046.5].forEach((f,i)=>setTimeout(()=>this.tone(f,0.34,'triangle',0.30),i*110));
    this.tone(130.81,1.1,'sine',0.14);
  },
  buzz(p){
    if(!this.haptics)return;
    try{
      const ua=navigator.userActivation;
      if(ua&&!ua.hasBeenActive)return;      /* keeps the console clean before the first real tap */
      navigator.vibrate&&navigator.vibrate(p);
    }catch(e){}
  }
};

/* ═══ 6. DOM PLUMBING ═════════════════════════════════════════ */
const $=id=>document.getElementById(id);
const REDUCED=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s){ return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

let curScreen='title';
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  const el=$('s-'+id); if(el)el.classList.add('on');
  curScreen=id;
  document.body.classList.toggle('playing', id==='play');
  window.scrollTo(0,0);
}

let toastT=null;
function toast(msg){
  const t=$('toast'); t.textContent=msg; t.classList.add('on');
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),2200);
}

/* one sheet at a time; closes via the cross, the scrim and Escape */
let sheetClose=null;
function openSheet(html,opts){
  opts=opts||{};
  const host=$('sheetHost');
  host.innerHTML='<div class="scrim"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>'+html+'</div>';
  void host.offsetHeight;                 /* force layout so the slide has a start value */
  host.classList.add('on');               /* synchronous — rAF does not run in a hidden tab */
  const done=()=>{
    host.classList.remove('on');
    setTimeout(()=>{ if(!host.classList.contains('on'))host.innerHTML=''; },340);
    sheetClose=null;
    if(opts.onClose)opts.onClose();
  };
  sheetClose=opts.locked?null:done;
  if(!opts.locked)host.querySelector('.scrim').addEventListener('click',done);
  host.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',done));
  return done;
}
function closeSheet(){ if(sheetClose)sheetClose(); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape')closeSheet(); });

/* write the true value first, then animate toward it */
function countTo(el,target,ms){
  el.textContent=target;
  if(REDUCED())return;
  const from=0, t0=performance.now(), dur=ms||700;
  const step=now=>{
    const k=Math.min(1,(now-t0)/dur);
    el.textContent=Math.round(from+(target-from)*(1-Math.pow(1-k,3)));
    if(k<1)requestAnimationFrame(step); else el.textContent=target;
  };
  requestAnimationFrame(step);
}
