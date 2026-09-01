/* ── 9 · IS THIS SITUATION AN AP? (NCERT 5.1 Q1 shapes) ────── */
function gSituation(lvl){
  const R='&#8377;';
  const S=[
    ()=>{ const f=pick([15,18,20,25]), e=pick([8,7,10,6]);
      return {txt:'Taxi ka kiraya: pehle kilometre ka '+R+f+', aur uske baad har extra kilometre ka '+R+e+'. Har kilometre ke baad kiraya.',
        seq:[f,f+e,f+2*e,f+3*e].map(String), yes:true, d:String(e),
        note:'Har km pe utna hi add ho raha hai — '+R+e+'. Gap equal.'}; },
    ()=>{ const f=pick([150,200,120]), r=pick([50,40,30]);
      return {txt:'Kuan khodne ka kharcha: pehle metre ka '+R+f+', aur har agle metre pe '+R+r+' zyada.',
        seq:[f,f+r,f+2*r,f+3*r].map(String), yes:true, d:String(r),
        note:'Taxi wale jaisa hi hai — har metre pe fix '+R+r+' add ho raha hai.'}; },
    ()=>{ const s=pick([8000,10000,12000]), i=pick([500,400,600]);
      return {txt:'Ek job ki monthly salary '+R+s+' hai, aur har saal '+R+i+' ka annual increment milta hai. Har saal ki monthly salary.',
        seq:[s,s+i,s+2*i,s+3*i].map(String), yes:true, d:String(i),
        note:'Increment fix hai, isliye gap fix hai.'}; },
    ()=>{ const p=pick([5000,8000,10000]), r=pick([8,10,12]);
      return {txt:R+p+' bank me simple interest par rakhe hain, '+r+'% per annum. Har saal ke end me total amount.',
        seq:(()=>{ const si=p*r/100; return [p+si,p+2*si,p+3*si,p+4*si].map(x=>String(x)); })(),
        yes:true, d:String(p*r/100),
        note:'Simple interest hamesha original amount par lagta hai — isliye har saal utna hi add hota hai.'}; },
    ()=>{ const f=pick([20,23,25]), k=pick([2,3]);
      return {txt:'Ek theatre me pehli row me '+f+' seats hain, aur har agli row me '+k+' seats zyada.',
        seq:[f,f+k,f+2*k,f+3*k].map(String), yes:true, d:String(k),
        note:'Row dar row utni hi seats badh rahi hain.'}; },
    ()=>{ const k=pick([4,3,5]);
      return {txt:'Ek cylinder me bhari hui hawa me se vacuum pump har baar bachi hui hawa ka 1/'+k+' hissa nikal deta hai. Har baar bachi hui hawa.',
        seq:['1', fracStr(F(k-1,k)), fracStr(F((k-1)*(k-1),k*k)), fracStr(F(Math.pow(k-1,3),Math.pow(k,3)))],
        yes:false, why:'Nahi — har baar multiply ho raha hai, add nahi',
        d:fracStr(F(-1,k)),
        note:'Har baar bachi hui hawa ka hissa nikal raha hai — matlab har baar alag amount nikal raha hai.'}; },
    ()=>{ const p=pick([10000,20000]), r=pick([8,10]);
      const v=[p]; for(let i=0;i<3;i++)v.push(Math.round(v[v.length-1]*(100+r)/100));
      return {txt:R+p+' bank me compound interest par rakhe hain, '+r+'% per annum. Har saal ke end me total amount.',
        seq:v.map(String), yes:false, why:'Nahi — gap khud badhta ja raha hai', d:String(v[1]-v[0]),
        note:'Pehle saal '+(v[1]-v[0])+' ka byaaj, doosre saal '+(v[2]-v[1])+' ka. Byaaj par bhi byaaj lag raha hai — gap equal reh hi nahi sakta.'}; },
    ()=>{ const s=pick([1,2,3]);
      return {txt:'Ek square ka side har baar 1 cm badhta hai, side '+s+' cm se shuru. Har square ka area.',
        seq:[s,s+1,s+2,s+3].map(x=>String(x*x)), yes:false,
        why:'Nahi — gap khud badhta ja raha hai', d:String((s+1)*(s+1)-s*s),
        note:'Side toh equal badh raha hai, lekin area square ho raha hai. Gaps '+[(s+1)*(s+1)-s*s,(s+2)*(s+2)-(s+1)*(s+1)].join(' aur ')+'.'}; },
    ()=>{ const b=pick([2,3]), a=pick([1,2]);
      return {txt:'Ek bacteria har ghante '+(b===2?'double':'triple')+' ho jata hai. Shuru me '+a+' bacteria hai. Har ghante ki ginti.',
        seq:[a,a*b,a*b*b,a*b*b*b].map(String), yes:false,
        why:'Nahi — har baar multiply ho raha hai, add nahi', d:String(a*b-a),
        note:'Chess board pe chawal wali kahani — ye AP nahi, ye bahut tez bhagta hai.'}; }
  ];
  const f=pick(S);
  const c=f();
  const trueNo=c.why||NO_REASONS[0];
  const decoyNo=pick(NO_REASONS.filter(r=>r!==trueNo));
  let flip=String(c.d).startsWith(MINUS)?String(c.d).slice(1):MINUS+c.d;
  let flipWhy='Sign ulta. '+VD+' = a&#8322; &minus; a&#8321;.';
  if(flip===String(c.d)){ flip=String(c.seq[0]); flipWhy='Ye pehla term hai, gap nahi.'; }
  const list=[
    {lb:'Haan — AP hai, '+VD+' = '+c.d, ok:!!c.yes, why:c.yes?'':'Pehla gap dekh ke haan bol diya. Aage ke gaps bhi equal hone chahiye.'},
    {lb:'Haan — AP hai, '+VD+' = '+flip, ok:false, why:flipWhy},
    {lb:trueNo, ok:!c.yes, why:c.yes?'Gaps toh equal hain — find karke dekho.':''},
    {lb:decoyNo, ok:false, why:'Reason theek nahi hai.'}
  ];
  return {
    topic:'situation', kicker:'Situation se AP',
    lead:c.txt,
    seq:c.seq.join(', ')+', '+DOTS,
    seqSmall:true,
    mode:'mcq', opts:opts4(list), ansLabel:c.yes?'Haan — AP hai, d = '+c.d:trueNo,
    work:[
      {t:'Pehle situation ko numbers me likho: '+c.seq.join(', ')+', '+DOTS, why:'Question padh ke seedha AP likh do.'},
      {t:'a&#8322; &minus; a&#8321; = '+c.seq[1]+' &minus; '+c.seq[0]+',&nbsp; a&#8323; &minus; a&#8322; = '+c.seq[2]+' &minus; '+c.seq[1], why:'Do gaps compare karo.'},
      {t:c.yes?('Barabar &rarr; yes, this forms an AP with common difference '+c.d)
              :('Barabar nahi &rarr; this does not form an AP because we do not have a common difference.'),
       why:c.note||''}
    ],
    say:c.yes?'Exam me reason bhi likhna — "because we have a common difference".'
             :'Exam me poora likhna: "this does not form an AP because we do not have a common difference".'
  };
}

