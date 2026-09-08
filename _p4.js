/* ════════════════════════════════════════════════════════════════
   GENERATORS

   Every wrong option below is a mistake that was actually made in
   class, or one the teacher stopped to warn about. That is the
   whole point: a random distractor tests elimination, a
   misconception distractor tells you which rule is broken.

   The big four, in the order they were taught:
     a + n·d  instead of  a + (n−1)d   — "20th term matlab ek kam"
     a₁ − a₂ instead of  a₂ − a₁       — d comes out sign-flipped
     "it looks patterned, so it's an AP" — 0.2, 0.22, 0.222
     "multiply bhi to pattern hai"      — GP / powers / compound interest
   ════════════════════════════════════════════════════════════════ */

const TOPICS={
  isap:'AP hai ya nahi',
  findd:'a aur d find karna',
  build:'a aur d se AP banana',
  next:'Agle terms likhna',
  table:'a, d, n, aₙ ka table',
  missing:'Missing terms (boxes)',
  twoterm:'Do terms se poora AP',
  exceeds:'Exceeds by wale sawaal',
  countap:'Kitne numbers hain',
  equalterm:'Do APs ka same term',
  twoap:'Do APs, same d',
  figure:'Figure ka pattern',
  sumn:'Sum of n terms',
  sumto:'Sum, last term diya ho',
  sumtable:'Sum wala table',
  sumhow:'Kitne terms se ye sum',
  sumterms:'Terms se sum',
  sumformula:'Formula se sum, sum se term',
  summult:'Multiples ka sum',
  sumapply:'Sum ke word problems',
  sumsymb:'Sum ka formula',
  casestudy:'Case study',
  nth:'nth term — a + (n−1)d',
  findn:'Position aur number of terms',
  fromend:'End se nth term',
  mid:'Middle term',
  symb:'Formula ki pehchan',
  situation:'Situation se AP',
  translate:'English se equation',
  twoeq:'Do equations se a aur d',
  apply:'Word problem solve'
};
const VA='<i class="va">a</i>', VD='<i class="vd">d</i>', VN='<i class="vn">n</i>';
const FORMULA=VA+' + ('+VN+' &minus; 1)'+VD;

function ord(n){
  const s=['th','st','nd','rd'], v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}
/* the pad produces digits, one dot and a sign — nothing else. A value is
   typeable only if it is displayed as one of those, so the display style
   matters as much as the value. */
function canType(f,style){
  if(style==='frac')return false;
  return f.d===1 || 100%f.d===0;
}
function styleFor(f){ return f.d===1 ? 'auto' : (100%f.d===0 ? 'money' : 'frac'); }

/* build a 4-option MCQ from {lb, ok, why} entries: exactly one ok,
   all labels distinct, order shuffled */
function opts4(list){
  const seen=new Set(), out=[];
  for(const o of list){
    if(o==null)continue;
    if(seen.has(o.lb))continue;
    if(!o.ok && out.some(x=>x.ok&&x.lb===o.lb))continue;
    seen.add(o.lb); out.push(o);
    if(out.length===4)break;
  }
  return shuffle(out);
}

/* ── 1 · IS IT AN AP? ──────────────────────────────────────── */
const NO_REASONS=[
  'Nahi — gaps equal nahi hain',
  'Nahi — har baar multiply ho raha hai, add nahi',
  'Nahi — gap khud badhta ja raha hai',
  'Nahi — sirf shuru ke do gap equal hain',
  'Nahi — power badh rahi hai, term nahi'
];

