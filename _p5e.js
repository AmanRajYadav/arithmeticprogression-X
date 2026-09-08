/* ════════════════════════════════════════════════════════════════
   BOARD-ONLY SHAPES

   Two things that turn up in board papers but are in neither the
   NCERT exercises nor the usual reference books:

   1. CASE STUDIES (Section E, 4 marks). One scenario, three linked
      sub-questions, usually (i) is it an AP, (ii) an nth term or a
      sum, (iii) a harder sum with an internal choice. Built from the
      papers Aman shared: the multistorey building stairs and the
      foldable ladder.

   2. FIGURE PATTERNS from the chapter introduction — matchsticks,
      unit squares, dots. Some of these form an AP and some famously
      do not, which is exactly what makes them worth asking.
   ════════════════════════════════════════════════════════════════ */

/* ── figure patterns ───────────────────────────────────────── */
const FIG_FAMILIES=[
  { id:'sqrow', ap:true,
    txt:n=>'Matchsticks se ek line me squares banaye ja rahe hain. Ek square ke liye 4 matchstick, do ke liye 7, teen ke liye 10 — har naye square ke liye 3 aur.',
    seq:[4,7,10,13], a:4, d:3,
    note:'Pehle square ko 4 chahiye, uske baad har square sirf 3 maangta hai — ek side share ho jaati hai.' },
  { id:'trirow', ap:true,
    txt:n=>'Matchsticks se ek line me triangles banaye ja rahe hain. Ek triangle ke liye 3 matchstick, do ke liye 5, teen ke liye 7.',
    seq:[3,5,7,9], a:3, d:2,
    note:'Har naya triangle ek side share karta hai, isliye sirf 2 aur lagte hain.' },
  { id:'perim', ap:true,
    txt:n=>'Unit squares se badhte hue square banaye ja rahe hain — Fig (i) 1×1, Fig (ii) 2×2, Fig (iii) 3×3. Har figure ka perimeter dekho.',
    seq:[4,8,12,16], a:4, d:4,
    note:'Side 1, 2, 3 badh rahi hai toh perimeter 4, 8, 12 — har baar 4 zyada.' },
  { id:'dots', ap:true,
    txt:n=>'Har figure me dots ki ek extra row jud rahi hai. Fig (i) me 2 dots, Fig (ii) me 5, Fig (iii) me 8.',
    seq:[2,5,8,11], a:2, d:3,
    note:'Har figure me 3 dots aur jud rahe hain.' },
  { id:'unitsq', ap:false,
    txt:n=>'Har figure ek square hai jo unit squares se bana hai — Fig (i) 1×1, Fig (ii) 2×2, Fig (iii) 3×3. Har figure me kitne unit squares hain, wo dekho.',
    seq:[1,4,9,16], f:n=>n*n,
    note:'1, 4, 9, 16 — gaps 3, 5, 7. Har baar gap khud badh raha hai, isliye ye AP nahi hai.' },
  { id:'tri', ap:false,
    txt:n=>'Har figure me ek row aur jud rahi hai: Fig (i) me 1 circle, Fig (ii) me 1 + 2 = 3, Fig (iii) me 1 + 2 + 3 = 6.',
    seq:[1,3,6,10], f:n=>n*(n+1)/2,
    note:'Gaps 2, 3, 4 — badhte ja rahe hain. Ye triangular numbers hain, AP nahi.' }
];