/* ── 10 · ENGLISH → EQUATION ───────────────────────────────── */
function gTranslate(lvl){
  const kind=pick(lvl===1?['isterm','sum']:['isterm','sum','product','twice','diff']);
  if(kind==='isterm'){
    const p=pick([4,7,9,11,14]);
    let vN=nz(-8,20); if(vN===p)vN=p+1;
    const v=fmt(F(vN));
    const right=VA+' + '+(p-1)+VD+' = '+v;
    return {topic:'translate',kicker:'English se equation',
      lead:'"The '+ord(p)+' term of an AP is '+v+'." Ise equation me kaise likhoge?',
      mode:'mcq',ansLabel:'a + '+(p-1)+'d = '+v,
      opts:opts4([
        {lb:right,ok:true},
        {lb:VA+' + '+p+VD+' = '+v,ok:false,why:ord(p)+' term me gaps '+(p-1)+' hote hain.'},
        {lb:VA+VD+' = '+v,ok:false,why:'Multiply nahi, '+VA+' + gaps.'},
        {lb:VA+' + '+(p-1)+VD+' = '+p,ok:false,why:'Position '+p+' hai, value '+v+'. Ulta mat karo.'}
      ]),
      work:[{t:ord(p)+' term = a<sub>'+p+'</sub> = '+VA+' + '+(p-1)+VD,why:'Formula.'},
            {t:'"is '+v+'" &rarr; = '+v,why:'"is" ka matlab equal to.'}],
      say:'"is" dikha, equal to laga do.'};
  }
  if(kind==='sum'){
    const p=pick([3,4,5,6]), q=p+pick([3,4,5]), v=pick([24,30,44,20,36]);
    const right='('+VA+' + '+(p-1)+VD+') + ('+VA+' + '+(q-1)+VD+') = '+v;
    return {topic:'translate',kicker:'English se equation',
      lead:'"The sum of the '+ord(p)+' and '+ord(q)+' terms of an AP is '+v+'." Ise equation me likho.',
      mode:'mcq',ansLabel:right,
      opts:opts4([
        {lb:right,ok:true},
        {lb:'('+VA+' + '+p+VD+') + ('+VA+' + '+q+VD+') = '+v,ok:false,why:'Dono jagah ek-ek gap zyada le liya.'},
        {lb:p+VA+' + '+q+VD+' = '+v,ok:false,why:'Position ko coefficient bana diya. '+VA+' multiply nahi hota.'},
        {lb:'('+VA+' + '+(p-1)+VD+')('+VA+' + '+(q-1)+VD+') = '+v,ok:false,why:'Sum bola hai, product nahi.'}
      ]),
      work:[{t:ord(p)+' term = '+VA+' + '+(p-1)+VD, why:''},
            {t:ord(q)+' term = '+VA+' + '+(q-1)+VD, why:''},
            {t:'Sum = '+v+' &rarr; '+right, why:'Sum matlab plus.'},
            {t:'Simplify: 2'+VA+' + '+(p+q-2)+VD+' = '+v, why:'Aage solve karne ke liye simplest form banao.'}],
      say:'Pehle sentence ko equation banao. Aadha question wahin khatam.'};
  }
  if(kind==='product'){
    const p=pick([3,2,4]), q=p+2, v=pick([1,4,9]);
    const right='('+VA+' + '+(p-1)+VD+')('+VA+' + '+(q-1)+VD+') = '+v;
    return {topic:'translate',kicker:'English se equation',
      lead:'"The product of the '+ord(p)+' and '+ord(q)+' terms of an AP is '+v+'." Ise equation me likho.',
      mode:'mcq',ansLabel:right,
      opts:opts4([
        {lb:right,ok:true},
        {lb:'('+VA+' + '+(p-1)+VD+') + ('+VA+' + '+(q-1)+VD+') = '+v,ok:false,why:'Product bola hai — multiply, plus nahi.'},
        {lb:'('+VA+' + '+p+VD+')('+VA+' + '+q+VD+') = '+v,ok:false,why:'Ek-ek gap zyada.'},
        {lb:p+VA+' &times; '+q+VD+' = '+v,ok:false,why:VA+' ko position se multiply nahi karte.'}
      ]),
      work:[{t:'Product matlab multiply', why:'Sum matlab plus, product matlab into.'},
            {t:right, why:'Dono terms ko bracket me likhna mat bhoolna.'}],
      say:'Sum = plus. Product = into. Chhoti baat hai, marks yahin jaate hain.'};
  }
  if(kind==='twice'){
    const p=pick([7,9,11]), q=pick([3,4,5]);
    const right=VA+' + '+(p-1)+VD+' = 2('+VA+' + '+(q-1)+VD+')';
    return {topic:'translate',kicker:'English se equation',
      lead:'"The '+ord(p)+' term of an AP is twice its '+ord(q)+' term." Ise equation me likho.',
      mode:'mcq',ansLabel:right,
      opts:opts4([
        {lb:right,ok:true},
        {lb:'2('+VA+' + '+(p-1)+VD+') = '+VA+' + '+(q-1)+VD,ok:false,why:'Twice kis par lag raha hai dekho — '+ord(q)+' term par.'},
        {lb:VA+' + '+p+VD+' = 2('+VA+' + '+q+VD+')',ok:false,why:'Dono jagah ek gap zyada.'},
        {lb:VA+' + '+(p-1)+VD+' = '+VA+' + 2('+(q-1)+')'+VD,ok:false,why:'Poore term ka double hona hai, sirf '+VD+' ka nahi.'}
      ]),
      work:[{t:ord(p)+' term = '+VA+' + '+(p-1)+VD, why:''},
            {t:ord(q)+' term = '+VA+' + '+(q-1)+VD, why:''},
            {t:'"is twice its '+ord(q)+' term" &rarr; '+right, why:'Twice matlab 2 se multiply — aur poore bracket par.'}],
      say:'Bracket lagana mat bhoolna. Twice poore term ka hota hai.'};
  }
  const n=pick([99,50,75]);
  const right='('+VA+' + '+(n-1)+VD+') &minus; (A + '+(n-1)+VD+') = '+n;
  return {topic:'translate',kicker:'English se equation',
    lead:'Do APs ka common difference same hai. "The difference of their '+ord(n)+' terms is '+n+'." Ise likho — pehle ka first term '+VA+', doosre ka A.',
    mode:'mcq',ansLabel:right,
    opts:opts4([
      {lb:right,ok:true},
      {lb:'('+VA+' + '+n+VD+') &minus; (A + '+n+VD+') = '+n,ok:false,why:'Ek gap zyada.'},
      {lb:VA+' + '+(n-1)+VD+' &minus; A + '+(n-1)+VD+' = '+n,ok:false,why:'Bracket nahi lagaya — minus andar jaake sign badalta hai.'},
      {lb:'('+VA+' &minus; A)('+n+' &minus; 1)'+VD+' = '+n,ok:false,why:'Difference hai, product nahi.'}
    ]),
    work:[{t:'Pehle AP ka '+ord(n)+' term = '+VA+' + '+(n-1)+VD, why:''},
          {t:'Doosre AP ka '+ord(n)+' term = A + '+(n-1)+VD, why:VD+' dono ka same hai, isliye same '+VD+'.'},
          {t:right+' &rarr; '+VA+' &minus; A = '+n, why:(n-1)+VD+' cancel ho gaya. Isiliye har position par difference wahi rahega.'}],
    say:'Term ek poori cheez hai — usko hamesha bracket me rakho.'};
}