function apFamily(lvl){
  const F_=[];
  /* — genuine APs — */
  F_.push(()=>{ const a=nz(-9,14), d=nz(2,9);
    return {terms:[1,2,3,4].map(i=>fmt(term(F(a),F(d),i))), yes:true, dLab:fmt(F(d)), g1:F(d)}; });
  F_.push(()=>{ const a=nz(4,30), d=-nz(2,7);
    return {terms:[1,2,3,4].map(i=>fmt(term(F(a),F(d),i))), yes:true, dLab:fmt(F(d)), g1:F(d)}; });
  F_.push(()=>{ const a=nz(-6,9);
    return {terms:[a,a,a,a].map(x=>fmt(F(x))), yes:true, dLab:'0', g1:Fz,
            note:'Gap zero bhi ek equal gap hai. Har term mein 0 add ho raha hai.'}; });
  F_.push(()=>{ const v=pick(['a','x','k']);
    return {terms:[v,'2'+v,'3'+v,'4'+v], yes:true, dLab:v, g1:null, symbolic:true,
            note:v+', 2'+v+', 3'+v+' — har baar ek '+v+' aur add ho raha hai.'}; });
  F_.push(()=>{ const b=nz(2,7), r=pick([2,3,5,7]);
    return {terms:[String(b), b+'+&radic;'+r, b+'+2&radic;'+r, b+'+3&radic;'+r],
            yes:true, dLab:'&radic;'+r, g1:null, symbolic:true,
            note:'Har baar ek &radic;'+r+' aur add ho raha hai — gap equal hai.'}; });
  if(lvl>1)F_.push(()=>{ const a=nz(1,6), n=nz(1,4), d2=pick([2,3,4]);
    return {terms:[0,1,2,3].map(i=>fracStr(Fadd(F(a),Fscale(F(n,d2),i)))),
            yes:true, dLab:fracStr(F(n,d2)), g1:F(n,d2)}; });
  F_.push(()=>{ const r=pick([2,3,5]);
    return {terms:[1,2,3,4].map(i=>'&radic;'+(i*i*r)), yes:true, dLab:'&radic;'+r, g1:null, symbolic:true,
            note:'Simplify karo: &radic;'+r+', 2&radic;'+r+', 3&radic;'+r+', 4&radic;'+r+' — har baar ek &radic;'+r+' add ho raha hai.'}; });
  F_.push(()=>{ const r=pick([3,5,7]);
    return {terms:[1,2,3,4].map(i=>'&radic;'+(i*r)), yes:false, dLab:'&radic;'+r,
            why:'Nahi — gaps equal nahi hain', g1:null, symbolic:true,
            note:'Andar ke numbers AP me hain, lekin root lagne ke baad gaps equal nahi rehte. Value find karke dekho.'}; });
  F_.push(()=>{ const a0=rnd(-6,6), dd=pick([2,-2,3,-3]);
    const A=F(a0*10+pick([2,5,8]),10), D=F(dd*10,10);
    return {terms:[1,2,3,4].map(i=>decStr(term(A,D,i))), yes:true, dLab:decStr(D), g1:D,
            note:'Decimal se mat darna — gap wahi ek jaisa hai.'}; });
  if(lvl>1)F_.push(()=>{ const a0=rnd(-4,4)*25, dd=pick([25,50,-25,-75]);
    const A=F(a0,100), D=F(dd,100);
    return {terms:[1,2,3,4].map(i=>moneyStr(term(A,D,i))), yes:true, dLab:moneyStr(D), g1:D,
            note:'Paise ki tarah dekho — har baar utna hi add ho raha hai.'}; });

  /* — not APs — */
  F_.push(()=>{ const b=pick([2,3]), a=nz(1,3);
    return {terms:[a,a*b,a*b*b,a*b*b*b].map(x=>fmt(F(x))), yes:false,
            why:'Nahi — har baar multiply ho raha hai, add nahi',
            g1:F(a*b-a), note:'Ye '+b+' se multiply ho raha hai. Chess ke chawal wali kahani yaad hai? Wo AP nahi, wo aur tez bhagta hai.'}; });
  F_.push(()=>{ const s=nz(1,3);
    return {terms:[s,s+1,s+2,s+3].map(i=>i+'&sup2;'), yes:false, dLab:'1',
            why:'Nahi — gap khud badhta ja raha hai', g1:null, symbolic:true,
            note:'Value find karo: '+[s,s+1,s+2,s+3].map(i=>i*i).join(', ')+'. Gaps alag alag hain.'}; });
  F_.push(()=>{ const s=pick([1,3,5]);
    return {terms:[s,s+2,s+4,s+6].map(i=>i+'&sup2;'), yes:false, dLab:'2',
            why:'Nahi — gap khud badhta ja raha hai', g1:null, symbolic:true,
            note:'Andar odd numbers hain, lekin square karne ke baad '+[s,s+2,s+4,s+6].map(i=>i*i).join(', ')+' — gaps equal nahi.'}; });
  F_.push(()=>{ const v=pick(['a','x']);
    return {terms:[v,v+'&sup2;',v+'&sup3;',v+'&#8308;'], yes:false, dLab:v,
            why:'Nahi — power badh rahi hai, term nahi', g1:null, symbolic:true,
            note:v+'&sup2; me se '+v+' minus nahi hota — jaise x&sup2; me se x subtract nahi kar sakte.'}; });
  F_.push(()=>{ const k=pick([2,3]);
    return {terms:['0.'+k, '0.'+k+k, '0.'+k+k+k, '0.'+k+k+k+k], yes:false, dLab:'0.0'+k,
            why:'Nahi — gaps equal nahi hain', g1:null, symbolic:true,
            note:'Paise mein dekho: 0.'+k+' aur 0.0'+k+' ek cheez nahi hai. Pehla gap 0.0'+k+', doosra 0.00'+k+'.'}; });
  F_.push(()=>{ const a=nz(2,9), d=nz(2,6);
    const t=[a,a+d,a+2*d,a+3*d+nz(1,3)];
    return {terms:t.map(x=>fmt(F(x))), yes:false,
            why:'Nahi — sirf shuru ke do gap equal hain', g1:F(d),
            note:'Isiliye paanch se zyada terms ho toh a&#8324; &minus; a&#8323; bhi check karna. Shuru mein pattern chalta hai, aage badal deta hai.'}; });
  F_.push(()=>{ const P=pick([10000,20000,5000]), r=pick([8,10]);
    const v=[P]; for(let i=0;i<3;i++)v.push(Math.round(v[v.length-1]*(100+r)/100));
    return {terms:v.map(x=>fmt(F(x))), yes:false,
            why:'Nahi — gap khud badhta ja raha hai', g1:F(v[1]-v[0]),
            note:'Compound interest hai. Pehle saal '+(v[1]-v[0])+' ka byaaj, doosre saal '+(v[2]-v[1])+' ka. Interest hi badalta ja raha hai.'}; });
  return pick(F_)();
}