function gFigure(lvl){
  const fam=pick(FIG_FAMILIES);
  const kind = fam.ap ? pick(lvl===1?['isap','count']:['isap','count','count','which'])
                      : pick(lvl>=3?['isap','sumTwo']:['isap','isap','count']);
  const shown=fam.seq.slice(0,3).join(', ')+', '+DOTS;
  const val=n=>fam.ap ? fam.a+(n-1)*fam.d : fam.f(n);

  if(kind==='isap'){
    const g1=fam.seq[1]-fam.seq[0], g2=fam.seq[2]-fam.seq[1];
    const list=[
      {lb:'Haan — AP hai, '+VD+' = '+g1, ok:!!fam.ap,
       why:fam.ap?'':'Pehla gap dekh ke haan bol diya. Doosra gap '+g2+' hai — equal nahi.'},
      {lb:'Haan — AP hai, '+VD+' = '+MINUS+g1, ok:false, why:'Sign ulta. Numbers badh rahe hain.'},
      {lb:'Nahi — gap khud badhta ja raha hai', ok:!fam.ap,
       why:fam.ap?'Gaps toh equal hain — '+g1+' aur '+g2+'. Nikal ke dekho.':''},
      {lb:'Nahi — har baar multiply ho raha hai, add nahi', ok:false, why:'Reason theek nahi hai.'}
    ];
    return {
      topic:'figure', kicker:'Figure pattern',
      lead:fam.txt()+' Kya ye numbers ek AP banate hain?',
      seq:shown, seqSmall:true,
      mode:'mcq', opts:opts4(list),
      ansLabel:fam.ap?('Haan — AP hai, d = '+g1):'Nahi — gap khud badhta ja raha hai',
      work:[
        {t:'Figures ke numbers: '+fam.seq.join(', ')+', '+DOTS, why:'Pehle figure ko numbers me badlo.'},
        {t:'a&#8322; &minus; a&#8321; = '+g1+',&nbsp; a&#8323; &minus; a&#8322; = '+g2, why:'Do gaps compare karo.'},
        {t:fam.ap?('Dono '+g1+' — ye AP hai'):'Gaps equal nahi — ye AP nahi hai', why:fam.note}
      ],
      say:'Figure dekh ke andaza mat lagao. Numbers likho, gaps find karo, phir bolo.'
    };
  }

  if(kind==='count'){
    const n=rnd(8,30);
    const ans=val(n);
    const wrong = fam.ap ? [
      {v:fam.a+n*fam.d, why:ord(n)+' figure me gaps '+(n-1)+' hote hain, '+n+' nahi.'},
      {v:fam.d*n, why:'Pehli figure wala hissa add karna bhool gaye.'},
      {v:fam.a+(n-2)*fam.d, why:'Ek gap kam le liya.'},
      {v:n, why:'Ye figure number hai, ginti nahi.'}
    ] : [
      {v:val(n+1), why:'Ek figure aage nikal gaye.'},
      {v:val(n-1), why:'Ek figure peeche reh gaye.'},
      {v:fam.seq[0]+(n-1)*(fam.seq[1]-fam.seq[0]), why:'AP maan ke chal diye — lekin yahan gap barabar nahi hai.'},
      {v:n, why:'Ye figure number hai, ginti nahi.'}
    ];
    return {
      topic:'figure', kicker:'Figure pattern',
      lead:fam.txt()+' '+ord(n)+' figure me kitne honge?',
      seq:shown, seqSmall:true,
      mode:lvl>=2?'type':'mcq',
      opts:lvl>=2?null:opts4([{lb:String(ans),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==ans&&w.v>0)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
      ansLabel:String(ans), ansTyped:String(ans),
      work: fam.ap ? [
        {t:'Numbers: '+fam.seq.join(', ')+', '+DOTS+' &rarr; '+VA+' = '+fam.a+', '+VD+' = '+fam.d, why:'Ye AP hai, toh formula chalega.'},
        {t:'a<sub>'+n+'</sub> = '+fam.a+' + ('+n+' &minus; 1)('+fam.d+') = '+ans, why:'Wahi n &minus; 1.'}
      ] : [
        {t:'Numbers: '+fam.seq.join(', ')+', '+DOTS+' — gaps '+(fam.seq[1]-fam.seq[0])+', '+(fam.seq[2]-fam.seq[1])+', barabar nahi', why:'Ye AP nahi hai, toh AP ka formula nahi lagega.'},
        {t:fam.id==='unitsq'?('Har figure n&times;n hai &rarr; nth figure me n&sup2; unit squares')
                            :('nth figure me 1 + 2 + '+DOTS+' + n = n(n+1)/2'), why:'Pattern ko seedha samjho.'},
        {t:''+n+' rakho &rarr; '+ans, why:''}
      ],
      say:fam.ap?'AP hai toh a + (n−1)d lagao. Bas pehle confirm karo ki AP hai.'
                :'AP nahi hai toh AP ka formula lagana galat hoga. Pattern khud samajhna padega.'
    };
  }

  if(kind==='which'){
    const n=rnd(9,28), target=val(n);
    const wrong=[
      {v:n-1, why:'Gaps gin liye, figure number nahi. Plus one karo.'},
      {v:n+1, why:'Ek figure aage nikal gaye.'},
      {v:target, why:'Ye ginti hai, figure number nahi.'},
      {v:n+2, why:'Do figure aage nikal gaye.'}
    ].filter(w=>w.v>0);
    return {
      topic:'figure', kicker:'Figure pattern',
      lead:fam.txt()+' Kaunsi figure me '+target+' honge?',
      seq:shown, seqSmall:true,
      mode:lvl>=2?'type':'mcq',
      opts:lvl>=2?null:opts4([{lb:String(n),ok:true}].concat(
        shuffle(wrong.filter(w=>w.v!==n)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
      ansLabel:String(n), ansTyped:String(n),
      work:[
        {t:VA+' = '+fam.a+', '+VD+' = '+fam.d+', a<sub>n</sub> = '+target, why:''},
        {t:''+target+' = '+fam.a+' + ('+VN+' &minus; 1)('+fam.d+')', why:'Formula ulta chalao.'},
        {t:VN+' &minus; 1 = '+(n-1)+' &rarr; '+VN+' = '+n, why:'Plus one karna mat bhoolna.'}
      ],
      say:'Ginti di hai, figure number poochha hai. Ye ulta sawaal hai.'
    };
  }

  /* the board question: nth and (n+2)th figure together */
  const n=rnd(5,14);
  const gap=2;
  const total=val(n)+val(n+gap);
  const wrong=[
    {v:n+gap, why:'Ye doosri figure ka number hai. Pehli wali poochhi gayi hai.'},
    {v:n+1, why:'Ek figure aage nikal gaye.'},
    {v:n-1, why:'Ek figure peeche reh gaye.'},
    {v:val(n), why:'Ye nth figure ke unit squares hain, '+VN+' nahi.'}
  ].filter(w=>w.v>0);
  const isSq=fam.id==='unitsq';
  return {
    topic:'figure', kicker:'Figure pattern',
    lead:fam.txt()+' Agar '+VN+'th figure aur ('+VN+' + '+gap+')th figure ke total mila kar '+total+' hain, toh '+VN+' kya hai?',
    seq:shown, seqSmall:true,
    mode:'mcq',
    opts:opts4([{lb:String(n),ok:true}].concat(
      shuffle(wrong.filter(w=>w.v!==n)).map(w=>({lb:String(w.v),ok:false,why:w.why})))),
    ansLabel:String(n),
    work:[
      {t:'nth figure me '+(isSq?'n&sup2;':'n(n+1)/2')+', aur (n + '+gap+')th figure me '+(isSq?'(n + '+gap+')&sup2;':'(n+'+gap+')(n+'+(gap+1)+')/2'),
       why:'Pattern ko formula me likho.'},
      {t:(isSq?('n&sup2; + (n + '+gap+')&sup2; = '+total):('n(n+1)/2 + (n+'+gap+')(n+'+(gap+1)+')/2 = '+total)),
       why:'"Sum ... is '+total+'" matlab dono add karke equal to.'},
      {t:(isSq?('2n&sup2; + '+(2*gap)+'n + '+(gap*gap)+' &minus; '+total+' = 0'):'Simplify karke quadratic banao'),
       why:'Quadratic ban gaya — chapter 4 wala splitting lagega.'},
      {t:VN+' = '+n+'&nbsp; (doosra root minus me aata hai, reject)', why:'Figure number minus me nahi ho sakta.'}
    ],
    say:'Ye board me aaya tha aur NCERT me hai hi nahi. Pattern ko formula banao, phir quadratic solve karo.'
  };
}

/* ── case studies ──────────────────────────────────────────── */
/* each returns {context, parts:[q, q, q]} — the parts share one scenario */

function csStairs(){
  const a=pick([10,12,8,14]);
  let d=pick([14,16,18,22]); if(d===a)d=a+6;
  const floors=pick([11,10,12]);
  const S=(floors*(2*a+(floors-1)*d))/2;
  const upto=pick([5,6,7]);
  const Sup=(upto*(2*a+(upto-1)*d))/2;
  const both=2*Sup;
  const seq=[a,a+d,a+2*d].map(String).join(', ')+', '+DOTS;
  const context=
    '<b>Multistorey building</b> — stilt parking ke saath ek building bani hai, jisme lift aur staircase dono hain. '+
    'Ground floor se first floor tak <b>'+a+'</b> stairs hain, first se second tak <b>'+(a+d)+'</b>, '+
    'second se third tak <b>'+(a+2*d)+'</b>, aur aise hi aage.';
  return {context:context, parts:[
    {
      topic:'casestudy', kicker:'Case study · (i)',
      lead:'Kya '+seq+' ek AP banate hain? Justify karo.',
      mode:'mcq', ansLabel:'Haan — d = '+d,
      opts:opts4([
        {lb:'Haan — AP hai, '+VD+' = '+d, ok:true},
        {lb:'Haan — AP hai, '+VD+' = '+a, ok:false, why:'Ye pehla term hai, gap nahi.'},
        {lb:'Nahi — gaps equal nahi hain', ok:false, why:'Nikal ke dekho: '+(a+d)+' &minus; '+a+' = '+d+', aur '+(a+2*d)+' &minus; '+(a+d)+' = '+d+'. Dono equal.'},
        {lb:'Haan — AP hai, '+VD+' = '+MINUS+d, ok:false, why:'Sign ulta. Stairs badh rahi hain.'},
        {lb:'Haan — AP hai, '+VD+' = '+(2*d), ok:false, why:'Ye do gap ek saath hain.'},
        {lb:'Nahi — har baar multiply ho raha hai', ok:false, why:'Add ho raha hai, multiply nahi — '+a+' me '+d+' add karke '+(a+d)+'.'}
      ]),
      work:[
        {t:'a&#8322; &minus; a&#8321; = '+(a+d)+' &minus; '+a+' = '+d, why:''},
        {t:'a&#8323; &minus; a&#8322; = '+(a+2*d)+' &minus; '+(a+d)+' = '+d, why:''},
        {t:'Dono equal &rarr; yes, this forms an AP with '+VD+' = '+d, why:'Exam me reason bhi likhna hota hai.'}
      ],
      say:'Case study ka pehla part hamesha aasan hota hai — poore 1 mark ke liye bas gaps check karo.'
    },
    {
      topic:'casestudy', kicker:'Case study · (ii)',
      lead:'Ground floor se '+ord(floors)+' floor tak kul kitni stairs hain?',
      seq:seq, seqSmall:true,
      mode:'type', ansLabel:String(S), ansTyped:String(S),
      work:[
        {t:VA+' = '+a+', '+VD+' = '+d+', '+VN+' = '+floors, why:'Har floor ek term hai.'},
        {t:'"Kul kitni stairs" matlab sum &rarr; '+VS+'<sub>'+floors+'</sub>', why:'Ek floor ki nahi, sabki milakar.'},
        {t:VS+'<sub>'+floors+'</sub> = '+floors+'/2 [2('+a+') + '+(floors-1)+'('+d+')] = '+S, why:''}
      ],
      say:'"Total" dikha toh sum. Yahi ek shabd term aur sum me farak karta hai.'
    },
    {
      topic:'casestudy', kicker:'Case study · (iii)',
      lead:'Ek aadmi har floor par ek-ek karke paani ka can pahunchata hai — ground se first floor jaata hai, wapas aata hai, phir second floor, phir wapas, aur aise hi. '+ord(upto)+' floor tak can pahunchane me wo kul kitni stairs chadha aur utra?',
      seq:seq, seqSmall:true,
      mode:'type', ansLabel:String(both), ansTyped:String(both),
      work:[
        {t:'Ek taraf ki stairs: '+VS+'<sub>'+upto+'</sub> = '+upto+'/2 [2('+a+') + '+(upto-1)+'('+d+')] = '+Sup,
         why:''+upto+' floor tak chadhne me itni stairs.'},
        {t:'Har baar wapas bhi aana hai &rarr; 2 &times; '+Sup+' = '+both, why:'Chadha aur utra — dono gino.'}
      ],
      say:'Sum nikal liya, ab 2 se multiply. Wahi ek step jahan sabke marks jaate hain.'
    }
  ]};
}

function csStairsBack(){
  const a=pick([10,12,15]);
  let d=pick([14,16,20]); if(d===a)d=a+5;
  const n=pick([5,6,4]);
  const total=2*((n*(2*a+(n-1)*d))/2);
  const context=
    '<b>Multistorey building</b> — ground floor se first floor tak <b>'+a+'</b> stairs hain, '+
    'first se second tak <b>'+(a+d)+'</b>, second se third tak <b>'+(a+2*d)+'</b>, aur aise hi aage. '+
    'Ek aadmi har floor par ek-ek can pahunchata hai — har baar upar jaata hai aur wapas neeche aata hai.';
  return {context:context, parts:[
    {
      topic:'casestudy', kicker:'Case study · (i)',
      lead:'Stairs ka common difference kya hai?',
      seq:[a,a+d,a+2*d].map(String).join(', ')+', '+DOTS, seqSmall:true,
      mode:'mcq', ansLabel:String(d),
      opts:opts4([
        {lb:String(d), ok:true},
        {lb:String(a), ok:false, why:'Ye pehla term hai.'},
        {lb:String(2*d), ok:false, why:'Ye do gap ek saath hain.'},
        {lb:MINUS+d, ok:false, why:'Sign ulta — stairs badh rahi hain.'},
        {lb:String(a+d), ok:false, why:'Ye doosra term hai, gap nahi.'},
        {lb:String(a+2*d), ok:false, why:'Ye teesra term hai.'}
      ]),
      work:[{t:VD+' = '+(a+d)+' &minus; '+a+' = '+d, why:'Baad wale me se pehla subtract karo.'},
            {t:'Check: '+(a+2*d)+' &minus; '+(a+d)+' = '+d, why:'Equal aaya — AP confirm.'}],
      say:'Har case study ka pehla part yahi hota hai. Free ka ek mark.'
    },
    {
      topic:'casestudy', kicker:'Case study · (ii)',
      lead:'Agle din wahi aadmi kul '+total+' stairs chadha aur utra. Wo kis floor tak can pahunchaya?',
      mode:'type', ansLabel:String(n), ansTyped:String(n),
      work:[
        {t:'Chadhna aur utarna dono &rarr; 2 &times; '+VS+'<sub>n</sub> = '+total, why:'Isliye ek taraf ka sum aadha hoga.'},
        {t:VS+'<sub>n</sub> = '+(total/2), why:'Ab ye normal sum ka question ban gaya.'},
        {t:''+(total/2)+' = '+VN+'/2 [2('+a+') + ('+VN+' &minus; 1)('+d+')]', why:''},
        {t:'Solve karo &rarr; '+VN+' = '+n+', matlab '+ord(n)+' floor tak', why:'Doosra root minus me aata hai, reject.'}
      ],
      say:'Ulta sawaal hai — sum diya hai, floor poochha hai. Pehle 2 se divide karo.'
    },
    {
      topic:'casestudy', kicker:'Case study · (iii)',
      lead:''+ord(n+2)+' floor tak jaane me kitni stairs chadhni padengi (sirf upar jaate hue)?',
      mode:'type',
      ansLabel:String(((n+2)*(2*a+(n+1)*d))/2), ansTyped:String(((n+2)*(2*a+(n+1)*d))/2),
      work:[
        {t:VA+' = '+a+', '+VD+' = '+d+', '+VN+' = '+(n+2), why:'Sirf upar jaana hai, wapas nahi.'},
        {t:VS+'<sub>'+(n+2)+'</sub> = '+(n+2)+'/2 [2('+a+') + '+(n+1)+'('+d+')] = '+(((n+2)*(2*a+(n+1)*d))/2), why:''}
      ],
      say:'Is baar sirf ek taraf. Question dhyan se padho — 2 se multiply nahi karna.'
    }
  ]};
}

function csLadder(){
  const steps=pick([10,8,12]);
  const h0=pick([40,35,45]);
  const dF=pick([6,5,8]), dE=pick([30,25,35]);
  const topF=h0+(steps-1)*dF, topE=h0+(steps-1)*dE;
  const k=pick([7,6,5]);
  const kth=h0+(k-1)*dE;
  const context=
    '<b>Foldable ladder</b> — is ladder me <b>'+steps+' steps</b> hain. Foldi hui position (Position I) me do lagatar steps ke beech ka distance <b>'+dF+' cm</b> hai, '+
    'aur khuli hui position (Position II) me ye distance <b>'+dE+' cm</b> ho jaata hai. Pehla step zameen se <b>'+h0+' cm</b> upar hai. '+
    'Steps ki heights, order me, ek AP banati hain.';
  return {context:context, parts:[
    {
      topic:'casestudy', kicker:'Case study · (i)',
      lead:'Position I me ladder ka AP kya hoga?',
      mode:'mcq', ansLabel:[0,1,2].map(i=>h0+i*dF).join(', ')+', …', seqOpts:true,
      opts:opts4([
        {lb:[0,1,2,3].map(i=>h0+i*dF).join(', ')+', '+DOTS, ok:true},
        {lb:[0,1,2,3].map(i=>h0+i*dE).join(', ')+', '+DOTS, ok:false, why:'Ye Position II hai — khuli hui ladder ka gap '+dE+' cm hai.'},
        {lb:[1,2,3,4].map(i=>i*dF).join(', ')+', '+DOTS, ok:false, why:'Pehla step zameen se '+h0+' cm upar hai — wahi '+VA+' hai.'},
        {lb:[0,1,2,3].map(i=>h0-i*dF).join(', ')+', '+DOTS, ok:false, why:'Heights upar ja rahi hain, neeche nahi.'},
        {lb:[0,1,2,3].map(i=>h0+i*2*dF).join(', ')+', '+DOTS, ok:false, why:'Har baar do gap add kar diye.'},
        {lb:[0,1,2,3].map(i=>dF+i*dF).join(', ')+', '+DOTS, ok:false, why:'Pehla step '+h0+' cm par hai — wahi '+VA+' hai.'}
      ]),
      work:[
        {t:'Pehla step '+h0+' cm par &rarr; '+VA+' = '+h0, why:'Zameen se pehli height.'},
        {t:'Har agla step '+dF+' cm upar &rarr; '+VD+' = '+dF, why:''},
        {t:'AP: '+[0,1,2,3].map(i=>h0+i*dF).join(', ')+', '+DOTS, why:VA+' se shuru karke '+VD+' add karte jao.'}
      ],
      say:'"AP likho" matlab pehle chaar terms likh do. '+VA+' aur '+VD+' pehchano, bas.'
    },
    {
      topic:'casestudy', kicker:'Case study · (ii)',
      lead:'Position II me poori khuli ladder ki height kitni hogi, yaani sabse upar wale step ki height?',
      mode:'type', ansLabel:String(topE), ansTyped:String(topE),
      work:[
        {t:VA+' = '+h0+', '+VD+' = '+dE+', '+VN+' = '+steps, why:'Khuli position me gap '+dE+' cm.'},
        {t:'a<sub>'+steps+'</sub> = '+h0+' + ('+steps+' &minus; 1)('+dE+') = '+h0+' + '+((steps-1)*dE)+' = '+topE+' cm',
         why:''+steps+' steps me gaps '+(steps-1)+' hote hain.'}
      ],
      say:'Yahan sum nahi — height poochhi hai, toh a<sub>n</sub>. Har step ki height add nahi karni.'
    },
    {
      topic:'casestudy', kicker:'Case study · (iii)',
      lead:'Agar ladder sirf '+ord(k)+' step tak kholi jaaye (Position II wale gap se), toh us step ki height kitni hogi?',
      mode:'type', ansLabel:String(kth), ansTyped:String(kth),
      work:[
        {t:VA+' = '+h0+', '+VD+' = '+dE, why:'Khuli position ka gap.'},
        {t:'a<sub>'+k+'</sub> = '+h0+' + ('+k+' &minus; 1)('+dE+') = '+kth+' cm', why:''+k+' steps me gaps '+(k-1)+'.'}
      ],
      say:'Wahi n − 1. Case study me bhi formula wahi rehta hai.'
    }
  ]};
}

function csSeats(){
  const f=pick([20,23,18]), k=pick([2,3,4]);
  const rows=pick([12,15,10]);
  const S=(rows*(2*f+(rows-1)*k))/2;
  const r=pick([8,9,7]);
  const context=
    '<b>Auditorium</b> — ek hall me pehli row me <b>'+f+' seats</b> hain, doosri row me <b>'+(f+k)+'</b>, '+
    'teesri row me <b>'+(f+2*k)+'</b>, aur aise hi peeche ki har row me <b>'+k+' seats zyada</b>. Hall me kul <b>'+rows+' rows</b> hain.';
  return {context:context, parts:[
    {
      topic:'casestudy', kicker:'Case study · (i)',
      lead:'Seats ka AP ka pehla term aur common difference kya hai?',
      mode:'mcq', ansLabel:'a = '+f+', d = '+k,
      opts:opts4([
        {lb:VA+' = '+f+', '+VD+' = '+k, ok:true},
        {lb:VA+' = '+k+', '+VD+' = '+f, ok:false, why:VA+' aur '+VD+' aapas me badal gaye.'},
        {lb:VA+' = '+(f+k)+', '+VD+' = '+k, ok:false, why:'Ye doosri row hai. Pehli row hi '+VA+' hai.'},
        {lb:VA+' = '+f+', '+VD+' = '+rows, ok:false, why:'Ye rows ki ginti hai, gap nahi.'}
      ]),
      work:[{t:'Pehli row = '+VA+' = '+f, why:''},
            {t:VD+' = '+(f+k)+' &minus; '+f+' = '+k, why:'Har row me utni hi seats zyada.'}],
      say:'Har case study yahin se shuru hoti hai — '+VA+' aur '+VD+' pakdo.'
    },
    {
      topic:'casestudy', kicker:'Case study · (ii)',
      lead:''+ord(r)+' row me kitni seats hongi?',
      mode:'type', ansLabel:String(f+(r-1)*k), ansTyped:String(f+(r-1)*k),
      work:[
        {t:VA+' = '+f+', '+VD+' = '+k+', '+VN+' = '+r, why:'Ek row ki baat hai, toh a<sub>n</sub> — sum nahi.'},
        {t:'a<sub>'+r+'</sub> = '+f+' + ('+r+' &minus; 1)('+k+')', why:''+r+' rows me gaps '+(r-1)+' hote hain.'},
        {t:'= '+f+' + '+((r-1)*k)+' = '+(f+(r-1)*k)+' seats', why:''}
      ],
      say:'Ek row = ek term. Saari rows = sum. Farak samajh lo.'
    },
    {
      topic:'casestudy', kicker:'Case study · (iii)',
      lead:'Poore hall me kul kitni seats hain?',
      mode:'type', ansLabel:String(S), ansTyped:String(S),
      work:[
        {t:'"Kul kitni" matlab saari rows milakar &rarr; '+VS+'<sub>'+rows+'</sub>', why:''},
        {t:VS+'<sub>'+rows+'</sub> = '+rows+'/2 [2('+f+') + '+(rows-1)+'('+k+')] = '+S, why:''}
      ],
      say:'Ek hi case study me (ii) me a<sub>n</sub> aur (iii) me '+VS+'<sub>n</sub> — yahi to pehchan hai.'
    }
  ]};
}

function csSavings(){
  const a=pick([100,150,200]);
  let d=pick([50,25,75]); if(a===2*d||a===d)d=pick([25,75].filter(x=>x!==d))||25;
  const yrs=pick([21,15,18]);
  const S=(yrs*(2*a+(yrs-1)*d))/2;
  const k=pick([10,12,8]);
  const context=
    '<b>Money box</b> — Shakila ne apni beti ke pehle birthday par money box me <b>&#8377;'+a+'</b> daale, '+
    'doosre birthday par <b>&#8377;'+(a+d)+'</b>, teesre par <b>&#8377;'+(a+2*d)+'</b>, aur har saal <b>&#8377;'+d+'</b> zyada daalti gayi.';
  return {context:context, parts:[
    {
      topic:'casestudy', kicker:'Case study · (i)',
      lead:'Har saal daale gaye paise ek AP banate hain. Uska '+VD+' kya hai?',
      seq:[a,a+d,a+2*d].map(String).join(', ')+', '+DOTS, seqSmall:true,
      mode:'mcq', ansLabel:String(d),
      opts:opts4([
        {lb:String(d), ok:true},
        {lb:String(a), ok:false, why:'Ye pehle saal ka amount hai, gap nahi.'},
        {lb:String(a+d), ok:false, why:'Ye doosra term hai.'},
        {lb:String(2*d), ok:false, why:'Ye do saal ka gap hai.'},
        {lb:String(a+2*d), ok:false, why:'Ye teesra term hai.'},
        {lb:MINUS+d, ok:false, why:'Sign ulta — paise badh rahe hain.'}
      ]),
      work:[
        {t:VD+' = a&#8322; &minus; a&#8321; = '+(a+d)+' &minus; '+a+' = '+d, why:'Baad wale me se pehla subtract karo.'},
        {t:'Check: a&#8323; &minus; a&#8322; = '+(a+2*d)+' &minus; '+(a+d)+' = '+d, why:'Equal aaya — AP confirm.'}
      ],
      say:'Pehla part hamesha ek mark ka aur hamesha aasan.'
    },
    {
      topic:'casestudy', kicker:'Case study · (ii)',
      lead:''+ord(k)+' birthday par usne kitne paise daale?',
      mode:'type', ansLabel:String(a+(k-1)*d), ansTyped:String(a+(k-1)*d),
      work:[
        {t:VA+' = '+a+', '+VD+' = '+d+', '+VN+' = '+k, why:'Us ek saal ki baat hai, toh a<sub>n</sub>.'},
        {t:'a<sub>'+k+'</sub> = '+a+' + ('+k+' &minus; 1)('+d+') = '+a+' + '+((k-1)*d)+' = &#8377;'+(a+(k-1)*d), why:''}
      ],
      say:'"Us saal kitne daale" = ek term. "Kul kitne" = sum.'
    },
    {
      topic:'casestudy', kicker:'Case study · (iii)',
      lead:''+ord(yrs)+' birthday tak money box me kul kitne paise jama ho gaye?',
      mode:'type', ansLabel:String(S), ansTyped:String(S),
      work:[
        {t:VA+' = '+a+', '+VD+' = '+d+', '+VN+' = '+yrs, why:''},
        {t:VS+'<sub>'+yrs+'</sub> = '+yrs+'/2 [2('+a+') + '+(yrs-1)+'('+d+')] = '+S, why:'Saare saal milakar.'}
      ],
      say:'Ye bilkul wahi question hai jisse NCERT ne sum ka poora formula shuru kiya tha.'
    }
  ]};
}

const CASE_STUDIES=[csStairs, csStairsBack, csLadder, csSeats, csSavings];

/* flatten a case study into consecutive questions that share one scenario */
function buildCaseRun(count){
  const out=[];
  const used=new Set();
  let guard=0;
  while(out.length<count && guard++<40){
    let fn=pick(CASE_STUDIES);
    if(used.has(fn)&&used.size<CASE_STUDIES.length)continue;
    used.add(fn);
    const cs=fn();
    cs.parts.forEach((q,i)=>{
      q.context=cs.context;
      q.caseFirst=(i===0);
      out.push(q);
    });
  }
  return out.slice(0, Math.max(3, Math.round(count/3)*3));
}