/* ── 11 · FULL WORD PROBLEMS ───────────────────────────────── */
function gApply(lvl){
  const R='&#8377;';
  const kind=pick(lvl===1?['taxi','seats']:lvl===2?['rows','salary','taxi','seats']:['rows','salary','savings','taxi']);

  if(kind==='rows'){
    const n=rnd(8,18), d=-pick([2,3,4]), last=pick([3,5,7,4]);
    const a=last-d*(n-1);
    const seq=[a,a+d,a+2*d].map(x=>fmt(F(x))).join(', ')+', '+DOTS+', '+last;
    return {topic:'apply',kicker:'Word problem',
      lead:'Ek phoolon ki kyari me sabse upar wali row me '+a+' paudhe hain, agli me '+(a+d)+', usse agli me '+(a+2*d)+', aur aise hi. Sabse aakhri row me '+last+' paudhe hain. Kyari me kitni rows hain?',
      seq:seq, seqSmall:true,
      mode:lvl===1?'mcq':'type', ansLabel:String(n), ansTyped:String(n),
      opts:lvl===1?opts4([{lb:String(n),ok:true},
        {lb:String(n-1),ok:false,why:'Gaps gin liye, rows nahi. Plus one karo.'},
        {lb:String(n+1),ok:false,why:'Ek row zyada gin li.'},
        {lb:String(last),ok:false,why:'Ye aakhri row ke paudhe hain, rows ki ginti nahi.'},
        {lb:String(n+2),ok:false,why:'Do row zyada gin li.'},
        {lb:String(a),ok:false,why:'Ye pehli row ke paudhe hain, rows ki ginti nahi.'}]):null,
      work:[
        {t:'Given AP: '+seq, why:'Sabse pehle situation ko AP me likho.'},
        {t:VA+' = '+a+',&nbsp; '+VD+' = '+(a+d)+' &minus; '+a+' = '+fmt(F(d))+',&nbsp; l = '+last, why:'Rows kam ho rahi hain, isliye '+VD+' minus me hai.'},
        {t:'l = '+FORMULA+' &rarr; '+last+' = '+a+' + ('+VN+' &minus; 1)('+fmt(F(d))+')', why:'Rows hi terms hain.'},
        {t:VN+' = '+n, why:'Toh kyari me '+n+' rows hain.'}
      ],
      say:'Rows hi terms hain. Question ko AP me likh do, phir wahi purana formula.'};
  }

  if(kind==='salary'){
    const y0=pick([1995,1998,2004,2010]), s=pick([5000,6000,8000]), i=pick([200,250,300,500]);
    const n=rnd(7,16), t=s+i*(n-1);
    return {topic:'apply',kicker:'Word problem',
      lead:'Subba Rao ne '+y0+' me '+R+s+' annual salary par kaam shuru kiya, aur har saal '+R+i+' ka increment milta hai. Kis saal me unki salary '+R+t+' ho jayegi?',
      seq:[s,s+i,s+2*i].map(String).join(', ')+', '+DOTS+', '+t, seqSmall:true,
      mode:'type', ansLabel:String(y0+n-1), ansTyped:String(y0+n-1),
      work:[
        {t:'Salary har saal: '+s+', '+(s+i)+', '+(s+2*i)+', '+DOTS, why:'Pehle saal increment nahi milta — wahi '+VA+' hai.'},
        {t:VA+' = '+s+',&nbsp; '+VD+' = '+i+',&nbsp; a<sub>n</sub> = '+t, why:'Saal hi terms hain.'},
        {t:t+' = '+s+' + ('+VN+' &minus; 1)('+i+') &rarr; '+VN+' = '+n, why:'Toh '+n+'th saal me.'},
        {t:y0+' pehla saal hai &rarr; '+n+'th saal = '+y0+' + '+(n-1)+' = '+(y0+n-1), why:'Yahan bhi ek kam. '+y0+' khud pehla saal hai.'}
      ],
      say:'Pehla saal '+y0+' hai, isliye '+n+'th saal '+(y0+n)+' nahi — '+(y0+n-1)+'. Wahi n − 1.'};
  }

  if(kind==='savings'){
    const a=F(pick([500,400,600]),100), d=F(pick([175,125,150,225]),100);
    const n=rnd(7,14);
    const t=term(a,d,n);
    return {topic:'apply',kicker:'Word problem',
      lead:'Ramkali ne pehle hafte '+R+moneyStr(a)+' bachaye, aur uske baad har hafte '+R+moneyStr(d)+' zyada bachati gayi. Kis hafte me uski weekly saving '+R+moneyStr(t)+' ho jayegi?',
      seq:[1,2,3].map(i=>moneyStr(term(a,d,i))).join(', ')+', '+DOTS+', '+moneyStr(t), seqSmall:true,
      mode:'type', ansLabel:String(n), ansTyped:String(n),
      work:[
        {t:'Given AP: '+[1,2,3].map(i=>moneyStr(term(a,d,i))).join(', ')+', '+DOTS+', '+moneyStr(t), why:'Hafte hi terms hain.'},
        {t:VA+' = '+moneyStr(a)+',&nbsp; '+VD+' = '+moneyStr(d)+',&nbsp; l = '+moneyStr(t), why:'Paise ki tarah dekho — kaam aasan ho jata hai.'},
        {t:moneyStr(t)+' = '+moneyStr(a)+' + ('+VN+' &minus; 1)('+moneyStr(d)+')', why:'Wahi last term ka formula.'},
        {t:moneyStr(Fsub(t,a))+' = ('+VN+' &minus; 1)('+moneyStr(d)+') &rarr; '+VN+' &minus; 1 = '+(n-1)+' &rarr; '+VN+' = '+n, why:'Decimal se mat darna — rupaye aur paise samajh lo.'}
      ],
      say:'Decimal aaye toh paise ki tarah dekho. Rupaye alag, paise alag.'};
  }

  if(kind==='seats'){
    const f=pick([20,23,18,25]), k=pick([2,3,4]), r=rnd(6,20);
    const ans=f+k*(r-1);
    return {topic:'apply',kicker:'Word problem',
      lead:'Ek hall ki pehli row me '+f+' seats hain, aur har agli row me '+k+' seats zyada. '+ord(r)+' row me kitni seats hongi?',
      seq:[f,f+k,f+2*k].map(String).join(', ')+', '+DOTS, seqSmall:true,
      mode:lvl===1?'mcq':'type', ansLabel:String(ans), ansTyped:String(ans),
      opts:lvl===1?opts4([{lb:String(ans),ok:true},
        {lb:String(f+k*r),ok:false,why:ord(r)+' row me gaps '+(r-1)+' hote hain, '+r+' nahi.'},
        {lb:String(f+k*(r-2)),ok:false,why:'Ek gap kam.'},
        {lb:String(k*r),ok:false,why:'Pehli row ki seats add karna bhool gaye.'},
        {lb:String(f+k*(r+1)),ok:false,why:'Ek row aage nikal gaye.'},
        {lb:String(f*r),ok:false,why:'Pehli row ko row number se multiply kar diya.'}]):null,
      work:[
        {t:VA+' = '+f+',&nbsp; '+VD+' = '+k, why:'Pehli row hi pehla term hai.'},
        {t:'a<sub>'+r+'</sub> = '+f+' + ('+r+' &minus; 1)('+k+') = '+f+' + '+(k*(r-1)), why:r+' rows me gaps '+(r-1)+'.'},
        {t:'= '+ans+' seats', why:''}
      ],
      say:'Row number hi n hai. Pehli row me koi gap nahi hota.'};
  }

  const f=pick([15,20,25,18]), e=pick([8,10,6,12]), k=rnd(5,18);
  const ans=f+e*(k-1);
  return {topic:'apply',kicker:'Word problem',
    lead:'Taxi ka kiraya pehle kilometre ka '+R+f+' hai, aur uske baad har kilometre ka '+R+e+'. '+k+' km ka kiraya kitna hoga?',
    seq:[f,f+e,f+2*e].map(String).join(', ')+', '+DOTS, seqSmall:true,
    mode:lvl===1?'mcq':'type', ansLabel:String(ans), ansTyped:String(ans),
    opts:lvl===1?opts4([{lb:String(ans),ok:true},
      {lb:String(f+e*k),ok:false,why:'Pehla km '+R+f+' me hi aa gaya. Uske baad sirf '+(k-1)+' km ka extra lagta hai.'},
      {lb:String(e*k),ok:false,why:'Pehle km ka '+R+f+' add karna bhool gaye.'},
      {lb:String(f+e*(k-2)),ok:false,why:'Ek km kam gin liya.'},
      {lb:String(f*k),ok:false,why:'Pehle km ke rate ko km se multiply kar diya.'},
      {lb:String(f+e),ok:false,why:'Sirf ek extra km ka add kiya.'}]):null,
    work:[
      {t:'1 km &rarr; '+R+f+',&nbsp; 2 km &rarr; '+R+(f+e)+',&nbsp; 3 km &rarr; '+R+(f+2*e), why:'Pehle chhote numbers pe dekho.'},
      {t:VA+' = '+f+',&nbsp; '+VD+' = '+e, why:'Pehla km hi pehla term.'},
      {t:'a<sub>'+k+'</sub> = '+f+' + ('+k+' &minus; 1)('+e+') = '+R+ans, why:''}
    ],
    say:'Pehla km alag rate pe hai — wahi '+VA+' hai. Baaki har km '+VD+'.'};
}