function gIsAP(lvl){
  const f=apFamily(lvl);
  const st = g=>g.d===1?'auto':(100%g.d===0?'money':'frac');
  const g1lab = f.g1 ? fmt(f.g1, st(f.g1)) : String(f.dLab);
  let flip = f.g1 ? fmt(Fneg(f.g1), st(f.g1))
                  : (g1lab.startsWith(MINUS)?g1lab.slice(1):MINUS+g1lab);
  let flipWhy='Sign ulta ho gaya. '+VD+' = a&#8322; &minus; a&#8321;, pehle wale me se doosra nahi.';
  if(flip===g1lab){                       /* d = 0 — negating it changes nothing */
    flip=f.terms[0];
    flipWhy='Ye pehla term hai, gap nahi. Yahan gap zero ka hai — aur zero bhi ek equal gap hai.';
  }
  const trueNo = f.why || NO_REASONS[0];
  const decoyNo = pick(NO_REASONS.filter(r=>r!==trueNo));
  const list=[
    {lb:'Haan — '+VD+' = '+g1lab, ok:!!f.yes, why:f.yes?'':'Pehla gap dekh ke haan bol diya. Aage ke gaps bhi check karo.'},
    {lb:'Haan — '+VD+' = '+flip,  ok:false,   why:flipWhy},
    {lb:trueNo,  ok:!f.yes, why:f.yes?'Gaps toh equal hain — check karke dekho.':''},
    {lb:decoyNo, ok:false,  why:'Reason theek nahi hai.'}
  ];
  return {
    topic:'isap', kicker:'AP hai ya nahi',
    lead:'Ye AP hai kya?',
    seq:f.terms.join(', ')+', '+DOTS,
    mode:'mcq', opts:opts4(list),
    ansLabel:(f.yes?'Haan — d = '+f.dLab:trueNo),
    work:[
      {t:'a&#8322; &minus; a&#8321; = '+f.terms[1]+' &minus; '+f.terms[0], why:'Doosre term me se pehla subtract karo.'},
      {t:'a&#8323; &minus; a&#8322; = '+f.terms[2]+' &minus; '+f.terms[1], why:'Phir teesre me se doosra.'},
      {t:(f.yes?'Dono equal aa rahe hain &rarr; ye AP hai, '+VD+' = '+f.dLab
               :'Dono equal nahi aa rahe &rarr; ye AP nahi hai.'), why:f.note||''}
    ],
    say:f.yes?'Gap equal = AP. Bas itni si baat hai.'
             :'Yaad rakho — AP ka rule sirf AP pe chalega. Ek game ka cheat code doosre game me nahi chalta.'
  };
}

/* ── 2 · FIND a AND d ──────────────────────────────────────── */
function gFindD(lvl){
  let a,d,style='auto';
  if(lvl===1){ a=F(nz(1,15)); d=F(nz(2,9)); }
  else if(lvl===2){ a=F(nz(-14,14)); d=F(-nz(2,9)); }
  else{
    if(rng()<0.5){ const k=pick([25,50,75,-25,-50]); a=F(rnd(-4,6)*25,100); d=F(k,100); style='money'; }
    else{ const dn=pick([2,3,4]); a=F(nz(-4,6)); d=F(nz(1,5),dn); style='frac'; }
  }
  const seq=seqStr(a,d,4,style);
  const wrong=[
    {v:Fneg(d), why:'Ye a&#8321; &minus; a&#8322; hai. Hamesha baad wale me se pehle wala subtract karo.'},
    {v:Fscale(d,2), why:'Ye a&#8323; &minus; a&#8321; hai — do gap ek saath. Ek gap chahiye.'},
    {v:term(a,d,2), why:'Ye doosra term hai, gap nahi.'},
    {v:a, why:'Ye pehla term hai. '+VD+' gap hota hai.'},
    {v:term(a,d,3), why:'Ye teesra term hai, gap nahi.'},
    {v:Fscale(d,3), why:'Ye teen gap ek saath hain.'}
  ].filter(w=>!Feq(w.v,d));
  const canT = lvl===3 && canType(d,style);
  return {
    topic:'findd', kicker:'Common difference',
    lead:'Is AP ka common difference '+VD+' kya hai?',
    seq:seq,
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(d,style),ok:true}].concat(
      shuffle(wrong).map(w=>({lb:fmt(w.v,style),ok:false,why:w.why})))),
    ansLabel:fmt(d,style), ansTyped:typedForm(d,style),
    work:[
      {t:VD+' = a&#8322; &minus; a&#8321; = '+fmt(term(a,d,2),style)+' &minus; '+fmt(a,style)+' = '+fmt(d,style),
       why:'Koi bhi term pakdo, uske pichle wale ko subtract karo.'},
      {t:'Check: a&#8323; &minus; a&#8322; = '+fmt(term(a,d,3),style)+' &minus; '+fmt(term(a,d,2),style)+' = '+fmt(d,style),
       why:'Barabar aaya — matlab sach me AP hai.'}
    ],
    say:'Baad wale me se pehle wala. Ulta karoge toh sign ulta aa jayega.'
  };
}

function gFindAD(lvl){
  let a,d,style='auto';
  if(lvl===1){ a=F(nz(1,12)); d=F(nz(2,7)); }
  else if(lvl===2){ a=F(nz(-12,12)); d=F(-nz(2,8)); }
  else if(rng()<0.5){ const dn=pick([2,3,4]); a=F(nz(-5,8)); d=F(nz(-6,6)||1,dn); style='frac'; }
  else{ a=F(rnd(-40,60),10); d=F(nz(-25,25),10); style='dec'; }
  const right=VA+' = '+fmt(a,style)+', '+VD+' = '+fmt(d,style);
  const list=[
    {lb:right, ok:true},
    {lb:VA+' = '+fmt(a,style)+', '+VD+' = '+fmt(Fneg(d),style), ok:false, why:'Sign ulta. a&#8322; &minus; a&#8321; karo, ulta nahi.'},
    {lb:VA+' = '+fmt(term(a,d,2),style)+', '+VD+' = '+fmt(d,style), ok:false, why:VA+' pehla term hota hai, doosra nahi.'},
    {lb:VA+' = '+fmt(a,style)+', '+VD+' = '+fmt(Fscale(d,2),style), ok:false, why:'Ye do gap hain. Ek gap chahiye.'}
  ];
  return {
    topic:'findd', kicker:'a aur d',
    lead:'Is AP ka pehla term aur common difference batao.',
    seq:seqStr(a,d,4,style),
    mode:'mcq', opts:opts4(list), ansLabel:right,
    work:[
      {t:VA+' = pehla term = '+fmt(a,style), why:'Jo sabse pehle likha hai, wahi '+VA+'.'},
      {t:VD+' = a&#8322; &minus; a&#8321; = '+fmt(term(a,d,2),style)+' &minus; '+fmt(a,style)+' = '+fmt(d,style), why:'Gap.'}
    ],
    say:'AP me bas do cheezein sabse important hain — '+VA+' aur '+VD+'. Baaki sab inhi se banta hai.'
  };
}

