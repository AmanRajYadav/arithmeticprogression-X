/* ════════════════════════════════════════════════════════════════
   NCERT COVERAGE — the question shapes from the book itself.

   Scope stops at Exercise 5.2. Everything below maps to a numbered
   question or a worked example in Chapter 5:

     Ex 5.1 Q4  "write three more terms"        gNext
     Ex 5.2 Q1  fill in the a / d / n / aₙ table gTable
     Ex 5.2 Q3  missing terms in the boxes       gMissing
     Ex 5.2 Q7,8,9,16 + Example 5                gTwoTerms
     Ex 5.2 Q10, Q11                             gExceeds
     Ex 5.2 Q13, Q14 + Example 7                 gCountAP
     Ex 5.2 Q15                                  gEqualTerms
     Ex 5.2 Q12                                  gTwoAPsDiff

   Sum of n terms (Ex 5.3) is deliberately absent — it has not been
   taught yet.
   ════════════════════════════════════════════════════════════════ */

/* ── Ex 5.1 Q4 · "write three more terms" ──────────────────── */
function gNext(lvl){
  let a,d,style='auto';
  if(lvl===1){ a=F(nz(1,14)); d=F(nz(2,8)); }
  else if(lvl===2){ a=F(nz(-14,14)); d=F(nz(-9,9)); }
  else{
    if(rng()<0.5){ const dn=pick([2,3]); a=F(nz(-4,8)); d=F(nz(1,5),dn); style='frac'; }
    else{ a=F(rnd(-30,30),10); d=F(nz(-25,25),10); style='dec'; }
  }
  const shown=4, want=3;
  const right=[5,6,7].map(i=>fmt(term(a,d,i),style)).join(', ');
  const list=[
    {lb:right, ok:true},
    {lb:[5,6,7].map(i=>fmt(term(a,Fneg(d),i),style)).join(', '), ok:false,
     why:VD+' ka sign ulta laga diya. Wahi '+VD+' aage bhi add karna hai.'},
    {lb:[fmt(term(a,d,5),style),fmt(term(a,d,5),style),fmt(term(a,d,5),style)].join(', '), ok:false,
     why:'Ek hi baar '+VD+' add kiya. Har term me add karna hai.'},
    {lb:[6,7,8].map(i=>fmt(term(a,d,i),style)).join(', '), ok:false,
     why:'Ek term aage se shuru kar diya. Paanchve term se chalu karo.'},
    {lb:[3,2,1].map(i=>fmt(term(a,d,i),style)).join(', '), ok:false,
     why:'Ye peeche ke terms hain. Aage ke chahiye the.'}
  ];
  return {
    topic:'next', kicker:'Agle terms',
    lead:'Ye AP hai. Agle teen terms kya honge?',
    seq:seqStr(a,d,shown,style),
    mode:'mcq', opts:opts4(list), ansLabel:right, seqOpts:true,
    work:[
      {t:VD+' = a&#8322; &minus; a&#8321; = '+fmt(term(a,d,2),style)+' &minus; '+fmt(a,style)+' = '+fmt(d,style),
       why:'Pehle gap find karo.'},
      {t:'a&#8325; = '+fmt(term(a,d,shown),style)+' + '+fmt(d,style)+' = '+fmt(term(a,d,5),style), why:'Aakhri dikhe hue term me '+VD+' add karo.'},
      {t:'a&#8326; = '+fmt(term(a,d,5),style)+' + '+fmt(d,style)+' = '+fmt(term(a,d,6),style), why:''},
      {t:'a&#8327; = '+fmt(term(a,d,6),style)+' + '+fmt(d,style)+' = '+fmt(term(a,d,7),style), why:'Bas '+VD+' add karte jao.'}
    ],
    say:'NCERT me ye "write three more terms" wala hissa hai. AP pehchana, phir '+VD+' add karte jao.'
  };
}