/* ── 12 · TWO EQUATIONS (NCERT 5.2 Q18 shape) ──────────────── */
function gTwoEq(lvl){
  const a=nz(-15,12), d=nz(2,7);
  const p=pick([3,4,5]), q=p+4, r=p+2, s=q+2;
  const S1=(a+(p-1)*d)+(a+(q-1)*d);
  const S2=(a+(r-1)*d)+(a+(s-1)*d);
  const t3=[a,a+d,a+2*d].map(x=>fmt(F(x))).join(', ');
  const s1=fmt(F(S1)), s2=fmt(F(S2)), h1=fmt(F(S1/2)), h2=fmt(F(S2/2)), dv=fmt(F(d)), av=fmt(F(a));
  const list=[
    {lb:t3, ok:true},
    {lb:[a,a-d,a-2*d].map(x=>fmt(F(x))).join(', '), ok:false, why:VD+' ka sign ulta lag gaya.'},
    {lb:[a+d,a+2*d,a+3*d].map(x=>fmt(F(x))).join(', '), ok:false, why:'Pehla term chhod diya — ye doosre se shuru ho raha hai.'},
    {lb:[d,a,a+d].map(x=>fmt(F(x))).join(', '), ok:false, why:VA+' aur '+VD+' aapas me badal gaye.'}
  ];
  const lead='Ek AP ke '+ord(p)+' aur '+ord(q)+' term ka sum '+s1+' hai, aur '+ord(r)+' aur '+ord(s)+' term ka sum '+s2+' hai. Pehle teen terms kya honge?';
  return {
    topic:'twoeq', kicker:'Do equations',
    lead:lead,
    mode:'mcq', opts:opts4(list), ansLabel:t3, seqOpts:true,
    work:[
      {t:'('+VA+' + '+(p-1)+VD+') + ('+VA+' + '+(q-1)+VD+') = '+s1+' &rarr; 2'+VA+' + '+(p+q-2)+VD+' = '+s1,
       why:'Pehli baat ko equation banao.'},
      {t:VA+' + '+((p+q-2)/2)+VD+' = '+h1+'&nbsp; &nbsp;(i)', why:'2 common tha — simplest form me le aao.'},
      {t:'('+VA+' + '+(r-1)+VD+') + ('+VA+' + '+(s-1)+VD+') = '+s2+' &rarr; '+VA+' + '+((r+s-2)/2)+VD+' = '+h2+'&nbsp; &nbsp;(ii)',
       why:'Doosri baat se doosri equation.'},
      {t:'(ii) &minus; (i): '+(((r+s-2)/2)-((p+q-2)/2))+VD+' = '+fmt(F((S2-S1)/2))+' &rarr; '+VD+' = '+dv,
       why:'Ab ye seedha linear equations wala kaam hai — elimination ya substitution.'},
      {t:VD+' ko (i) me daalo &rarr; '+VA+' = '+av, why:''},
      {t:'Pehle teen terms: '+t3, why:'a, a + d, a + 2d.'}
    ],
    say:'Do baatein di hain toh do equations banenge. Yahan se aage wahi linear equation wala chapter hai.'
  };
}