/* ── 3 · BUILD THE AP FROM a AND d ─────────────────────────── */
function gBuild(lvl){
  let a,d,style='auto';
  if(lvl===1){ a=F(pick([1,3,5,10,7])); d=F(pick([2,3,4,5,10])); }
  else if(lvl===2){
    a=F(nz(-9,9));
    d=rng()<0.18 ? Fz : F(nz(-8,8));        /* a = −2, d = 0 is in the book */
  }
  else{
    if(rng()<0.5){ a=F(nz(-3,3)); d=F(pick([1,-1,3,-3]),pick([2,3,4])); style='frac'; }
    else{ a=F(pick([-125,-100,150,-75]),100); d=F(pick([-25,25,-50,50]),100); style='money'; }
  }
  const right=seqStr(a,d,4,style,{dots:false});
  const gp=[fmt(a,style)];                       /* multiplied instead of added */
  let cur=a;
  for(let i=0;i<3;i++){ cur=Fis0(d)?Fz:Fmul(cur,d); gp.push(fmt(cur,style)); }
  const onlyFirst=[fmt(a,style),fmt(Fadd(a,d),style),fmt(Fadd(a,d),style),fmt(Fadd(a,d),style)].join(', ');
  const flipped=seqStr(a,Fneg(d),4,style,{dots:false});
  /* with d = 0 the sign-flip and the multiply both land on the right answer,
     so that case gets its own set of real mistakes */
  const list = Fis0(d) ? [
    {lb:right, ok:true},
    {lb:[fmt(a,style),'0','0','0'].join(', '), ok:false,
     why:VD+' = 0 ka matlab har term me 0 add hota hai — terms zero nahi ho jaate.'},
    {lb:seqStr(a,Fone,4,style,{dots:false}), ok:false,
     why:VD+' = 0 hai, 1 nahi. Kuch add hi nahi ho raha.'},
    {lb:['0','0','0','0'].join(', '), ok:false, why:'Pehla term '+fmt(a,style)+' hai, 0 nahi.'},
    {lb:seqStr(a,Fneg(Fone),4,style,{dots:false}), ok:false, why:'Kuch subtract bhi nahi ho raha — gap zero hai.'}
  ] : [
    {lb:right, ok:true},
    {lb:flipped, ok:false, why:VD+' ka sign ulta laga diya.'},
    {lb:gp.join(', '), ok:false, why:VD+' ko multiply kiya hai. AP me '+VD+' add hota hai.'},
    {lb:onlyFirst, ok:false, why:'Sirf pehle term me '+VD+' add kiya. Har term me add karna hai.'},
    {lb:seqStr(a,Fscale(d,2),4,style,{dots:false}), ok:false, why:'Har baar do gap add kar diye.'},
    {lb:seqStr(Fadd(a,d),d,4,style,{dots:false}), ok:false, why:'Pehle term me hi '+VD+' add kar diya. '+VA+' waisa ka waisa rehta hai.'}
  ];
  return {
    topic:'build', kicker:'AP banao',
    lead:VA+' = '+fmt(a,style)+' aur '+VD+' = '+fmt(d,style)+' hai. Pehle chaar term kaunse honge?',
    mode:'mcq', opts:opts4(list), ansLabel:right, seqOpts:true,
    work:[
      {t:'a&#8321; = '+fmt(a,style), why:'Pehla term diya hua hai.'},
      {t:'a&#8322; = '+fmt(a,style)+' + '+fmt(d,style)+' = '+fmt(term(a,d,2),style), why:'Pehle term me '+VD+' add karo.'},
      {t:'a&#8323; = '+fmt(term(a,d,2),style)+' + '+fmt(d,style)+' = '+fmt(term(a,d,3),style), why:'Phir usme '+VD+' add karo.'},
      {t:'a&#8324; = '+fmt(term(a,d,3),style)+' + '+fmt(d,style)+' = '+fmt(term(a,d,4),style), why:'Bas yahi chalta rehta hai.'}
    ],
    say:'Har term me '+VD+' add karte jao. MCQ me yahi seedha poochha jata hai.'
  };
}