/* ── Ex 5.2 Q1 · fill in the table ─────────────────────────── */
function gTable(lvl){
  let a,d,n,style='auto';
  if(lvl===1){ a=F(nz(2,15)); d=F(nz(2,8)); n=rnd(6,14); }
  else if(lvl===2){
    if(rng()<0.22){ a=F(nz(-20,20)); d=Fz; n=rnd(20,105); }   /* d = 0 is in the book */
    else{ a=F(nz(-20,20)); d=F(nz(-9,9)); n=rnd(8,20); }
  }else{
    if(rng()<0.5){ a=F(rnd(-250,250),10); d=F(nz(-40,40),10); n=rnd(6,14); style='dec'; }
    else{ a=F(nz(-18,18)); d=F(nz(-11,11)); n=rnd(15,40); }
  }
  const an=term(a,d,n);
  /* with d = 0 every n gives the same term, so n can never be the hole —
     and there is no d to recover either. NCERT's own d = 0 row asks for aₙ. */
  const kinds = Fis0(d) ? ['an','an','a'] : ['an','a','n','d'];
  const hide=pick(kinds);
  const show=k=>k===hide?'?':(
    k==='a'?fmt(a,style) : k==='d'?fmt(d,style) : k==='n'?String(n) : fmt(an,style));
  const strip=VA+' = '+show('a')+' &nbsp;·&nbsp; '+VD+' = '+show('d')+
              ' &nbsp;·&nbsp; '+VN+' = '+show('n')+' &nbsp;·&nbsp; a<sub>n</sub> = '+show('an');

  let ans, wrong, lead;
  if(hide==='an'){
    ans=an; lead='Table me a<sub>n</sub> missing hai. Wo kya hoga?';
    wrong=[
      {v:term(a,d,n+1), why:'Ye '+VA+' + '+VN+VD+' hai. '+VN+'th term me gaps '+(n-1)+' hote hain.'},
      {v:term(a,d,n-1), why:'Ek gap kam le liya.'},
      {v:Fscale(d,n), why:VA+' add karna bhool gaye.'},
      {v:Fadd(a,d), why:'Ye doosra term hai.'},
      {v:Fsub(a,Fscale(d,n-1)), why:VD+' subtract kar diya, add karna tha.'}
    ];
  }else if(hide==='a'){
    ans=Fsub(an,Fscale(d,n-1)); lead=VA+' missing hai. Pehla term kya hoga?';
    wrong=[
      {v:Fsub(an,Fscale(d,n)), why:'Ek gap zyada subtract kar diya.'},
      {v:Fsub(an,Fscale(d,n-2)), why:'Ek gap kam subtract kiya.'},
      {v:Fadd(an,Fscale(d,n-1)), why:'Peeche jaana tha — add nahi, subtract karo.'},
      {v:an, why:'Ye toh a<sub>n</sub> hi hai.'},
      {v:Fsub(an,d), why:'Sirf ek gap peeche gaye. '+(n-1)+' gaps peeche jaana tha.'}
    ];
  }else if(hide==='d'){
    ans=Fdiv(Fsub(an,a),F(n-1)); lead=VD+' missing hai. Common difference kya hoga?';
    wrong=[
      {v:Fdiv(Fsub(an,a),F(n)), why:VN+' se divide kar diya. Gaps '+(n-1)+' hote hain.'},
      {v:Fsub(an,a), why:'Divide karna bhool gaye — ye poora fasla hai, ek gap nahi.'},
      {v:Fdiv(Fsub(a,an),F(n-1)), why:'Sign ulta. a<sub>n</sub> me se '+VA+' subtract karo.'},
      {v:Fdiv(Fsub(an,a),F(n+1)), why:'Ek gap zyada gin liya.'}
    ];
  }else{
    ans=F(n); lead=VN+' missing hai. Kitne terms hain?';
    wrong=[
      {v:F(n-1), why:'Ye gaps ki ginti hai. Terms ek zyada hote hain — plus one karo.'},
      {v:F(n+1), why:'Ek term zyada gin liya.'},
      {v:F(n+2), why:'Do term zyada gin liye.'},
      {v:F(n-2), why:'Do term kam gin liye.'}
    ].filter(w=>w.v.n>0);
  }
  const aStyle = hide==='n' ? 'auto' : style;
  const canT = lvl>=2 && canType(ans,aStyle);
  return {
    topic:'table', kicker:'Table bharo',
    lead:lead,
    seq:strip, seqSmall:true,
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(ans,aStyle),ok:true}].concat(
      shuffle(wrong.filter(w=>!Feq(w.v,ans))).map(w=>({lb:fmt(w.v,aStyle),ok:false,why:w.why})))),
    ansLabel:fmt(ans,aStyle), ansTyped:typedForm(ans,aStyle),
    work:[
      {t:'a<sub>n</sub> = '+FORMULA, why:'Table ke charon column isi ek formula se jude hain.'},
      {t:fmt(an,style)+' = '+fmt(a,style)+' + ('+String(n)+' &minus; 1)('+fmt(d,style)+')',
       why:'Jo teen pata hain wo rakh do, chautha apne aap nikal aayega.'},
      {t:(hide==='an'?'a<sub>n</sub>':hide==='a'?VA:hide==='d'?VD:VN)+' = '+fmt(ans,aStyle), why:''}
    ],
    say:'Charon me se koi teen pata ho toh chautha nikal hi aayega. Ye NCERT ka pehla question hai.'
  };
}

