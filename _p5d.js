/* ════════════════════════════════════════════════════════════════
   SUM OF n TERMS — Exercise 5.3.

     Sₙ = n/2 [2a + (n − 1)d]        when a and d are known
     Sₙ = n/2 (a + l)                when the last term is known
     aₙ = Sₙ − Sₙ₋₁                  to get back from a sum to a term

   Mapping to the book:
     Ex 5.3 Q1              gSumN
     Ex 5.3 Q2              gSumTo
     Ex 5.3 Q3 (all ten)    gSumTable
     Ex 5.3 Q4, Q5, Q6      gSumHowMany
     Ex 5.3 Q7, Q8, Q9      gSumFromTerms
     Ex 5.3 Q10, Q11        gSumFormula
     Ex 5.3 Q12, Q13, Q14   gSumMultiples
     Ex 5.3 Q15–Q20         gSumApply
   ════════════════════════════════════════════════════════════════ */

const VS='<i class="vs">S</i>';
const SUMFORM=VS+'<sub>n</sub> = '+VN+'/2 [2'+VA+' + ('+VN+' &minus; 1)'+VD+']';
const SUMFORM_L=VS+'<sub>n</sub> = '+VN+'/2 ('+VA+' + l)';

/* Sₙ, exactly — no floats anywhere near it */
function sumN(a,d,n){
  return Fdiv(Fscale(Fadd(Fscale(a,2), Fscale(d,n-1)), n), F(2));
}

/* ── Ex 5.3 Q1 · sum of the first n terms ──────────────────── */
function gSumN(lvl){
  let a,d,style='auto',n;
  if(lvl===1){ a=F(nz(1,12)); d=F(nz(2,8)); n=rnd(8,15); }
  else if(lvl===2){ a=F(nz(-40,30)); d=F(nz(-9,9)); n=rnd(10,25); }
  else{
    n=pick([11,12,20,50,100]);
    if(rng()<0.4){ a=F(rnd(-30,30),10); d=F(nz(-25,25),10); style='dec'; }
    else{ a=F(nz(-25,25)); d=F(nz(-12,12)); n=rnd(12,40); }
  }
  const S=sumN(a,d,n);
  const wrong=[
    {v:sumN(a,d,n+1), why:'Ek term zyada add kar liya. '+VS+'<sub>'+n+'</sub> me sirf '+n+' terms hote hain.'},
    {v:sumN(a,d,n-1), why:'Ek term chhoot gaya.'},
    {v:term(a,d,n), why:'Ye '+n+'th term hai, sum nahi. Sum matlab saare terms add karo.'},
    {v:Fdiv(Fscale(Fadd(Fscale(a,2), Fscale(d,n)), n), F(2)), why:'('+VN+' &minus; 1) ki jagah '+VN+' rakh diya. Gaps ek kam hote hain.'},
    {v:Fscale(Fadd(Fscale(a,2), Fscale(d,n-1)), n), why:'2 se divide karna bhool gaye.'}
  ];
  const canT = lvl>=2 && canType(S,style);
  return {
    topic:'sumn', kicker:'Sum of n terms',
    lead:'Is AP ke pehle '+n+' terms ka sum kya hoga?',
    seq:seqStr(a,d,4,style),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(S,style),ok:true}].concat(
      shuffle(wrong.filter(w=>!Feq(w.v,S))).map(w=>({lb:fmt(w.v,style),ok:false,why:w.why})))),
    ansLabel:fmt(S,style), ansTyped:typedForm(S,style),
    work:[
      {t:VA+' = '+fmt(a,style)+',&nbsp; '+VD+' = '+fmt(d,style)+',&nbsp; '+VN+' = '+n, why:'Jo diya hai wo pehle likho.'},
      {t:SUMFORM, why:'Sum ka formula — nth term wale se alag hai.'},
      {t:VS+'<sub>'+n+'</sub> = '+n+'/2 [2('+fmt(a,style)+') + '+(n-1)+'('+fmt(d,style)+')]', why:'Value daal do.'},
      {t:'= '+n+'/2 ['+fmt(Fadd(Fscale(a,2),Fscale(d,n-1)),style)+'] = '+fmt(S,style), why:'Bracket pehle solve karo, phir '+n+'/2 se multiply.'}
    ],
    say:'Term aur sum alag cheez hai. a<sub>n</sub> ek number deta hai, '+VS+'<sub>n</sub> saare add karke deta hai.'
  };
}

/* ── Ex 5.3 Q2 · sum when the last term is given ───────────── */
function gSumTo(lvl){
  let a,d,style='auto';
  if(lvl===1){ a=F(nz(2,12)); d=F(nz(2,7)); }
  else if(lvl===2){ a=F(nz(-30,20)); d=F(nz(2,9)); if(rng()<0.4)d=Fneg(d); }
  else{ a=F(nz(-20,20)); d=F(pick([3,-3,5,-5,7,-7,11,-11])); }
  const n=rnd(8,30);
  const l=term(a,d,n);
  const S=sumN(a,d,n);
  const wrong=[
    {v:Fdiv(Fscale(Fadd(a,l),n-1),F(2)), why:VN+' ki jagah '+VN+' &minus; 1 rakh diya. Yahan poore '+n+' terms add ho rahe hain.'},
    {v:Fdiv(Fadd(a,l),F(2)), why:VN+'/2 se multiply karna bhool gaye — ye sirf average hai.'},
    {v:Fscale(Fadd(a,l),n), why:'2 se divide karna bhool gaye.'},
    {v:F(n), why:'Ye number of terms hai, sum nahi.'},
    {v:sumN(a,d,n+1), why:'Ek term zyada add kar liya.'}
  ];
  const canT = lvl>=2 && canType(S,style);
  return {
    topic:'sumto', kicker:'Sum, last term diya hai',
    lead:'Is poori series ka sum kya hoga?',
    seq:seqStr(a,d,3,style,{dots:true,last:fmt(l,style)}),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:fmt(S,style),ok:true}].concat(
      shuffle(wrong.filter(w=>!Feq(w.v,S))).map(w=>({lb:fmt(w.v,style),ok:false,why:w.why})))),
    ansLabel:fmt(S,style), ansTyped:typedForm(S,style),
    work:[
      {t:VA+' = '+fmt(a,style)+',&nbsp; '+VD+' = '+fmt(d,style)+',&nbsp; l = '+fmt(l,style), why:'Last term diya hua hai, toh pehle '+VN+' find karo.'},
      {t:'l = '+FORMULA+' &rarr; '+fmt(l,style)+' = '+fmt(a,style)+' + ('+VN+' &minus; 1)('+fmt(d,style)+') &rarr; '+VN+' = '+n,
       why:'Bina '+VN+' ke sum nahi nikal sakta.'},
      {t:SUMFORM_L, why:'Jab '+VA+' aur l dono pata hon toh ye chhota formula chalta hai.'},
      {t:VS+'<sub>'+n+'</sub> = '+n+'/2 ('+fmt(a,style)+' + '+fmt(l,style)+') = '+fmt(S,style), why:''}
    ],
    say:'Last term diya ho toh '+VN+'/2 ('+'a + l) sabse chhota rasta hai. Lekin '+VN+' pehle find karna padega.'
  };
}