/* ── 4 · nth TERM ──────────────────────────────────────────── */
function gNth(lvl){
  let a,d,style='auto',n;
  if(lvl===1){ a=F(nz(1,12)); d=F(nz(2,7)); n=rnd(8,20); }
  else if(lvl===2){ a=F(nz(-15,15)); d=F(nz(-9,9)); n=rnd(15,60); }
  else{
    n=pick([89,97,99,50,77,101,120]);
    if(rng()<0.35){ a=F(nz(-4,6)); d=F(pick([1,3,-1,-3]),pick([2,4])); style='frac'; }
    else{ a=F(nz(-20,20)); d=F(nz(-12,12)); }
  }
  const ans=term(a,d,n);
  const wrong=[
    {v:term(a,d,n+1), why:'Ye a + '+VN+'&middot;'+VD+' hai. '+n+'th term me '+(n-1)+' gaps hote hain — ek kam.'},
    {v:term(a,d,n-1), why:'Ek gap kam le liya. '+n+'th term = '+VA+' + '+(n-1)+VD+'.'},
    {v:Fscale(d,n), why:VA+' add karna bhool gaye.'},
    {v:Fsub(a,Fscale(d,n-1)), why:VD+' ka sign ulta laga diya.'},
    {v:a, why:'Ye pehla term hai. '+n+'th find karna tha.'},
    {v:Fscale(d,n-1), why:VA+' add karna bhool gaye — sirf gaps add kar diye.'}
  ].filter(w=>!Feq(w.v,ans));
  const canT = lvl===3 && canType(ans,style);
  const nth=ord(n);
  return {
    topic:'nth', kicker:'nth term',
    lead:'Is AP ka '+nth+' term kya hoga?',
    seq:seqStr(a,d,4,style),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(ans,style),ok:true}].concat(
      shuffle(wrong).map(w=>({lb:fmt(w.v,style),ok:false,why:w.why})))),
    ansLabel:fmt(ans,style), ansTyped:typedForm(ans,style),
    work:[
      {t:VA+' = '+fmt(a,style)+',&nbsp; '+VD+' = '+fmt(term(a,d,2),style)+' &minus; '+fmt(a,style)+' = '+fmt(d,style), why:'Pehle '+VA+' aur '+VD+' find karo.'},
      {t:'a<sub>'+n+'</sub> = '+FORMULA.replace(VN,n)+' = '+VA+' + '+(n-1)+VD, why:'Sidhi me '+n+' step hain toh gap '+(n-1)+' hain.'},
      {t:'= '+fmt(a,style)+' + '+(n-1)+'('+fmt(d,style)+') = '+fmt(ans,style), why:'Value daal do, bas.'}
    ],
    say:n+'th term matlab '+(n-1)+' gaps. Ek kam — hamesha.'
  };
}

/* ── 5 · POSITION / NUMBER OF TERMS ────────────────────────── */
function gFindN(lvl){
  const kind = lvl===1 ? pick(['which','count'])
             : lvl===2 ? pick(['which','count','zero'])
             : pick(['which','count','zero','member']);
  let a,d,style='auto',n,val;
  if(lvl===1){ a=F(nz(1,10)); d=F(nz(2,6)); n=rnd(8,25); }
  else if(lvl===2){ a=F(nz(-12,20)); d=F(nz(-8,9)); n=rnd(10,45); }
  else{ a=F(nz(-20,30)); d=F(nz(-11,11)); n=rnd(20,80); }

  if(kind==='zero'){ d=F(nz(-9,-2)); n=rnd(7,22); a=Fneg(Fscale(d,n-1)); val=Fz; }
  else val=term(a,d,n);

  if(kind==='member'){
    /* a value that is NOT a term — "is 168 is AP me aayega?" */
    const near=Fadd(val,F(1));
    if(nOf(a,d,near)===null){
      const list=[
        {lb:'Nahi — ye is AP ka term hai hi nahi', ok:true},
        {lb:'Haan — '+n+'th term', ok:false, why:'Position poori nahi aayi. '+VN+' hamesha whole number hona chahiye.'},
        {lb:'Haan — '+(n+1)+'th term', ok:false, why:'Position poori nahi aayi.'},
        {lb:'Haan — lekin position nahi find kar sakte', ok:false, why:'Find kar sakte hain — aur wo whole number nahi aaya, isliye term hai hi nahi.'}
      ];
      return {
        topic:'findn', kicker:'Term hai ya nahi',
        lead:'Kya '+fmt(near,style)+' is AP ka koi term hai?',
        seq:seqStr(a,d,4,style),
        mode:'mcq', opts:opts4(list), ansLabel:'Nahi — term hai hi nahi',
        work:[
          {t:'Maano a<sub>n</sub> = '+fmt(near,style)+' &rarr; '+fmt(a,style)+' + ('+VN+' &minus; 1)('+fmt(d,style)+') = '+fmt(near,style), why:'Formula lagao aur '+VN+' find karo.'},
          {t:VN+' &minus; 1 = '+fracStr(Fdiv(Fsub(near,a),d)), why:'Poora number nahi aaya.'},
          {t:VN+' whole number nahi &rarr; ye term hai hi nahi', why:'Position aadhi nahi hoti. Koi 7.5th term nahi hota.'}
        ],
        say:VN+' hamesha ginti ka number hai. Fraction aaya matlab wo number series me hai hi nahi.'
      };
    }
    val=term(a,d,n);
  }

  const last=fmt(val,style);
  const isCount = kind==='count';
  const lead = kind==='zero' ? 'Is AP ka kaunsa term zero hai?'
             : isCount       ? 'Is AP me kitne terms hain?'
             :                 'Is AP me '+last+' kaunse number ka term hai?';
  const wrong=[
    {v:n-1, why:'Gaps gin liye, steps nahi. Gaps '+(n-1)+' hain toh terms '+n+'. Plus one karna hai.'},
    {v:n+1, why:'Ek extra step gin liya.'},
    {v:n+2, why:'Do step aage nikal gaye.'},
    {v:n-2, why:'Do step peeche reh gaye.'},
    {v:2*n, why:'Position double kar di.'},
    {v:n+3, why:'Teen step aage nikal gaye.'}
  ].filter(w=>w.v!==n && w.v>0);
  const canT = lvl>=2;
  return {
    topic:'findn', kicker:isCount?'Kitne terms':'Position',
    lead:lead,
    seq:seqStr(a,d,4,style,{dots:true,last:last}),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(n), ansTyped:String(n),
    work:[
      {t:VA+' = '+fmt(a,style)+',&nbsp; '+VD+' = '+fmt(d,style)+',&nbsp; last term = '+last, why:'Jo diya hai wo pehle likho.'},
      {t:'l = '+FORMULA+' &rarr; '+last+' = '+fmt(a,style)+' + ('+VN+' &minus; 1)('+fmt(d,style)+')', why:'Last term ka formula bhi wahi hai.'},
      {t:VN+' &minus; 1 = '+(n-1)+' &rarr; '+VN+' = '+n, why:'Plus one karna mat bhoolna — sidhi wala plus one.'}
    ],
    say:'Gaps '+(n-1)+', steps '+n+'. Wahi purani sidhi.'
  };
}