/* ── Ex 5.2 Q3 · missing terms in the boxes ────────────────── */
function gMissing(lvl){
  const k=rnd(3,6);
  let p=1, q=k;
  if(rng()<0.45){ p=2; q=k; }
  else if(rng()<0.3){ p=1; q=k-1; }
  if(q-p<2){ p=1; q=k; }
  let a,d,style='auto';
  if(lvl===1){ a=F(nz(1,12)); d=F(nz(2,7)); }
  else if(lvl===2){ a=F(nz(-14,14)); d=F(nz(-8,8)); }
  else{ const dn=pick([2,2,4]); a=F(nz(-6,10)); d=F(nz(-9,9),dn); style='frac'; }

  const hidden=[];
  for(let i=1;i<=k;i++)if(i!==p&&i!==q)hidden.push(i);
  const ask=pick(hidden);
  const cells=[];
  for(let i=1;i<=k;i++){
    if(i===p||i===q)cells.push(fmt(term(a,d,i),style));
    else cells.push('<span class="blank'+(i===ask?' ask':'')+'">'+(i===ask?'?':'&#9633;')+'</span>');
  }
  const ans=term(a,d,ask);
  const wrong=[
    {v:term(a,d,ask+1), why:'Ek box aage nikal gaye.'},
    {v:term(a,d,ask-1), why:'Ek box peeche reh gaye.'},
    {v:Fdiv(Fadd(term(a,d,p),term(a,d,q)),F(2)), why:'Dono dikhne wale terms ka average le liya. Wo tabhi chalega jab box bilkul beech me ho.'},
    {v:Fadd(term(a,d,p),d), why:'Pehle dikhne wale term me sirf ek '+VD+' add kiya.'},
    {v:Fsub(term(a,d,ask),Fscale(d,2)), why:'Do gap peeche reh gaye.'}
  ];
  const canT = lvl<=2 && canType(ans,style);
  const gaps=q-p;
  return {
    topic:'missing', kicker:'Missing terms',
    lead:'Is AP me <b>?</b> wale box me kya aayega?',
    seq:cells.join(', '),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(ans,style),ok:true}].concat(
      shuffle(wrong.filter(w=>!Feq(w.v,ans))).map(w=>({lb:fmt(w.v,style),ok:false,why:w.why})))),
    ansLabel:fmt(ans,style), ansTyped:typedForm(ans,style),
    work:[
      {t:'Do term pata hain: a<sub>'+p+'</sub> = '+fmt(term(a,d,p),style)+' aur a<sub>'+q+'</sub> = '+fmt(term(a,d,q),style),
       why:'Do term pata ho toh poora AP pata hai.'},
      {t:'Unke beech '+gaps+' gap hain &rarr; '+gaps+VD+' = '+fmt(term(a,d,q),style)+' &minus; '+fmt(term(a,d,p),style)+' = '+fmt(Fscale(d,gaps),style),
       why:'a<sub>'+q+'</sub> &minus; a<sub>'+p+'</sub> me '+gaps+' gaps hote hain, '+q+' nahi.'},
      {t:VD+' = '+fmt(d,style), why:''},
      {t:'a<sub>'+ask+'</sub> = a<sub>'+p+'</sub> '+(ask>p?'+':'&minus;')+' '+Math.abs(ask-p)+VD+
         ' = '+fmt(term(a,d,p),style)+' '+(ask>p?'+':'&minus;')+' '+Math.abs(ask-p)+'('+fmt(d,style)+') = '+fmt(ans,style),
       why:ask>p?('Ab box tak '+VD+' add karte jao.')
                :('Box peeche hai, isliye '+VD+' subtract karte jao.')}
    ],
    say:'Do box bhi pata ho toh poora AP khul jaata hai. Bas gaps theek se gino.'
  };
}