/* ── Ex 5.3 Q3 · the a / d / n / aₙ / Sₙ table ─────────────── */
function gSumTable(lvl){
  const kind=pick(['findS','findD','findA','findN']);
  let a=nz(2,12), d=nz(2,8), n=rnd(8,16);
  if(lvl>=2&&rng()<0.45)d=-d;
  if(lvl>=2&&rng()<0.35)a=nz(-20,-1);
  const an=a+(n-1)*d, S=(n*(2*a+(n-1)*d))/2;
  if(!Number.isInteger(S))return gSumN(lvl);              /* keep the table tidy */

  if(kind==='findS'){
    const wrong=[
      {v:(n*(2*a+n*d))/2, why:'('+VN+' &minus; 1) ki jagah '+VN+' rakh diya.'},
      {v:an, why:'Ye '+n+'th term hai, sum nahi.'},
      {v:((n+1)*(2*a+n*d))/2, why:'Ek term zyada add kar liya.'},
      {v:n*(2*a+(n-1)*d), why:'2 se divide karna bhool gaye.'},
      {v:a+an, why:'Sirf pehla aur aakhri add kiya. Beech ke sab terms reh gaye.'},
      {v:n*a, why:'Saare terms ko '+VA+' maan liya.'},
      {v:S-an, why:'Aakhri term ko chhod diya.'}
    ].filter(w=>Number.isInteger(w.v));
    const canT=lvl>=2;
    return {
      topic:'sumtable', kicker:'Table bharo',
      lead:VS+'<sub>n</sub> missing hai. Wo kya hoga?',
      seq:VA+' = '+fmt(F(a))+' &nbsp;·&nbsp; '+VD+' = '+fmt(F(d))+' &nbsp;·&nbsp; '+VN+' = '+n+
          ' &nbsp;·&nbsp; a<sub>n</sub> = '+fmt(F(an))+' &nbsp;·&nbsp; '+VS+'<sub>n</sub> = ?',
      seqSmall:true,
      mode:canT?'type':'mcq',
      opts:canT?null:opts4([{lb:fmt(F(S)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==S)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(S)), ansTyped:typedForm(F(S)),
      work:[
        {t:SUMFORM_L, why:VA+' aur a<sub>n</sub> dono diye hain — chhota formula lagao.'},
        {t:VS+'<sub>'+n+'</sub> = '+n+'/2 ('+fmt(F(a))+' + '+fmt(F(an))+') = '+fmt(F(S)), why:''}
      ],
      say:'Jab '+VA+' aur a<sub>n</sub> dono pata hon, '+VN+'/2 (a + a<sub>n</sub>) sabse tez hai.'
    };
  }

  if(kind==='findD'){
    const wrong=[
      {v:-d, why:'Sign ulta aa gaya.'},
      {v:(an-a)/n, why:VN+' se divide kar diya. Gaps '+(n-1)+' hote hain.'},
      {v:an-a, why:'Divide karna bhool gaye — ye poora fasla hai.'},
      {v:a, why:'Ye pehla term hai.'},
      {v:2*d, why:'Do gap ek saath gin liye.'},
      {v:n, why:'Ye number of terms hai, gap nahi.'},
      {v:an, why:'Ye aakhri term hai.'}
    ].filter(w=>Number.isInteger(w.v));
    return {
      topic:'sumtable', kicker:'Table bharo',
      lead:VD+' missing hai. Common difference kya hoga?',
      seq:VA+' = '+fmt(F(a))+' &nbsp;·&nbsp; '+VD+' = ? &nbsp;·&nbsp; '+VN+' = '+n+
          ' &nbsp;·&nbsp; a<sub>n</sub> = '+fmt(F(an))+' &nbsp;·&nbsp; '+VS+'<sub>n</sub> = '+fmt(F(S)),
      seqSmall:true,
      mode:'mcq',
      opts:opts4([{lb:fmt(F(d)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==d)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(d)),
      work:[
        {t:'a<sub>n</sub> = '+FORMULA+' &rarr; '+fmt(F(an))+' = '+fmt(F(a))+' + '+(n-1)+VD, why:'Sum ki zarurat hi nahi — a<sub>n</sub> se seedha nikal jaayega.'},
        {t:(n-1)+VD+' = '+fmt(F(an-a))+' &rarr; '+VD+' = '+fmt(F(d)), why:(n-1)+' se divide karo, '+n+' se nahi.'}
      ],
      say:'Table me sab kuch diya hota hai — dekho kaunsa rasta sabse chhota hai.'
    };
  }

  if(kind==='findA'){
    const wrong=[
      {v:an, why:'Ye aakhri term hai, pehla nahi.'},
      {v:an-n*d, why:'Ek gap zyada subtract kar diya.'},
      {v:an+(n-1)*d, why:'Peeche jaana tha — add nahi, subtract karo.'},
      {v:Math.round(S/n), why:'Ye average hai, pehla term nahi.'},
      {v:a-d, why:'Ek gap zyada peeche chale gaye.'},
      {v:a+d, why:'Ye doosra term hai.'},
      {v:d, why:'Ye common difference hai, pehla term nahi.'}
    ].filter(w=>Number.isInteger(w.v));
    return {
      topic:'sumtable', kicker:'Table bharo',
      lead:VA+' missing hai. Pehla term kya hoga?',
      seq:VA+' = ? &nbsp;·&nbsp; '+VD+' = '+fmt(F(d))+' &nbsp;·&nbsp; '+VN+' = '+n+
          ' &nbsp;·&nbsp; a<sub>n</sub> = '+fmt(F(an))+' &nbsp;·&nbsp; '+VS+'<sub>n</sub> = '+fmt(F(S)),
      seqSmall:true,
      mode:'mcq',
      opts:opts4([{lb:fmt(F(a)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==a)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(a)),
      work:[
        {t:'a<sub>n</sub> = '+VA+' + ('+n+' &minus; 1)'+VD+' &rarr; '+fmt(F(an))+' = '+VA+' + '+fmt(F((n-1)*d)), why:''},
        {t:VA+' = '+fmt(F(an))+' &minus; '+fmt(F((n-1)*d))+' = '+fmt(F(a)), why:'Peeche '+(n-1)+' gaps jaana hai.'}
      ],
      say:'Aakhri term se peeche aana ho toh '+VD+' subtract karo.'
    };
  }

  const wrong=[
    {v:n-1, why:'Gaps gin liye, terms nahi. Plus one karo.'},
    {v:n+1, why:'Ek term zyada gin liya.'},
    {v:an, why:'Ye term ki value hai, ginti nahi.'},
    {v:n+2, why:'Do term zyada gin liye.'},
    {v:n-2, why:'Do term kam gin liye.'},
    {v:2*n, why:'Double kar diya.'},
    {v:Math.abs(d), why:'Ye common difference hai, ginti nahi.'}
  ].filter(w=>w.v>0);
  return {
    topic:'sumtable', kicker:'Table bharo',
    lead:VN+' missing hai. Kitne terms hain?',
    seq:VA+' = '+fmt(F(a))+' &nbsp;·&nbsp; '+VD+' = '+fmt(F(d))+' &nbsp;·&nbsp; '+VN+' = ?'+
        ' &nbsp;·&nbsp; a<sub>n</sub> = '+fmt(F(an))+' &nbsp;·&nbsp; '+VS+'<sub>n</sub> = '+fmt(F(S)),
    seqSmall:true,
    mode:lvl>=2?'type':'mcq',
    opts:lvl>=2?null:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==n)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(n), ansTyped:String(n),
    work:[
      {t:'a<sub>n</sub> = '+FORMULA+' &rarr; '+fmt(F(an))+' = '+fmt(F(a))+' + ('+VN+' &minus; 1)('+fmt(F(d))+')', why:'Sum ko haath mat lagao — a<sub>n</sub> se '+VN+' seedha nikal aata hai.'},
      {t:VN+' &minus; 1 = '+(n-1)+' &rarr; '+VN+' = '+n, why:'Plus one.'}
    ],
    say:'Paanch cheezein hain — '+VA+', '+VD+', '+VN+', a<sub>n</sub>, '+VS+'<sub>n</sub>. Koi teen pata ho toh baaki nikal aayenge.'
  };
}

/* ── Ex 5.3 Q4, Q5, Q6 · how many terms give this sum ──────── */
function gSumHowMany(lvl){
  /* d stays positive so n is unique — the two-root case gets its own
     question in gSumApply (the 200 logs) where the rejection is the lesson */
  const a=nz(1,15), d=nz(2,9), n=rnd(6,20);
  const S=(n*(2*a+(n-1)*d))/2;
  if(!Number.isInteger(S))return gSumN(lvl);
  const wrong=[
    {v:n+1, why:'Ek term zyada. Check karo: '+(n+1)+' terms ka sum '+((n+1)*(2*a+n*d))/2+' aata hai.'},
    {v:n-1, why:'Ek term kam.'},
    {v:2*n, why:'Double kar diya.'},
    {v:a+n, why:VA+' aur '+VN+' add kar diye.'}
  ].filter(w=>Number.isInteger(w.v)&&w.v>0);
  const canT=lvl>=2;
  return {
    topic:'sumhow', kicker:'Kitne terms',
    lead:'Is AP ke kitne terms lene par sum '+S+' aayega?',
    seq:seqStr(F(a),F(d),4,'auto'),
    mode:canT?'type':'mcq',
    opts:canT?null:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==n)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(n), ansTyped:String(n),
    work:[
      {t:VA+' = '+a+',&nbsp; '+VD+' = '+d+',&nbsp; '+VS+'<sub>n</sub> = '+S, why:VN+' hi unknown hai.'},
      {t:S+' = '+VN+'/2 [2('+a+') + ('+VN+' &minus; 1)('+d+')]', why:'Sum ka formula, aur '+VN+' ko hi find karna hai.'},
      {t:''+(2*S)+' = '+VN+'['+fmt(F(2*a-d))+signed(d,VN)+']', why:'2 udhar multiply me chala gaya, bracket khol diya.'},
      {t:d+VN+'&sup2;'+signed(2*a-d,VN)+' &minus; '+(2*S)+' = 0 &rarr; '+VN+' = '+n,
       why:'Quadratic ban gaya. Split the middle term — wahi chapter 4 wala kaam.'},
      {t:VN+' hamesha positive whole number hoga', why:'Doosra root minus me aayega, use reject kar do.'}
    ],
    say:'Sum diya ho aur '+VN+' find karna ho toh quadratic banega. Ghabrana nahi — splitting aati hai tumhe.'
  };
}

/* ── Ex 5.3 Q7, Q8, Q9 · sum from one or two terms ─────────── */
function gSumFromTerms(lvl){
  const kind=pick(['dAndLast','twoTerms']);
  if(kind==='dAndLast'){
    const d=nz(2,9), n=pick([22,20,25,15]), an=nz(50,180);
    const a=an-(n-1)*d;
    const S=(n*(a+an))/2;
    if(!Number.isInteger(S))return gSumN(lvl);
    const wrong=[
      {v:n*an, why:'Saare terms ko '+an+' maan liya. Terms toh badhte hue hain.'},
      {v:(n*(2*an+(n-1)*d))/2, why:VA+' ki jagah a<sub>n</sub> rakh diya.'},
      {v:a+an, why:'Sirf pehla aur aakhri add kiya. Beech ke sab reh gaye.'},
      {v:((n-1)*(a+an))/2, why:'Ek term chhoot gaya.'},
      {v:a, why:'Ye pehla term hai, sum nahi.'},
      {v:S+an, why:'Aakhri term do baar add ho gaya.'},
      {v:n*a, why:'Saare terms ko '+VA+' maan liya.'}
    ].filter(w=>Number.isInteger(w.v));
    return {
      topic:'sumterms', kicker:'Sum find karo',
      lead:'Ek AP me '+VD+' = '+d+' hai aur '+ord(n)+' term '+an+' hai. Pehle '+n+' terms ka sum kya hoga?',
      mode:lvl>=2?'type':'mcq',
      opts:lvl>=2?null:opts4([{lb:fmt(F(S)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==S)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(S)), ansTyped:typedForm(F(S)),
      work:[
        {t:'a<sub>'+n+'</sub> = '+VA+' + '+(n-1)+VD+' &rarr; '+an+' = '+VA+' + '+((n-1)*d), why:'Pehle '+VA+' find karo.'},
        {t:VA+' = '+fmt(F(a)), why:''},
        {t:VS+'<sub>'+n+'</sub> = '+n+'/2 ('+VA+' + a<sub>'+n+'</sub>) = '+n+'/2 ('+fmt(F(a))+' + '+an+') = '+fmt(F(S)),
         why:'Dono ends pata hain toh chhota formula.'}
      ],
      say:'Sum ke liye '+VA+' chahiye hi chahiye. Jo diya hai usse pehle '+VA+' nikalo.'
    };
  }
  const a2=nz(4,30), d=nz(2,9), a3=a2+d;
  const a=a2-d, n=pick([51,40,30]);
  const S=(n*(2*a+(n-1)*d))/2;
  if(!Number.isInteger(S))return gSumN(lvl);
  const wrong=[
    {v:(n*(2*a2+(n-1)*d))/2, why:'Doosre term ko pehla maan liya. '+VA+' = '+a2+' &minus; '+d+' = '+a+'.'},
    {v:(n*(2*a+n*d))/2, why:'('+VN+' &minus; 1) ki jagah '+VN+'.'},
    {v:a+(n-1)*d, why:'Ye '+n+'th term hai, sum nahi.'},
    {v:n*a, why:'Saare terms ko '+VA+' maan liya.'},
    {v:(n*(a+a+(n-1)*d))/2+d, why:'Chhota sa calculation slip.'},
    {v:a2, why:'Ye doosra term hai, sum nahi.'},
    {v:((n-1)*(2*a+(n-2)*d))/2, why:'Ek term chhoot gaya.'}
  ].filter(w=>Number.isInteger(w.v));
  return {
    topic:'sumterms', kicker:'Sum find karo',
    lead:'Ek AP ka doosra term '+a2+' hai aur teesra term '+a3+' hai. Pehle '+n+' terms ka sum kya hoga?',
    mode:lvl>=2?'type':'mcq',
    opts:lvl>=2?null:opts4([{lb:fmt(F(S)),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==S)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
    ansLabel:fmt(F(S)), ansTyped:typedForm(F(S)),
    work:[
      {t:VD+' = a&#8323; &minus; a&#8322; = '+a3+' &minus; '+a2+' = '+d, why:'Do lagatar terms se '+VD+' seedha mil jaata hai.'},
      {t:VA+' = a&#8322; &minus; '+VD+' = '+a2+' &minus; '+d+' = '+fmt(F(a)), why:'Ek gap peeche jao — yahi sabse badi galti hoti hai.'},
      {t:VS+'<sub>'+n+'</sub> = '+n+'/2 [2('+fmt(F(a))+') + '+(n-1)+'('+d+')] = '+fmt(F(S)), why:''}
    ],
    say:'Doosra term diya hai toh wo '+VA+' nahi hai. Ek gap peeche aana padega.'
  };
}

/* ── Ex 5.3 Q10, Q11 · from a formula, and back again ──────── */
function gSumFormula(lvl){
  if(rng()<0.5){
    /* aₙ = p + qn  →  it is an AP with d = q */
    const q=nz(2,9)*(rng()<0.3?-1:1), p=nz(-8,12), n=pick([15,10,20]);
    const a=p+q, an=p+q*n, S=(n*(a+an))/2;
    if(!Number.isInteger(S))return gSumN(lvl);
    const expr='a<sub>n</sub> = '+fmt(F(p))+' '+(q<0?'&minus;':'+')+' '+Math.abs(q)+VN;
    const wrong=[
      {v:(n*(2*p+(n-1)*q))/2, why:VA+' = '+fmt(F(p))+' maan liya. '+VN+' = 1 rakho: '+VA+' = '+fmt(F(a))+'.'},
      {v:an, why:'Ye '+n+'th term hai, sum nahi.'},
      {v:n*an, why:'Saare terms ko a<sub>'+n+'</sub> maan liya.'},
      {v:((n+1)*(a+p+q*(n+1)))/2, why:'Ek term zyada add kar liya.'},
      {v:a+an, why:'Sirf pehla aur aakhri add kiya.'},
      {v:n*(a+an), why:'2 se divide karna bhool gaye.'},
      {v:S-an, why:'Aakhri term chhoot gaya.'}
    ].filter(w=>Number.isInteger(w.v));
    return {
      topic:'sumformula', kicker:'Formula se AP',
      lead:'Ek list ka nth term '+expr+' se banta hai. Pehle '+n+' terms ka sum kya hoga?',
      mode:lvl>=2?'type':'mcq',
      opts:lvl>=2?null:opts4([{lb:fmt(F(S)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==S)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(S)), ansTyped:typedForm(F(S)),
      work:[
        {t:VN+' = 1 &rarr; '+VA+' = '+fmt(F(a))+',&nbsp; '+VN+' = 2 &rarr; a&#8322; = '+fmt(F(p+2*q)),
         why:VN+' ki jagah 1, 2, 3 rakh ke terms banao.'},
        {t:VD+' = a&#8322; &minus; a&#8321; = '+fmt(F(q))+' — har baar wahi, toh ye AP hai',
         why:'a<sub>n</sub> me '+VN+' ka coefficient hi '+VD+' hota hai.'},
        {t:'a<sub>'+n+'</sub> = '+fmt(F(p))+' '+(q<0?'&minus;':'+')+' '+Math.abs(q)+'('+n+') = '+fmt(F(an)), why:''},
        {t:VS+'<sub>'+n+'</sub> = '+n+'/2 ('+fmt(F(a))+' + '+fmt(F(an))+') = '+fmt(F(S)), why:''}
      ],
      say:'a<sub>n</sub> me '+VN+' ke aage jo number hai, wahi '+VD+' hai. Ye pehchan lo toh question ek line ka hai.'
    };
  }
  /* Sₙ = pn + qn²  →  aₙ = Sₙ − Sₙ₋₁ */
  const q=nz(-4,4)||2, p=nz(2,10);
  const k=pick([2,3,10]);
  const Sk=p*k+q*k*k, Sk1=p*(k-1)+q*(k-1)*(k-1);
  const ak=Sk-Sk1;
  const expr=VS+'<sub>n</sub> = '+fmt(F(p))+VN+' '+(q<0?'&minus;':'+')+' '+Math.abs(q)+VN+'&sup2;';
  const wrong=[
    {v:Sk, why:'Ye pehle '+k+' terms ka sum hai, '+ord(k)+' term nahi.'},
    {v:p*k+q*k, why:VN+'&sup2; me square lagana bhool gaye.'},
    {v:Sk+Sk1, why:'Add kar diya. a<sub>n</sub> = '+VS+'<sub>n</sub> &minus; '+VS+'<sub>n&minus;1</sub> — subtract.'},
    {v:Sk1, why:'Ye pehle '+(k-1)+' terms ka sum hai.'},
    {v:p+q, why:VS+'<sub>1</sub> hai, yaani pehla term. '+ord(k)+' poochha gaya hai.'},
    {v:Sk-Sk1+q, why:'Chhota sa calculation slip.'},
    {v:2*ak, why:'Double ho gaya.'}
  ];
  return {
    topic:'sumformula', kicker:'Sum se term',
    lead:'Ek AP ke pehle '+VN+' terms ka sum '+expr+' hai. Iska '+ord(k)+' term kya hoga?',
    mode:'mcq',
    opts:opts4([{lb:fmt(F(ak)),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==ak)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
    ansLabel:fmt(F(ak)),
    work:[
      {t:'a<sub>n</sub> = '+VS+'<sub>n</sub> &minus; '+VS+'<sub>n&minus;1</sub>',
       why:'nth term = pehle n ka sum, minus pehle (n&minus;1) ka sum. Beech ka sab cancel.'},
      {t:VS+'<sub>'+k+'</sub> = '+fmt(F(p))+'('+k+') '+(q<0?'&minus;':'+')+' '+Math.abs(q)+'('+k+')&sup2; = '+fmt(F(Sk)), why:''},
      {t:VS+'<sub>'+(k-1)+'</sub> = '+fmt(F(Sk1)), why:''},
      {t:'a<sub>'+k+'</sub> = '+fmt(F(Sk))+' &minus; '+fmt(F(Sk1))+' = '+fmt(F(ak)), why:''}
    ],
    say:VS+'<sub>n</sub> diya ho toh term nikalne ka ek hi rasta hai — do sums ka fark.'
  };
}

/* ── Ex 5.3 Q12, Q13, Q14 · sums of multiples ──────────────── */
function gSumMultiples(lvl){
  const kind=pick(['first','odd']);
  if(kind==='first'){
    const k=pick([6,8,5,7,9,4]), n=pick([15,20,40,25,30]);
    const S=(n*(2*k+(n-1)*k))/2;
    const wrong=[
      {v:(n*(2*k+n*k))/2, why:'('+VN+' &minus; 1) ki jagah '+VN+'.'},
      {v:n*k, why:'Ye '+ord(n)+' multiple hai, sum nahi.'},
      {v:S+k, why:'Ek multiple zyada add kar liya.'},
      {v:S/2, why:'Ek baar zyada 2 se divide kar diya.'},
      {v:S-k, why:'Ek multiple chhoot gaya.'},
      {v:k+n*k, why:'Sirf pehla aur aakhri add kiya.'},
      {v:n*n*k, why:VN+' ko square kar diya.'}
    ].filter(w=>Number.isInteger(w.v));
    return {
      topic:'summult', kicker:'Multiples ka sum',
      lead:'Pehle '+n+' multiples of '+k+' ka sum kya hoga?',
      seq:k+', '+(2*k)+', '+(3*k)+', '+DOTS,
      mode:lvl>=2?'type':'mcq',
      opts:lvl>=2?null:opts4([{lb:fmt(F(S)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==S)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(S)), ansTyped:typedForm(F(S)),
      work:[
        {t:''+k+' ke multiples: '+k+', '+(2*k)+', '+(3*k)+', '+DOTS+' &rarr; '+VA+' = '+k+', '+VD+' = '+k,
         why:'Multiples hamesha AP hote hain, aur '+VA+' = '+VD+' = '+k+'.'},
        {t:VS+'<sub>'+n+'</sub> = '+n+'/2 [2('+k+') + '+(n-1)+'('+k+')] = '+fmt(F(S)), why:''}
      ],
      say:'Multiples wale AP me '+VA+' aur '+VD+' dono wahi divisor hote hain.'
    };
  }
  const hi=pick([50,60,80,100]);
  const n=hi/2;
  const S=n*n;                                   /* 1+3+5+…+(2n−1) = n² */
  const wrong=[
    {v:n*(n+1), why:'Ye 1 se '+hi+' tak ke saare numbers ka sum hai — sirf odd chahiye the.'},
    {v:hi*hi, why:'Terms '+n+' hain, '+hi+' nahi.'},
    {v:(n+1)*(n+1), why:'Ek term zyada gin liya. '+(hi-1)+' tak sirf '+n+' odd numbers hain.'},
    {v:n*n-1, why:'Chhota sa calculation slip.'},
    {v:hi, why:'Ye aakhri number ke aas paas hai, sum nahi.'},
    {v:n*(n-1), why:'Ek term chhoot gaya.'},
    {v:2*n*n, why:'Double ho gaya.'}
  ];
  return {
    topic:'summult', kicker:'Odd numbers ka sum',
    lead:'0 aur '+hi+' ke beech ke saare odd numbers ka sum kya hoga?',
    seq:'1, 3, 5, '+DOTS+', '+(hi-1),
    mode:lvl>=2?'type':'mcq',
    opts:lvl>=2?null:opts4([{lb:String(S),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==S)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(S), ansTyped:String(S),
    work:[
      {t:'Odd numbers: 1, 3, 5, '+DOTS+', '+(hi-1)+' &rarr; '+VA+' = 1, '+VD+' = 2, l = '+(hi-1), why:'Pehle AP likho.'},
      {t:'l = '+VA+' + ('+VN+' &minus; 1)'+VD+' &rarr; '+(hi-1)+' = 1 + ('+VN+' &minus; 1)2 &rarr; '+VN+' = '+n,
       why:'Kitne odd numbers hain, wo pehle find karo.'},
      {t:VS+'<sub>'+n+'</sub> = '+n+'/2 (1 + '+(hi-1)+') = '+n+'/2 ('+hi+') = '+S, why:'Aur haan — pehle n odd numbers ka sum hamesha n&sup2; hota hai.'}
    ],
    say:'1 + 3 + 5 + … pehle n odd numbers = n&sup2;. Ye yaad rakho, MCQ me kaam aata hai.'
  };
}

/* ── Ex 5.3 Q15–Q20 · word problems on the sum ─────────────── */
function gSumApply(lvl){
  const R='&#8377;';
  const kind=pick(lvl===1?['penalty','trees']:['penalty','trees','prizes','logs','potato']);

  if(kind==='penalty'){
    const a=pick([200,150,250]), d=pick([50,40,30]), n=pick([30,25,20]);
    const S=(n*(2*a+(n-1)*d))/2;
    return {
      topic:'sumapply', kicker:'Word problem',
      lead:'Ek contract me delay ka penalty aisa hai: pehle din '+R+a+', doosre din '+R+(a+d)+', teesre din '+R+(a+2*d)+', aur har agle din '+R+d+' zyada. '+n+' din delay hone par contractor ko kitna penalty dena padega?',
      seq:a+', '+(a+d)+', '+(a+2*d)+', '+DOTS, seqSmall:true,
      mode:'type', ansLabel:String(S), ansTyped:String(S),
      work:[
        {t:'Penalty har din: '+a+', '+(a+d)+', '+(a+2*d)+', '+DOTS+' &rarr; '+VA+' = '+a+', '+VD+' = '+d, why:'Din hi terms hain.'},
        {t:'Total penalty matlab saare dinon ka sum &rarr; '+VS+'<sub>'+n+'</sub>', why:'"How much money in total" = sum, ek din ka nahi.'},
        {t:VS+'<sub>'+n+'</sub> = '+n+'/2 [2('+a+') + '+(n-1)+'('+d+')] = '+S, why:''}
      ],
      say:'"Total" ya "kitna sab milakar" dikhe toh sum ka formula. Ek din ka poochha hota toh a<sub>n</sub> lagta.'
    };
  }

  if(kind==='trees'){
    const cls=pick([12,10,8]), sec=pick([3,2,4]);
    const S=sec*(cls*(cls+1))/2;
    return {
      topic:'sumapply', kicker:'Word problem',
      lead:'Ek school me Class I ka har section 1 ped lagayega, Class II ka har section 2 ped, aur aise hi Class '+(cls===12?'XII':cls===10?'X':'VIII')+' tak. Har class ke '+sec+' sections hain. Kul kitne ped lagenge?',
      seq:'1, 2, 3, '+DOTS+', '+cls, seqSmall:true,
      mode:'type', ansLabel:String(S), ansTyped:String(S),
      work:[
        {t:'Ek section ke hisaab se: 1, 2, 3, '+DOTS+', '+cls+' &rarr; '+VA+' = 1, '+VD+' = 1, '+VN+' = '+cls, why:''},
        {t:VS+'<sub>'+cls+'</sub> = '+cls+'/2 (1 + '+cls+') = '+((cls*(cls+1))/2), why:'Ek section ne itne ped lagaye.'},
        {t:'Har class ke '+sec+' sections &rarr; '+((cls*(cls+1))/2)+' &times; '+sec+' = '+S, why:'Sum nikalne ke baad sections se multiply karna mat bhoolna.'}
      ],
      say:'Sum nikal liya matlab kaam khatam nahi. Question aage kya poochh raha hai, wo padho.'
    };
  }

  if(kind==='prizes'){
    const total=pick([700,900,600]), cnt=pick([7,6,5]), gap=pick([20,25,30]);
    /* total = cnt/2 [2a − (cnt−1)gap] */
    const a=(2*total/cnt+(cnt-1)*gap)/2;
    if(!Number.isInteger(a))return gSumApply(1);
    const wrong=[
      {v:total/cnt, why:'Saare prizes barabar maan liye. Har prize '+gap+' kam hota ja raha hai.'},
      {v:a-gap, why:'Ye doosra prize hai, pehla nahi.'},
      {v:a+gap, why:'Ek prize aage nikal gaye.'},
      {v:total-gap*(cnt-1), why:'Sum ka formula lagana tha.'}
    ].filter(w=>Number.isInteger(w.v)&&w.v>0);
    return {
      topic:'sumapply', kicker:'Word problem',
      lead:R+total+' ko '+cnt+' cash prizes me baantna hai, aur har prize apne pichle prize se '+R+gap+' kam hai. Sabse pehla (sabse bada) prize kitne ka hoga?',
      mode:'mcq',
      opts:opts4([{lb:fmt(F(a)),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==a)).map(w=>({lb:fmt(F(w.v)),ok:false,why:w.why})))),
      ansLabel:fmt(F(a)),
      work:[
        {t:'Prizes ek AP hain, ghatti hui: '+VD+' = &minus;'+gap+', '+VN+' = '+cnt+', '+VS+'<sub>'+cnt+'</sub> = '+total, why:'"Har prize '+gap+' kam" matlab '+VD+' minus me hai.'},
        {t:''+total+' = '+cnt+'/2 [2'+VA+' + '+(cnt-1)+'(&minus;'+gap+')]', why:'Sum ka formula, aur '+VA+' hi unknown hai.'},
        {t:''+(2*total/cnt)+' = 2'+VA+' &minus; '+((cnt-1)*gap)+' &rarr; '+VA+' = '+fmt(F(a)), why:''},
        {t:'Prizes: '+[0,1,2].map(i=>fmt(F(a-i*gap))).join(', ')+', '+DOTS, why:'Answer me saare prizes likhna hota hai.'}
      ],
      say:'"Har baar kam" dikhe toh '+VD+' minus me hai. Yahi ek line poore question ka rukh badal deti hai.'
    };
  }

  if(kind==='logs'){
    /* the classic two-root problem: one root has to be rejected */
    const bottom=20, S=200, n=16, top=bottom-(n-1);
    return {
      topic:'sumapply', kicker:'Word problem',
      lead:'200 logs is tarah stack kiye gaye hain: sabse neeche wali row me 20 logs, uske upar 19, uske upar 18, aur aise hi. Logs kitni rows me rakhe gaye hain?',
      seq:'20, 19, 18, '+DOTS, seqSmall:true,
      mode:'mcq',
      opts:opts4([
        {lb:'16', ok:true},
        {lb:'25', ok:false, why:'Quadratic ke do root aate hain — 16 aur 25. Lekin 25th row me logs '+(20-24)+' aa jaate, aur logs minus me nahi ho sakte. Isliye 25 reject.'},
        {lb:'20', ok:false, why:'Ye sabse neeche wali row ke logs hain, rows ki ginti nahi.'},
        {lb:'10', ok:false, why:'10 rows ka sum sirf '+((10*(2*20-9))/2)+' hota hai, 200 nahi.'},
        {lb:'41', ok:false, why:'Itni rows me toh logs khatam ho ke minus me chale jaate.'}
      ]),
      ansLabel:'16',
      work:[
        {t:VA+' = 20, '+VD+' = &minus;1, '+VS+'<sub>n</sub> = 200', why:'Har row me ek log kam.'},
        {t:'200 = '+VN+'/2 [40 + ('+VN+' &minus; 1)(&minus;1)] = '+VN+'/2 [41 &minus; '+VN+']', why:''},
        {t:'400 = 41'+VN+' &minus; '+VN+'&sup2; &rarr; '+VN+'&sup2; &minus; 41'+VN+' + 400 = 0', why:'Quadratic ban gaya.'},
        {t:'('+VN+' &minus; 16)('+VN+' &minus; 25) = 0 &rarr; '+VN+' = 16 ya 25', why:'Do root aaye — dono check karne padenge.'},
        {t:VN+' = 25 &rarr; a<sub>25</sub> = 20 + 24(&minus;1) = &minus;4 &rarr; reject', why:'Logs minus me nahi ho sakte. Isliye '+VN+' = 16, aur top row me '+top+' logs.'}
      ],
      say:'Do root aayein toh dono check karo. Jo physically possible nahi, use reject karna hi asli answer hai.'
    };
  }

  const first=pick([5,4,6]), gap=pick([3,4,2]), cnt=pick([10,8,12]);
  /* 2×5 + 2×(5+3) + … = 2 × sum of distances */
  const S=2*((cnt*(2*first+(cnt-1)*gap))/2);
  return {
    topic:'sumapply', kicker:'Word problem',
    lead:'Ek potato race me bucket starting point par hai. Pehla potato bucket se '+first+' m door hai, aur baaki potatoes ek line me '+gap+' m ke gap par rakhe hain. Total '+cnt+' potatoes hain. Competitor bucket se daudta hai, ek potato uthata hai, wapas aake bucket me daalta hai, phir agla — aise hi sab tak. Wo kul kitne metre daudegi?',
    mode:'type', ansLabel:String(S), ansTyped:String(S),
    work:[
      {t:'Pehle potato ke liye: '+first+' m jaana + '+first+' m aana = 2 &times; '+first,
       why:'Har potato ke liye jaana aur aana — dono.'},
      {t:'Doosre ke liye: 2 &times; '+(first+gap)+',&nbsp; teesre ke liye: 2 &times; '+(first+2*gap), why:''},
      {t:'Distances ka AP: '+first+', '+(first+gap)+', '+(first+2*gap)+', '+DOTS+' &rarr; '+VA+' = '+first+', '+VD+' = '+gap+', '+VN+' = '+cnt, why:''},
      {t:VS+'<sub>'+cnt+'</sub> = '+cnt+'/2 [2('+first+') + '+(cnt-1)+'('+gap+')] = '+(S/2), why:'Ye sirf ek taraf ka total hai.'},
      {t:'Aana-jaana dono &rarr; 2 &times; '+(S/2)+' = '+S+' m', why:'Do se multiply karna sabse zyada log yahin bhoolte hain.'}
    ],
    say:'Jaana aur aana dono gina. Sum nikalne ke baad 2 se multiply — wahi ek step marks kha jaata hai.'
  };
}

/* ── formula recall for the sum ────────────────────────────── */
function gSumSymb(lvl){
  const kind=pick(['main','withL','fromS','vsTerm']);
  if(kind==='main'){
    return {topic:'sumsymb',kicker:'Formula',lead:'Pehle '+VN+' terms ke sum ka formula kya hai?',
      mode:'mcq',ansLabel:'Sn = n/2 [2a + (n − 1)d]',
      opts:opts4([
        {lb:SUMFORM, ok:true},
        {lb:VS+'<sub>n</sub> = '+VN+'/2 ['+VA+' + ('+VN+' &minus; 1)'+VD+']', ok:false, why:VA+' ka double hota hai — 2'+VA+'.'},
        {lb:VS+'<sub>n</sub> = '+VA+' + ('+VN+' &minus; 1)'+VD, ok:false, why:'Ye a<sub>n</sub> ka formula hai, sum ka nahi.'},
        {lb:VS+'<sub>n</sub> = '+VN+'/2 [2'+VA+' + '+VN+VD+']', ok:false, why:'Gaps '+VN+' &minus; 1 hote hain.'}
      ]),
      work:[{t:'S = a + (a+d) + '+DOTS+' + [a + (n&minus;1)d]', why:'Seedha likho.'},
            {t:'Ulta likh ke add karo &rarr; 2S = n[2a + (n&minus;1)d]', why:'Gauss wala trick — dono ends jodo, har jodi barabar aati hai.'},
            {t:SUMFORM, why:'2 se divide.'}],
      say:'Ye wahi Gauss wala tarika hai — 1 se 100 tak jodne ka.'};
  }
  if(kind==='withL'){
    return {topic:'sumsymb',kicker:'Formula',lead:'Jab pehla term '+VA+' aur aakhri term l diya ho, sum ka formula kya hai?',
      mode:'mcq',ansLabel:'Sn = n/2 (a + l)',
      opts:opts4([
        {lb:SUMFORM_L, ok:true},
        {lb:VS+'<sub>n</sub> = ('+VA+' + l)/2', ok:false, why:VN+'/2 se multiply karna hai — ye sirf average hai.'},
        {lb:VS+'<sub>n</sub> = '+VN+'('+VA+' + l)', ok:false, why:'2 se divide karna bhool gaye.'},
        {lb:VS+'<sub>n</sub> = '+VN+'/2 (l &minus; '+VA+')', ok:false, why:'Add karna hai, subtract nahi.'}
      ]),
      work:[{t:SUMFORM, why:'Bade wale formula se shuru karo.'},
            {t:VN+'/2 [a + (a + (n&minus;1)d)] = '+VN+'/2 [a + a<sub>n</sub>]', why:'2a ko a + a likh do.'},
            {t:'aur a<sub>n</sub> = l &rarr; '+SUMFORM_L, why:'Isiliye ye alag formula nahi hai, wahi hai.'}],
      say:VD+' na diya ho aur l diya ho toh yahi lagana hai.'};
  }
  if(kind==='fromS'){
    return {topic:'sumsymb',kicker:'Formula',lead:VS+'<sub>n</sub> pata ho toh a<sub>n</sub> kaise nikalte hain?',
      mode:'mcq',ansLabel:'an = Sn − Sn−1',
      opts:opts4([
        {lb:'a<sub>n</sub> = '+VS+'<sub>n</sub> &minus; '+VS+'<sub>n&minus;1</sub>', ok:true},
        {lb:'a<sub>n</sub> = '+VS+'<sub>n</sub> &divide; '+VN, ok:false, why:'Ye average hai, nth term nahi.'},
        {lb:'a<sub>n</sub> = '+VS+'<sub>n</sub> + '+VS+'<sub>n&minus;1</sub>', ok:false, why:'Subtract karna hai — nahi toh terms do baar aa jaayenge.'},
        {lb:'a<sub>n</sub> = '+VS+'<sub>n&minus;1</sub> &minus; '+VS+'<sub>n</sub>', ok:false, why:'Sign ulta.'}
      ]),
      work:[{t:VS+'<sub>n</sub> = a&#8321; + a&#8322; + '+DOTS+' + a<sub>n&minus;1</sub> + a<sub>n</sub>', why:''},
            {t:VS+'<sub>n&minus;1</sub> = a&#8321; + a&#8322; + '+DOTS+' + a<sub>n&minus;1</sub>', why:''},
            {t:'Subtract karo &rarr; sirf a<sub>n</sub> bachta hai', why:'Baaki sab cancel ho jaata hai.'}],
      say:'Sum me se ek kam ka sum ghata do — jo bacha wahi nth term.'};
  }
  const n=pick([12,20,15]);
  return {topic:'sumsymb',kicker:'Term ya sum?',
    lead:'"'+ord(n)+' term kya hai" aur "pehle '+n+' terms ka sum kya hai" — inme kya farak hai?',
    mode:'mcq',ansLabel:'Pehla ek number hai, doosra sab add karke',
    opts:opts4([
      {lb:'Pehla sirf ek term deta hai, doosra saare '+n+' terms add karke', ok:true},
      {lb:'Dono ek hi cheez hain', ok:false, why:'Bilkul alag. a<sub>'+n+'</sub> ek term hai, '+VS+'<sub>'+n+'</sub> '+n+' terms ka total.'},
      {lb:'Pehla sum hai, doosra term', ok:false, why:'Ulta ho gaya.'},
      {lb:'Dono ke liye ek hi formula lagta hai', ok:false, why:'a<sub>n</sub> = '+VA+' + ('+VN+'&minus;1)'+VD+' aur '+SUMFORM+' — do alag formule.'}
    ]),
    work:[{t:'a<sub>'+n+'</sub> = '+FORMULA+' &rarr; ek number', why:'Sirf '+ord(n)+' waala term.'},
          {t:VS+'<sub>'+n+'</sub> = '+SUMFORM+' &rarr; pehle '+n+' terms ka total', why:'Saare add ho gaye.'}],
    say:'Question me "total", "sum", "kul milakar" dikhe toh '+VS+'<sub>n</sub>. Warna a<sub>n</sub>.'};
}