/* ── 6 · nth TERM FROM THE END ─────────────────────────────── */
function gFromEnd(lvl){
  const d=F(lvl===1?nz(2,7):nz(-9,9)||3);
  const a=F(nz(1,20));
  const N=rnd(20,60);
  const l=term(a,d,N);
  const k=rnd(4,12);
  const ans=Fsub(l,Fscale(d,k-1));
  const kth=ord(k);
  const wrong=[
    {v:term(a,d,k), why:'Ye shuru se '+kth+' term hai. End se poochha gaya hai.'},
    {v:Fsub(l,Fscale(d,k)), why:'Ek gap zyada le liya. End se '+kth+' me bhi gaps '+(k-1)+' hi hote hain.'},
    {v:Fsub(l,Fscale(d,k-2)), why:'Ek gap kam le liya.'},
    {v:Fadd(l,Fscale(d,k-1)), why:'Plus kar diya. End se aa rahe ho toh subtract karna hai.'},
    {v:l, why:'Ye last term hai — end se pehla. '+kth+' poocha gaya hai.'},
    {v:a, why:'Ye pehla term hai. End se ginna tha.'}
  ].filter(w=>!Feq(w.v,ans));
  const canT=lvl===3&&canType(ans,'auto');
  return {
    topic:'fromend', kicker:'End se',
    lead:'End se '+kth+' term kya hoga?',
    seq:seqStr(a,d,3,'auto',{dots:true,last:fmt(l)}),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(ans),ok:true}].concat(
      shuffle(wrong).map(w=>({lb:fmt(w.v),ok:false,why:w.why})))),
    ansLabel:fmt(ans), ansTyped:typedForm(ans),
    work:[
      {t:'End se chalo toh shuruaat l se hoti hai, aur '+VD+' subtract hota jaata hai', why:'Ulti sidhi utar rahe ho.'},
      {t:'End se '+kth+' term = l &minus; ('+k+' &minus; 1)'+VD+' = '+fmt(l)+' &minus; '+(k-1)+'('+fmt(d)+')', why:'Wahi n&minus;1 wala rule, bas ulta.'},
      {t:'= '+fmt(ans), why:''}
    ],
    say:'Shuru se a + (n−1)d, end se l − (n−1)d. Gap wahi, direction alag.'
  };
}