/* ── Ex 5.2 Q7, Q8, Q9, Q16 + Example 5 · two terms given ──── */
function gTwoTerms(lvl){
  const kind = lvl===1 ? 'term' : pick(['term','term','zero','ap','dee']);
  let a=nz(-14,16), d=nz(2,7);
  if(rng()<0.4)d=-d;
  let p=pick([3,4,5,11]), q=p+pick([2,4,5,6]);
  if(kind==='zero'){
    /* choose a and d so that some term really is zero */
    d=nz(2,6)*(rng()<0.5?1:-1);
    const z=rnd(5,20);
    a=-d*(z-1);
    p=pick([2,3,4]); q=p+pick([3,5,6]);
  }
  const ap=a+(p-1)*d, aq=a+(q-1)*d;
  const given=ord(p)+' term '+fmt(F(ap))+' hai aur '+ord(q)+' term '+fmt(F(aq))+' hai.';

  if(kind==='dee'){
    const list=[
      {lb:fmt(F(d)), ok:true},
      {lb:fmt(F(-d)), ok:false, why:'Sign ulta. Baad wale term me se pehle wala subtract karo.'},
      {lb:fmt(F((aq-ap)/(q-p)*2)), ok:false, why:'Gaps aadhe gin liye.'},
      {lb:fmt(F(aq-ap)), ok:false, why:'Divide karna bhool gaye. Ye '+(q-p)+' gaps ek saath hain.'},
      {lb:fmt(F(a)), ok:false, why:'Ye pehla term hai, '+VD+' nahi.'},
      {lb:fmt(F(ap)), ok:false, why:'Ye '+ord(p)+' term hai, gap nahi.'},
      {lb:String(q-p), ok:false, why:'Ye gaps ki ginti hai, '+VD+' nahi.'}
    ];
    return {
      topic:'twoterm', kicker:'Do term diye hain',
      lead:'Ek AP ka '+given+' Common difference kya hai?',
      mode:'mcq', opts:opts4(list), ansLabel:fmt(F(d)),
      work:[
        {t:'a<sub>'+p+'</sub> = '+VA+' + '+(p-1)+VD+' = '+fmt(F(ap))+'&nbsp; &nbsp;(i)', why:''},
        {t:'a<sub>'+q+'</sub> = '+VA+' + '+(q-1)+VD+' = '+fmt(F(aq))+'&nbsp; &nbsp;(ii)', why:''},
        {t:'(ii) &minus; (i): '+(q-p)+VD+' = '+fmt(F(aq-ap))+' &rarr; '+VD+' = '+fmt(F(d)),
         why:VA+' apne aap cancel ho jaata hai — isliye do term milte hi '+VD+' mil jaata hai.'}
      ],
      say:'Do term diye hain toh subtract kar do — '+VA+' cancel, '+VD+' haath me.'
    };
  }

  if(kind==='zero'){
    const zpos=Math.round((0-a)/d)+1;
    const list=[
      {lb:String(zpos), ok:true},
      {lb:String(zpos-1), ok:false, why:'Plus one karna bhool gaye. '+VN+' &minus; 1 = '+(zpos-1)+' aaya tha.'},
      {lb:String(zpos+1), ok:false, why:'Ek term aage nikal gaye.'},
      {lb:'0', ok:false, why:'0 term ki value hai, position nahi. Position poochhi gayi hai.'},
      {lb:String(zpos+2), ok:false, why:'Do term aage nikal gaye.'},
      {lb:String(p), ok:false, why:'Ye toh wahi position hai jo question me di gayi thi.'},
      {lb:String(zpos-2), ok:false, why:'Do term peeche reh gaye.'}
    ].filter(o=>o.ok||o.lb!==String(zpos));
    return {
      topic:'twoterm', kicker:'Kaunsa term zero',
      lead:'Ek AP ka '+given+' Is AP ka kaunsa term zero hai?',
      mode:'mcq', opts:opts4(list), ansLabel:zpos+'th term',
      work:[
        {t:'(ii) &minus; (i): '+(q-p)+VD+' = '+fmt(F(aq-ap))+' &rarr; '+VD+' = '+fmt(F(d)), why:VA+' cancel ho gaya.'},
        {t:VD+' ko (i) me daalo &rarr; '+VA+' = '+fmt(F(a)), why:''},
        {t:'a<sub>n</sub> = 0 &rarr; '+fmt(F(a))+' + ('+VN+' &minus; 1)('+fmt(F(d))+') = 0', why:'"Kaunsa term zero hai" matlab a<sub>n</sub> = 0 rakh do.'},
        {t:VN+' &minus; 1 = '+(zpos-1)+' &rarr; '+VN+' = '+zpos, why:'Answer "'+zpos+'th term" likhna — sirf '+zpos+' nahi.'}
      ],
      say:'Position poochhi hai toh answer me "th term" lagana. Wo value nahi hai.'
    };
  }

  if(kind==='ap'){
    const right=[a,a+d,a+2*d].map(x=>fmt(F(x))).join(', ');
    const list=[
      {lb:right, ok:true},
      {lb:[a,a-d,a-2*d].map(x=>fmt(F(x))).join(', '), ok:false, why:VD+' ka sign ulta lag gaya.'},
      {lb:[a+d,a+2*d,a+3*d].map(x=>fmt(F(x))).join(', '), ok:false, why:'Pehla term chhod diya — ye doosre se shuru ho raha hai.'},
      {lb:[d,a,a+d].map(x=>fmt(F(x))).join(', '), ok:false, why:VA+' aur '+VD+' aapas me badal gaye.'},
      {lb:[a,a+2*d,a+4*d].map(x=>fmt(F(x))).join(', '), ok:false, why:'Har baar do gap chhod diye.'},
      {lb:[ap,ap+d,ap+2*d].map(x=>fmt(F(x))).join(', '), ok:false,
       why:'Ye '+ord(p)+' term se shuru ho raha hai. Pehle teen terms chahiye the.'},
      {lb:[a,a+d,a+2*d].map(x=>fmt(F(x))).reverse().join(', '), ok:false, why:'Ulta likh diya.'}
    ];
    return {
      topic:'twoterm', kicker:'Poora AP find karo',
      lead:'Ek AP ka '+given+' Pehle teen terms kya honge?',
      mode:'mcq', opts:opts4(list), ansLabel:right, seqOpts:true,
      work:[
        {t:VA+' + '+(p-1)+VD+' = '+fmt(F(ap))+'&nbsp; &nbsp;(i)', why:''},
        {t:VA+' + '+(q-1)+VD+' = '+fmt(F(aq))+'&nbsp; &nbsp;(ii)', why:''},
        {t:'(ii) &minus; (i): '+(q-p)+VD+' = '+fmt(F(aq-ap))+' &rarr; '+VD+' = '+fmt(F(d)), why:'Yahi linear equations wala elimination hai.'},
        {t:'(i) me daalo &rarr; '+VA+' = '+fmt(F(a)), why:''},
        {t:'Hence the AP is '+right+', &hellip;', why:VA+', '+VA+' + '+VD+', '+VA+' + 2'+VD}
      ],
      say:'Do baatein di hain toh do equations. Aage ka kaam linear equations wala hi hai.'
    };
  }

  /* find some other term */
  let r=pick([q+pick([4,7,10,15]), 29, 31]);
  if(r===p||r===q)r=q+5;
  const ans=F(a+(r-1)*d);
  const wrong=[
    {v:F(a+r*d), why:ord(r)+' term me gaps '+(r-1)+' hote hain, '+r+' nahi.'},
    {v:F(a+(r-2)*d), why:'Ek gap kam le liya.'},
    {v:F(ap+aq), why:'Dono diye hue terms add kar diye — formula lagana tha.'},
    {v:F(a), why:'Ye pehla term hai.'},
    {v:F(r*d), why:VA+' add karna bhool gaye.'},
    {v:F(a+(r+1)*d), why:'Do gap zyada le liye.'},
    {v:F(aq), why:'Ye '+ord(q)+' term hai, '+ord(r)+' nahi.'}
  ];
  const canT = lvl>=2;
  return {
    topic:'twoterm', kicker:'Do term diye hain',
    lead:'Ek AP ka '+given+' Iska '+ord(r)+' term kya hoga?',
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(ans),ok:true}].concat(
      shuffle(wrong.filter(w=>!Feq(w.v,ans))).map(w=>({lb:fmt(w.v),ok:false,why:w.why})))),
    ansLabel:fmt(ans), ansTyped:typedForm(ans),
    work:[
      {t:VA+' + '+(p-1)+VD+' = '+fmt(F(ap))+'&nbsp; &nbsp;(i)', why:'Pehli baat ko equation banao.'},
      {t:VA+' + '+(q-1)+VD+' = '+fmt(F(aq))+'&nbsp; &nbsp;(ii)', why:'Doosri baat se doosri equation.'},
      {t:'(ii) &minus; (i): '+(q-p)+VD+' = '+fmt(F(aq-ap))+' &rarr; '+VD+' = '+fmt(F(d)), why:VA+' cancel ho gaya.'},
      {t:'(i) me daalo &rarr; '+VA+' = '+fmt(F(a)), why:''},
      {t:'a<sub>'+r+'</sub> = '+fmt(F(a))+' + '+(r-1)+'('+fmt(F(d))+') = '+fmt(ans), why:'Ab wahi purana formula.'}
    ],
    say:VA+' aur '+VD+' mil gaye toh AP ka koi bhi term nikal sakta hai.'
  };
}