/* ── 7 · MIDDLE TERM(S) ────────────────────────────────────── */
function gMid(lvl){
  const wantEven = lvl===3 ? (rng()<0.5) : (lvl===2 ? false : rng()<0.5);
  let N = wantEven ? rnd(8,50)*2 : rnd(8,45)*2+1;
  const d=F(lvl===1?nz(2,6):nz(-9,9)||3);
  const a=F(nz(-10,25));
  const l=term(a,d,N);

  if(lvl===1){
    /* position only — the insight, before the arithmetic */
    const right = wantEven ? (N/2)+'th aur '+(N/2+1)+'th' : ((N+1)/2)+'th';
    const list = wantEven ? [
      {lb:right, ok:true},
      {lb:(N/2)+'th', ok:false, why:'Even number of terms hai — do middle terms aate hain, ek nahi.'},
      {lb:(N/2+1)+'th aur '+(N/2+2)+'th', ok:false, why:'Position ek aage khisak gayi.'},
      {lb:(N/2-1)+'th aur '+(N/2)+'th', ok:false, why:'Ek peeche reh gaye.'},
      {lb:((N+1)/2|0)+'th', ok:false, why:'Even terms hai — do middle terms aate hain.'}
    ] : [
      {lb:right, ok:true},
      {lb:Math.round(N/2)+'th aur '+(Math.round(N/2)+1)+'th', ok:false, why:'Odd number of terms hai — sirf ek middle term aata hai.'},
      {lb:(N/2|0)+'th', ok:false, why:VN+' + 1 karna bhool gaye. ('+N+' + 1) &divide; 2 karo.'},
      {lb:((N+1)/2+1)+'th', ok:false, why:'Ek aage nikal gaye.'},
      {lb:((N+1)/2-1)+'th', ok:false, why:'Ek peeche reh gaye.'}
    ];
    return {
      topic:'mid', kicker:'Middle term',
      lead:'Ek AP me '+N+' terms hain. Middle term kaunsi position par hoga?',
      mode:'mcq', opts:opts4(list), ansLabel:right,
      work:[
        {t:N+' '+(wantEven?'even':'odd')+' hai', why:wantEven?'Even terms &rarr; do middle terms.':'Odd terms &rarr; ek hi middle term.'},
        {t:wantEven?('Pehla = '+VN+'/2 = '+(N/2)+'th,&nbsp; doosra = '+VN+'/2 + 1 = '+(N/2+1)+'th')
                   :('('+VN+' + 1)/2 = ('+N+' + 1)/2 = '+((N+1)/2)+'th'), why:'Bas position hai — value nahi.'}
      ],
      say:wantEven?'Even terms — do beech wale. Odd terms — ek.':'Odd terms — beech me ek hi khada rehta hai.'
    };
  }

  if(!wantEven){
    const pos=(N+1)/2, ans=term(a,d,pos);
    const wrong=[
      {v:term(a,d,N/2|0), why:VN+'/2 le liya. Odd terms me ('+VN+' + 1)/2 lagta hai.'},
      {v:F(pos), why:'Ye position hai, term ki value nahi.'},
      {v:Fadd(a,l), why:'Pehla aur aakhri add kiya — middle aise nahi milta.'},
      {v:term(a,d,pos+1), why:'Ek term aage nikal gaye.'},
      {v:term(a,d,pos-1), why:'Ek term peeche reh gaye.'},
      {v:l, why:'Ye last term hai, middle nahi.'},
      {v:a, why:'Ye pehla term hai, middle nahi.'}
    ].filter(w=>!Feq(w.v,ans));
    const canT=lvl===3&&canType(ans,'auto');
    return {
      topic:'mid', kicker:'Middle term',
      lead:'Is AP ka middle term kya hai?',
      seq:seqStr(a,d,3,'auto',{dots:true,last:fmt(l)}),
      mode:canT?'type':'mcq',
      opts:canT?null:opts4([{lb:fmt(ans),ok:true}].concat(
        shuffle(wrong).map(w=>({lb:fmt(w.v),ok:false,why:w.why})))),
      ansLabel:fmt(ans), ansTyped:typedForm(ans),
      work:[
        {t:'Pehle '+VN+': l = '+FORMULA+' &rarr; '+fmt(l)+' = '+fmt(a)+' + ('+VN+' &minus; 1)('+fmt(d)+') &rarr; '+VN+' = '+N,
         why:'Middle find karne se pehle total terms find karna padta hai.'},
        {t:N+' odd hai &rarr; ek middle term, position ('+N+' + 1)/2 = '+pos, why:'Odd &rarr; ek.'},
        {t:'a<sub>'+pos+'</sub> = '+fmt(a)+' + '+(pos-1)+'('+fmt(d)+') = '+fmt(ans), why:'Ab wahi purana formula.'}
      ],
      say:'Middle term ka question 3 marks ka hai, aur board me aata hi hai.'
    };
  }

  const p1=N/2, p2=N/2+1, t1=term(a,d,p1), t2=term(a,d,p2);
  const right=fmt(t1)+' aur '+fmt(t2);
  const list=[
    {lb:right, ok:true},
    {lb:fmt(term(a,d,p1-1))+' aur '+fmt(t1), ok:false, why:'Ek position peeche reh gaye.'},
    {lb:fmt(t2)+' aur '+fmt(term(a,d,p2+1)), ok:false, why:'Ek position aage nikal gaye.'},
    {lb:p1+' aur '+p2, ok:false, why:'Ye positions hain, values nahi. '+p1+'th aur '+p2+'th term ki value find karni thi.'},
    {lb:fmt(a)+' aur '+fmt(l), ok:false, why:'Ye pehla aur aakhri term hain. Beech wale chahiye the.'},
    {lb:fmt(term(a,d,p1-1))+' aur '+fmt(term(a,d,p2+1)), ok:false, why:'Dono taraf ek-ek term door nikal gaye.'}
  ];
  return {
    topic:'mid', kicker:'Middle terms',
    lead:'Is AP ke middle terms kya hain?',
    seq:seqStr(a,d,3,'auto',{dots:true,last:fmt(l)}),
    mode:'mcq', opts:opts4(list), ansLabel:right, seqOpts:true,
    work:[
      {t:'Pehle '+VN+': '+fmt(l)+' = '+fmt(a)+' + ('+VN+' &minus; 1)('+fmt(d)+') &rarr; '+VN+' = '+N, why:'Total terms.'},
      {t:N+' even hai &rarr; do middle terms: '+VN+'/2 = '+p1+'th aur '+VN+'/2 + 1 = '+p2+'th', why:'Even &rarr; do.'},
      {t:'a<sub>'+p1+'</sub> = '+fmt(a)+' + '+(p1-1)+'('+fmt(d)+') = '+fmt(t1), why:''},
      {t:'a<sub>'+p2+'</sub> = '+fmt(a)+' + '+(p2-1)+'('+fmt(d)+') = '+fmt(t2), why:'Doosra hamesha pehle se ek aage hi hota hai.'}
    ],
    say:'Even terms — do beech wale, aur doosra hamesha pehle wale ke bilkul baad.'
  };
}