/* ── Ex 5.2 Q10, Q11 · "exceeds by" ────────────────────────── */
function gExceeds(lvl){
  const kind=pick(['findd','findn']);
  if(kind==='findd'){
    const q=pick([8,10,12,14]), p=q+pick([5,7,6,4]);
    const d=nz(1,7);
    const by=(p-q)*d;
    const list=[
      {lb:fmt(F(d)), ok:true},
      {lb:fmt(F(by)), ok:false, why:'Ye poora fasla hai. Usme '+(p-q)+' gaps hain — divide karna hai.'},
      {lb:fmt(F(-d)), ok:false, why:'Sign ulta. Bada term chhote se '+by+' zyada hai, toh '+VD+' positive hai.'},
      {lb:fmt(F(d*2)), ok:false, why:'Gaps aadhe gin liye.'},
      {lb:String(p-q), ok:false, why:'Ye gaps ki ginti hai, '+VD+' nahi.'}
    ].filter(o=>o&&o.lb);
    return {
      topic:'exceeds', kicker:'Exceeds by',
      lead:'Ek AP ka '+ord(p)+' term apne '+ord(q)+' term se '+by+' zyada hai. Common difference kya hai?',
      mode:'mcq', opts:opts4(list), ansLabel:fmt(F(d)),
      work:[
        {t:'a<sub>'+p+'</sub> &minus; a<sub>'+q+'</sub> = '+by, why:'"Exceeds by" matlab minus karke '+by+' aata hai.'},
        {t:'('+VA+' + '+(p-1)+VD+') &minus; ('+VA+' + '+(q-1)+VD+') = '+by, why:'Dono ko formula me likho.'},
        {t:VA+' cancel &rarr; '+(p-q)+VD+' = '+by, why:'Sirf gaps ka fark bacha.'},
        {t:VD+' = '+by+' &divide; '+(p-q)+' = '+fmt(F(d)), why:''}
      ],
      say:'"Exceeds by" dikhe toh subtract karo. '+VA+' hamesha cancel ho jaata hai.'
    };
  }
  const a=nz(1,9), d=pick([3,4,6,12,5]);
  const base=pick([54,40,30,25]);
  const steps=rnd(4,14);
  const more=steps*d;
  const n=base+steps;
  const wrong=[
    {v:steps, why:'Ye kitne term aage jaana hai, wo hai. Us par '+base+' add karna baaki hai.'},
    {v:n-1, why:'Ek term peeche reh gaye.'},
    {v:n+1, why:'Ek term aage nikal gaye.'},
    {v:more, why:'Ye value ka fark hai, position nahi.'},
    {v:base, why:'Ye toh wahi term hai jisse compare kar rahe hain.'}
  ];
  return {
    topic:'exceeds', kicker:'Kaunsa term',
    lead:'AP: '+seqStr(F(a),F(d),4,'auto')+' — iska kaunsa term apne '+ord(base)+' term se '+more+' zyada hoga?',
    mode:lvl>=2?'type':'mcq',
    opts:lvl>=2?null:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==n&&w.v>0)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(n), ansTyped:String(n),
    work:[
      {t:'a<sub>n</sub> &minus; a<sub>'+base+'</sub> = '+more, why:'"'+more+' more than" matlab yahi.'},
      {t:'('+VN+' &minus; '+base+')'+VD+' = '+more, why:VA+' cancel ho gaya, sirf gaps ka fark bacha.'},
      {t:VN+' &minus; '+base+' = '+more+' &divide; '+d+' = '+steps, why:VD+' = '+d+' hai.'},
      {t:VN+' = '+base+' + '+steps+' = '+n, why:'Position wapas add karna mat bhoolna.'}
    ],
    say:'Do terms ka fark hamesha gaps ka fark hota hai. '+VA+' ka koi role hi nahi.'
  };
}