/* ── 8 · SYMBOLIC RECALL ───────────────────────────────────── */
function gSymb(lvl){
  const kind=pick(['nthOf','means','pth','last','end','second']);
  if(kind==='nthOf'){
    const n=pick([47,89,97,99,100,73,999]);
    const list=[
      {lb:VA+' + '+(n-1)+VD, ok:true},
      {lb:VA+' + '+n+VD, ok:false, why:n+'th term me gaps '+(n-1)+' hote hain. Ek kam.'},
      {lb:VA+' + '+(n-2)+VD, ok:false, why:'Ek gap kam ho gaya.'},
      {lb:n+VA+' + '+VD, ok:false, why:VA+' ek hi baar aata hai — multiply nahi hota.'}
    ];
    return {topic:'symb',kicker:'Formula',lead:'Kisi bhi AP ka '+n+'th term kya hoga?',
      mode:'mcq',opts:opts4(list),ansLabel:'a + '+(n-1)+'d',
      work:[{t:'a<sub>n</sub> = '+FORMULA, why:'Yahi poora chapter hai.'},
            {t:'a<sub>'+n+'</sub> = '+VA+' + ('+n+' &minus; 1)'+VD+' = '+VA+' + '+(n-1)+VD, why:n+' me se ek kam.'}],
      say:'Ye rapid fire wala sawaal hai. Ek second me aana chahiye.'};
  }
  if(kind==='means'){
    const p=pick([3,7,10,15,20]);
    let vN=nz(-9,12); if(vN===p)vN=p+1;
    const v=fmt(F(vN));
    const right=VA+' + '+(p-1)+VD+' = '+v;
    const list=[
      {lb:right, ok:true},
      {lb:VA+' + '+p+VD+' = '+v, ok:false, why:p+'th term me '+(p-1)+' gaps hote hain.'},
      {lb:p+VA+' + '+VD+' = '+v, ok:false, why:VA+' ko multiply nahi karte.'},
      {lb:VA+' + '+(p-1)+VD+' = '+p, ok:false, why:'Value '+v+' hai, position '+p+'. Dono alag cheez hain.'}
    ];
    return {topic:'symb',kicker:'Matlab kya hai',lead:'"Is AP ka '+ord(p)+' term '+v+' hai" — ise mathematically kaise likhoge?',
      mode:'mcq',opts:opts4(list),ansLabel:'a + '+(p-1)+'d = '+v,
      work:[{t:p+'th term ko a<sub>'+p+'</sub> likhte hain', why:'nth term = a<sub>n</sub>.'},
            {t:'a<sub>'+p+'</sub> = '+VA+' + '+(p-1)+VD, why:'Formula.'},
            {t:'aur wo '+v+' hai &rarr; '+right, why:'"is" ka matlab equal to.'}],
      say:'"is" dikhe toh equal to lagao. Aadha question wahi khatam ho jata hai.'};
  }
  if(kind==='pth'){
    const list=[
      {lb:VA+' + (p &minus; 1)'+VD, ok:true},
      {lb:VA+' + p'+VD, ok:false, why:'Ek gap zyada.'},
      {lb:'p'+VA+' + '+VD, ok:false, why:VA+' multiply nahi hota.'},
      {lb:VA+' &minus; (p &minus; 1)'+VD, ok:false, why:VD+' add karte hain, subtract nahi karte.'}
    ];
    return {topic:'symb',kicker:'Formula',lead:'Kisi AP ka pth term kya hoga?',
      mode:'mcq',opts:opts4(list),ansLabel:'a + (p − 1)d',
      work:[{t:'a<sub>n</sub> = '+FORMULA, why:'n ki jagah jo bhi ho, wahi rakh do.'},
            {t:'a<sub>p</sub> = '+VA+' + (p &minus; 1)'+VD, why:'Bas n hata ke p likh diya.'}],
      say:'n ho ya p ho ya r — formula wahi rehta hai.'};
  }
  if(kind==='last'){
    const list=[
      {lb:'l = '+FORMULA, ok:true},
      {lb:'l = '+VA+' + '+VN+VD, ok:false, why:'Last term ka bhi wahi formula hai — '+VN+' &minus; 1.'},
      {lb:'l = '+VN+'/2 ['+'2'+VA+' + ('+VN+' &minus; 1)'+VD+']', ok:false, why:'Ye sum ka formula hai, last term ka nahi.'},
      {lb:'l = '+VA+' + '+VN+' + '+VD, ok:false, why:VD+' ko '+VN+' &minus; 1 se multiply karna hota hai.'}
    ];
    return {topic:'symb',kicker:'Formula',lead:'Last term ka formula kya hai?',
      mode:'mcq',opts:opts4(list),ansLabel:'l = a + (n − 1)d',
      work:[{t:'Last term bhi ek nth term hi hai', why:'Bas wo aakhri wala hai.'},
            {t:'l = a<sub>n</sub> = '+FORMULA, why:'Isliye alag formula yaad karne ki zarurat nahi.'}],
      say:'Last term ka aur nth term ka formula ek hi hai. Do cheez nahi hai.'};
  }
  if(kind==='end'){
    const list=[
      {lb:'l &minus; ('+VN+' &minus; 1)'+VD, ok:true},
      {lb:VA+' + ('+VN+' &minus; 1)'+VD, ok:false, why:'Ye shuru se hai. End se poochha hai.'},
      {lb:'l + ('+VN+' &minus; 1)'+VD, ok:false, why:'End se peeche aa rahe ho — subtract karna hai.'},
      {lb:'l &minus; '+VN+VD, ok:false, why:'Ek gap zyada le liya.'}
    ];
    return {topic:'symb',kicker:'Formula',lead:'End se nth term ka formula kya hai?',
      mode:'mcq',opts:opts4(list),ansLabel:'l − (n − 1)d',
      work:[{t:'End se ginoge toh shuruaat l se hogi', why:'Sidhi ulti utar rahe ho.'},
            {t:'End se nth term = l &minus; ('+VN+' &minus; 1)'+VD, why:'Gap wahi, sign ulta.'}],
      say:'Shuru se plus, end se minus. n − 1 dono jagah same.'};
  }
  const list=[
    {lb:VA+' + '+VD, ok:true},
    {lb:'2'+VA, ok:false, why:'Doosra term me '+VD+' add hota hai, '+VA+' double nahi hota.'},
    {lb:VA+VD, ok:false, why:'Multiply nahi, addition.'},
    {lb:VA+' + 2'+VD, ok:false, why:'Ye teesra term hai.'}
  ];
  return {topic:'symb',kicker:'Formula',lead:'Kisi bhi AP ka doosra term kya hoga?',
    mode:'mcq',opts:opts4(list),ansLabel:'a + d',
    work:[{t:'Pehla term = '+VA, why:''},
          {t:'Doosra = pehla + gap = '+VA+' + '+VD, why:'Har term me bas '+VD+' add hota hai.'}],
    say:'a, a+d, a+2d, a+3d — duniya ka koi bhi AP isi shakal me likha ja sakta hai.'};
}