/* ── Ex 5.2 Q13, Q14 + Example 7 · counting ────────────────── */
function gCountAP(lvl){
  const kind=pick(['digits','between']);
  if(kind==='digits'){
    const digits=pick([2,3]);
    const k=pick(digits===2?[3,4,6,7]:[4,6,7,8,9]);
    const lo=digits===2?10:100, hi=digits===2?99:999;
    const first=Math.ceil(lo/k)*k, last=Math.floor(hi/k)*k;
    const n=(last-first)/k+1;
    const name=digits===2?'two-digit':'three-digit';
    const wrong=[
      {v:n-1, why:'Plus one karna bhool gaye. Gaps '+(n-1)+' hain, numbers '+n+'.'},
      {v:n+1, why:'Ek number zyada gin liya.'},
      {v:Math.floor(hi/k), why:'1 se '+hi+' tak ke saare multiples gin liye. Sirf '+name+' chahiye the.'},
      {v:last, why:'Ye aakhri number hai, ginti nahi.'}
    ];
    return {
      topic:'countap', kicker:'Kitne numbers',
      lead:'Kitne '+name+' numbers '+k+' se divisible hain?',
      mode:lvl>=2?'type':'mcq',
      opts:lvl>=2?null:opts4([{lb:String(n),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==n&&w.v>0)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
      ansLabel:String(n), ansTyped:String(n),
      work:[
        {t:'Pehla '+name+' number jo '+k+' se divisible hai: '+first, why:name+' matlab '+lo+' se '+hi+' tak.'},
        {t:'Aakhri: '+last, why:''},
        {t:'AP: '+first+', '+(first+k)+', '+(first+2*k)+', &hellip;, '+last+'&nbsp; &rarr; '+VA+' = '+first+', '+VD+' = '+k,
         why:'Multiples hamesha AP hote hain — gap wahi divisor hota hai.'},
        {t:last+' = '+first+' + ('+VN+' &minus; 1)'+k+' &rarr; '+VN+' = '+n, why:'Wahi last term ka formula.'}
      ],
      say:'Multiples ki list hamesha ek AP hai. Pehla aur aakhri find karo, phir '+VN+' nikal lo.'
    };
  }
  const k=pick([4,5,6,7,8,9]);
  const lo=pick([10,20,25,50]), hi=pick([200,250,300,400]);
  const first=Math.floor(lo/k)*k+k, last=Math.ceil(hi/k)*k-k;
  const n=(last-first)/k+1;
  const wrong=[
    {v:n-1, why:'Plus one karna bhool gaye.'},
    {v:n+1, why:'Ek multiple zyada gin liya — '+lo+' aur '+hi+' khud shaamil nahi hain.'},
    {v:Math.floor(hi/k), why:'1 se '+hi+' tak ke saare multiples gin liye.'},
    {v:n+2, why:'Dono end ke multiples bhi gin liye.'}
  ];
  return {
    topic:'countap', kicker:'Kitne multiples',
    lead:''+lo+' aur '+hi+' ke beech '+k+' ke kitne multiples hain?',
    mode:lvl>=2?'type':'mcq',
    opts:lvl>=2?null:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==n&&w.v>0)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(n), ansTyped:String(n),
    work:[
      {t:''+lo+' ke baad '+k+' ka pehla multiple: '+first, why:'"Beech me" matlab '+lo+' aur '+hi+' khud shaamil nahi.'},
      {t:''+hi+' se pehle aakhri multiple: '+last, why:''},
      {t:'AP: '+first+', '+(first+k)+', &hellip;, '+last+'&nbsp; &rarr; '+VA+' = '+first+', '+VD+' = '+k, why:''},
      {t:last+' = '+first+' + ('+VN+' &minus; 1)'+k+' &rarr; '+VN+' = '+n, why:''}
    ],
    say:'"Between" ka matlab dono ends chhod do. Yahin par ek marks jaata hai.'
  };
}

/* ── Ex 5.2 Q15 · two APs with an equal term ───────────────── */
function gEqualTerms(lvl){
  const d1=nz(2,8);
  let d2=nz(2,9); if(d2===d1)d2=d1+3;
  const n=rnd(6,25);
  /* a1 + (n−1)d1 = a2 + (n−1)d2  →  pick a2 freely, derive a1 */
  const a2=nz(1,12);
  const a1=a2+(n-1)*(d2-d1);
  const wrong=[
    {v:n-1, why:'Plus one karna bhool gaye. '+VN+' &minus; 1 = '+(n-1)+' aaya tha.'},
    {v:n+1, why:'Ek term aage nikal gaye.'},
    {v:a1+(n-1)*d1, why:'Ye term ki value hai, position nahi.'},
    {v:Math.abs(a1-a2), why:'Ye pehle terms ka fark hai, position nahi.'}
  ];
  const A1=fmt(F(a1)), A2=fmt(F(a2)), D1=fmt(F(d1)), D2=fmt(F(d2)), GAP=fmt(F(a1-a2));
  return {
    topic:'equalterm', kicker:'Do APs',
    lead:'Do APs hain: '+seqStr(F(a1),F(d1),3,'auto')+' aur '+seqStr(F(a2),F(d2),3,'auto')+
         ' — kis '+VN+' par dono ke '+VN+'th term equal honge?',
    seqSmall:true,
    mode:lvl>=2?'type':'mcq',
    opts:lvl>=2?null:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==n&&w.v>0)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
    ansLabel:String(n), ansTyped:String(n),
    work:[
      {t:'Pehla AP: '+VA+' = '+A1+', '+VD+' = '+D1+'&nbsp; &nbsp;Doosra AP: '+VA+' = '+A2+', '+VD+' = '+D2,
       why:'Dono ka '+VA+' aur '+VD+' alag alag likh lo.'},
      {t:A1+' + ('+VN+' &minus; 1)'+D1+' = '+A2+' + ('+VN+' &minus; 1)'+D2, why:'"Equal" matlab dono ko equal rakh do.'},
      {t:'('+VN+' &minus; 1)('+D2+' &minus; '+D1+') = '+A1+' &minus; '+A2+' = '+GAP, why:VN+' wale terms ek taraf, numbers doosri taraf.'},
      {t:VN+' &minus; 1 = '+(n-1)+' &rarr; '+VN+' = '+n, why:'Plus one — hamesha.'}
    ],
    say:'Do APs ke terms equal karne hain toh dono formule ko = laga do. Bas.'
  };
}

/* ── Ex 5.2 Q12 · two APs with the same common difference ──── */
function gTwoAPsDiff(lvl){
  const p=pick([50,99,100,75]), q=pick([500,999,1000,750]);
  const diff=pick([p, p+10, 60, 120]);
  const list=[
    {lb:String(diff), ok:true},
    {lb:String(diff*q/p|0), ok:false, why:'Position ke hisaab se badha diya. '+VD+' dono me same hai, isliye fark badalta hi nahi.'},
    {lb:String(q), ok:false, why:'Position ko answer bana diya.'},
    {lb:'0', ok:false, why:'Fark zero tabhi hota jab dono APs ek hi hote.'},
    {lb:String(diff*2), ok:false, why:'Double kar diya — lekin fark har position par wahi rehta hai.'}
  ];
  return {
    topic:'twoap', kicker:'Do APs, same d',
    lead:'Do APs ka common difference same hai. Unke '+ord(p)+' terms ka fark '+diff+' hai. '+ord(q)+' terms ka fark kya hoga?',
    mode:'mcq', opts:opts4(list), ansLabel:String(diff),
    work:[
      {t:'Pehle AP ka '+ord(p)+' term = '+VA+' + '+(p-1)+VD, why:''},
      {t:'Doosre AP ka '+ord(p)+' term = A + '+(p-1)+VD, why:VD+' dono ka same hai, isliye same '+VD+'.'},
      {t:'Fark = ('+VA+' + '+(p-1)+VD+') &minus; (A + '+(p-1)+VD+') = '+VA+' &minus; A = '+diff,
       why:(p-1)+VD+' cancel ho gaya.'},
      {t:''+ord(q)+' terms ka fark = ('+VA+' + '+(q-1)+VD+') &minus; (A + '+(q-1)+VD+') = '+VA+' &minus; A = '+diff,
       why:'Wahi cancel. Isliye fark har position par same rehta hai.'}
    ],
    say:VD+' same hai toh fark kabhi badalta hi nahi. Question hard nahi, samajhne ki baat hai.'
  };
}
