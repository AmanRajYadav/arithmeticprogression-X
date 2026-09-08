/* ════════════════════════════════════════════════════════════════
   LESSONS — the class, in the teacher's own voice.
   Every analogy here was used in the room: the staircase, the
   cheat code, paisa, the chessboard rice, "chhote level pe le aao".
   Each lesson ends with three freshly generated check questions,
   because learning without immediate practice does not stick.
   ════════════════════════════════════════════════════════════════ */

const LESSONS={
  pattern:[
    { id:'p1', title:'Pattern hi poora chapter hai', checks:['isap','isap','isap'], lvl:1,
      cards:[
        '<span class="eyebrow">Shuruaat</span><h2>Kuch numbers batate hain, aage kya aayega</h2>'+
        '<p>Do list dekho.</p>'+
        '<div class="box"><div class="seq">4, 1, 5, 4, 3, 2, 9, …</div><div class="cap">Agla number batao</div></div>'+
        '<div class="box"><div class="seq">2, 4, 6, 8, 10, …</div><div class="cap">Ab batao</div></div>'+
        '<p>Pehli wali me tum guess kar sakte ho, <strong>pakka nahi bata sakte</strong>. Maine apne mann se likhi hai. Doosri wali me tum sure ho — kyunki wahan ek <strong>pattern</strong> hai.</p>'+
        '<div class="say">Arithmetic hai hi kya? Bas pattern.</div>',

        '<span class="eyebrow">Definition</span><h2>Gap equal = AP</h2>'+
        '<p>Aise numbers jo is tarah aage badhte hain ki har baar <strong>utna hi add ho raha ho</strong> (ya utna hi subtract ho raha ho) — unhe <strong>Arithmetic Progression</strong> kehte hain. Short me AP.</p>'+
        '<div class="box"><div class="seq"><span class="hi">13</span>, 39, 65, 91, …</div>'+
        '<div class="cap">Har baar <span class="gap">+26</span> — gap equal hai, toh ye AP hai</div></div>'+
        '<div class="box"><div class="seq">2, 4, 8, 16, …</div>'+
        '<div class="cap">Yahan har baar <b>multiply</b> ho raha hai, add nahi ho raha — ye AP nahi hai</div></div>'+
        '<div class="say">Sabse important cheez ek hi hai — gap equal hona chahiye.</div>',

        '<span class="eyebrow">Kyun zaroori hai</span><h2>Cheat code wali baat</h2>'+
        '<p>Video game me cheat code daalte ho? Ek game ka cheat code doosre game me chalta hai kya?</p>'+
        '<p><strong>Nahi.</strong> Bilkul waise hi — AP ke saare formule sirf AP par chalenge. Isliye sabse pehla kaam hamesha yahi hota hai: <strong>pehchano ki AP hai bhi ya nahi</strong>.</p>'+
        '<div class="say">AP hai, tabhi AP ka rule lagega. Warna sab galat.</div>',

        '<span class="eyebrow">Check karne ka tarika</span><h2>Do gap find karo, compare karo</h2>'+
        '<p>Koi bhi term pakdo aur uske <strong>pichle wale</strong> ko subtract kar do:</p>'+
        '<div class="box"><div class="big">a<sub>2</sub> &minus; a<sub>1</sub> &nbsp;aur&nbsp; a<sub>3</sub> &minus; a<sub>2</sub></div>'+
        '<div class="cap">Equal aaye toh AP hai. Nahi aaye toh nahi hai.</div></div>'+
        '<p>Aur agar paanch se zyada terms likhe hain — toh <strong>a<sub>4</sub> &minus; a<sub>3</sub> bhi</strong> check kar lena. Kai baar shuru me pattern chalta hai aur beech me achanak badal jaata hai.</p>'+
        '<div class="say">Baad wale me se pehla subtract karna hai. Ulta karoge toh sign ulta aa jayega.</div>'
      ]},

    { id:'p2', title:'a aur d — poore chapter ki do cheezein', checks:['findd','findad','findd'], lvl:1,
      cards:[
        '<span class="eyebrow">Naam</span><h2>Pehla term <i class="va">a</i>, gap <i class="vd">d</i></h2>'+
        '<p>Series ka jo sabse pehla term hota hai, use <strong>first term</strong> kehte hain aur <i class="va">a</i> se likhte hain.</p>'+
        '<p>Har do terms ke beech ka gap — use <strong>common difference</strong> kehte hain aur <i class="vd">d</i> se likhte hain.</p>'+
        '<div class="box"><div class="seq"><span class="hi">13</span>, 39, 65, 91, …</div>'+
        '<div class="cap"><i class="va">a</i> = 13 &nbsp;·&nbsp; <i class="vd">d</i> = 39 &minus; 13 = 26</div></div>'+
        '<div class="say">Poore chapter me sabse zyada importance inhi do ki hai — <i class="va">a</i> aur <i class="vd">d</i>.</div>',

        '<span class="eyebrow">Formula</span><h2>d find karne ka rule</h2>'+
        '<div class="box"><div class="big"><i class="vd">d</i> = a<sub>2</sub> &minus; a<sub>1</sub></div>'+
        '<div class="cap">ya a<sub>3</sub> &minus; a<sub>2</sub>, ya a<sub>5</sub> &minus; a<sub>4</sub> — koi bhi term, minus uska pichla</div></div>'+
        '<p>Sabse common galti yahi hai: log <i class="va">a</i><sub>1</sub> &minus; a<sub>2</sub> kar dete hain aur answer ka sign ulta aa jata hai.</p>'+
        '<div class="say">Ye silly mistake nahi hai. Ye important hai — isi par ek poora marks jaata hai.</div>',

        '<span class="eyebrow">d har tarah ka ho sakta hai</span><h2>Minus, zero, fraction — sab chalta hai</h2>'+
        '<ul>'+
        '<li><strong>Positive:</strong> 3, 7, 11, 15 — <i class="vd">d</i> = 4</li>'+
        '<li><strong>Negative:</strong> 23, 21, 19, 17 — <i class="vd">d</i> = &minus;2</li>'+
        '<li><strong>Zero:</strong> &minus;2, &minus;2, &minus;2, &minus;2 — <i class="vd">d</i> = 0, aur haan, <strong>ye bhi AP hai</strong></li>'+
        '<li><strong>Fraction:</strong> 1/9, 4/9, 7/9 — <i class="vd">d</i> = 3/9 = 1/3</li>'+
        '<li><strong>Decimal:</strong> 5, 6.75, 8.50 — <i class="vd">d</i> = 1.75</li>'+
        '</ul>'+
        '<div class="say">Decimal aaye toh paise ki tarah dekho. Rupaye alag, paise alag — kaam aasan ho jata hai.</div>',

        '<span class="eyebrow">Dhokha dene wale</span><h2>Ye AP nahi hain</h2>'+
        '<div class="box"><div class="seq">0.2, 0.22, 0.222, …</div>'+
        '<div class="cap">Dekhne me pattern lagta hai. Lekin 0.02 aur 0.002 ek cheez nahi hai — gaps alag hain.</div></div>'+
        '<div class="box"><div class="seq">1&sup2;, 3&sup2;, 5&sup2;, 7&sup2;</div>'+
        '<div class="cap">Andar odd numbers hain, par value 1, 9, 25, 49 — gaps 8, 16, 24. Equal nahi.</div></div>'+
        '<div class="box"><div class="seq">a, a&sup2;, a&sup3;, a&#8308;</div>'+
        '<div class="cap">a&sup2; me se a subtract hi nahi kar sakte — jaise x&sup2; me se x subtract nahi kar sakte.</div></div>'+
        '<p>Lekin <strong>a, 2a, 3a, 4a</strong> — ye <strong>AP hai</strong>, <i class="vd">d</i> = a. Aur <strong>3, 3+&radic;2, 3+2&radic;2</strong> bhi AP hai, <i class="vd">d</i> = &radic;2.</p>'+
        '<div class="say">Value find karke dekho. Aankh se decide mat karo — wo illusion ho sakta hai.</div>'
      ]},

    { id:'p3', title:'a aur d se poori AP banao', checks:['build','build','next'], lvl:1,
      cards:[
        '<span class="eyebrow">Ulta kaam</span><h2>Agar a aur d pata hai, AP bana sakte ho?</h2>'+
        '<p>Haan. Bas <strong>har term me <i class="vd">d</i> add karte jao</strong>.</p>'+
        '<div class="box"><div class="cap"><i class="va">a</i> = 10, <i class="vd">d</i> = 10</div>'+
        '<div class="seq">10, 20, 30, 40, …</div></div>'+
        '<p>Sirf pehle term me nahi — <strong>har</strong> term me.</p>'+
        '<div class="say">Duniya ka koi bhi AP is shakal me likha ja sakta hai: <i class="va">a</i>, <i class="va">a</i>+<i class="vd">d</i>, <i class="va">a</i>+2<i class="vd">d</i>, <i class="va">a</i>+3<i class="vd">d</i>, …</div>',

        '<span class="eyebrow">Minus aur fraction</span><h2>Sign ka dhyan rakhna</h2>'+
        '<p><i class="va">a</i> = &minus;1.25, <i class="vd">d</i> = &minus;0.25:</p>'+
        '<div class="box"><div class="seq">&minus;1.25, &minus;1.50, &minus;1.75, &minus;2.00</div>'+
        '<div class="cap">Dono minus me hain, toh aage bhi minus hi rahega — aur badhta jaayega</div></div>'+
        '<p><i class="va">a</i> = &minus;1, <i class="vd">d</i> = 1/2:</p>'+
        '<div class="box"><div class="seq">&minus;1, &minus;1/2, 0, 1/2, 1</div>'+
        '<div class="cap">Half aur half milke poora ban jaata hai</div></div>'+
        '<div class="say">MCQ me ye seedha poochha jaata hai. Aur easy wale nahi aate — hard wale hi aate hain.</div>',

        '<span class="eyebrow">Do galtiyan</span><h2>Jaal kahan hai</h2>'+
        '<ul>'+
        '<li><strong>Multiply kar dena.</strong> <i class="va">a</i>=2, <i class="vd">d</i>=3 par 2, 6, 18, 54 likh dena. Wo GP hai, AP nahi.</li>'+
        '<li><strong>Sirf ek baar add karna.</strong> 2, 5, 5, 5 likh dena. <i class="vd">d</i> har term me add hota hai.</li>'+
        '</ul>'+
        '<div class="say">Galti hona achhi baat hai — bas wahi galti dobara na ho.</div>'
      ]},

    { id:'p4', title:'Situation ko AP me badlo', checks:['situation','situation','situation'], lvl:1,
      cards:[
        '<span class="eyebrow">Pehla kaam</span><h2>Question padho, numbers likho</h2>'+
        '<p><em>"Taxi ka kiraya pehle km ka &#8377;15, uske baad har km ka &#8377;8."</em></p>'+
        '<p>1 km &rarr; 15. 2 km &rarr; 23. 3 km &rarr; 31.</p>'+
        '<div class="box"><div class="seq">15, 23, 31, 39, …</div>'+
        '<div class="cap">Gap 8 ka — equal. Ye AP hai.</div></div>'+
        '<div class="say">Situation ko pehle numbers me likho. Uske baad wahi purana check.</div>',

        '<span class="eyebrow">Jo AP nahi hain</span><h2>Jahan har baar multiply hota hai</h2>'+
        '<ul>'+
        '<li><strong>Vacuum pump</strong> jo har baar bachi hui hawa ka 1/4 nikal de — har baar alag amount nikalta hai</li>'+
        '<li><strong>Compound interest</strong> — pehle saal &#8377;800 byaaj, doosre saal &#8377;864. Byaaj par bhi byaaj lagta hai</li>'+
        '<li><strong>Bacteria</strong> jo har ghante double ho</li>'+
        '</ul>'+
        '<p>Lekin <strong>simple interest</strong> AP hai — kyunki wo hamesha original amount par lagta hai, toh har saal utna hi add hota hai.</p>',

        '<span class="eyebrow">Kahani</span><h2>Chess board aur chawal ke daane</h2>'+
        '<p>Ek bhikhari ne raja se kaha — pehle khaane me ek daana, agle me double, agle me double. 64 khaane.</p>'+
        '<p>Raja hasa. 64ve khaane me 2<sup>63</sup> daane aate hain — <strong>19 digits ka number</strong>. Utne paise duniya me hain hi nahi.</p>'+
        '<div class="say">Ye AP nahi tha. AP equal chalta hai — ye chhalaang lagata hai. Isi ko compounding kehte hain.</div>',

        '<span class="eyebrow">Exam</span><h2>Reason bhi likhna hota hai</h2>'+
        '<p>"Why?" bhi poochha jaata hai. Toh answer aisa dikhna chahiye:</p>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14px;line-height:1.7">'+
        '15, 23, 31, 39, …<br>Yes, this forms an AP<br>because we have a common difference, that is 8</div></div>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14px;line-height:1.7">'+
        'This does not form an AP<br>because we do not have a common difference</div></div>'
      ]},

    { id:'p5', title:'Figure ka pattern', checks:['figure','figure','figure'], lvl:1,
      cards:[
        '<span class="eyebrow">Board me aata hai</span><h2>Figure ko numbers me badlo</h2>'+
        '<p>Board paper me aisa question aata hai jo NCERT ki exercise me hai hi nahi — figures ki ek series di hoti hai, aur poochha jaata hai agli figure me kitne honge.</p>'+
        '<p>Tarika ek hi hai: <strong>figures ko ginti me badlo</strong>, phir dekho AP hai ya nahi.</p>'+
        '<div class="say">Figure dekh ke andaza mat lagao. Pehle numbers likho.</div>',

        '<span class="eyebrow">Jo AP hain</span><h2>Matchstick wale</h2>'+
        '<p>Ek line me squares banao. Pehle square ke liye 4 matchstick. Uske baad har square ko sirf <strong>3</strong> chahiye — ek side toh pehle se lagi hui hai.</p>'+
        '<div class="box"><div class="seq">4, 7, 10, 13, …</div>'+
        '<div class="cap"><i class="va">a</i> = 4, <i class="vd">d</i> = 3 — ye AP hai</div></div>'+
        '<p>Triangles me: 3, 5, 7, 9 — <i class="vd">d</i> = 2. Perimeter me: 4, 8, 12, 16 — <i class="vd">d</i> = 4.</p>',

        '<span class="eyebrow">Jo AP nahi hain</span><h2>Unit squares wala jaal</h2>'+
        '<p>Fig (i) ek 1×1 square, Fig (ii) 2×2, Fig (iii) 3×3. Har figure me kitne unit squares?</p>'+
        '<div class="box"><div class="seq">1, 4, 9, 16, …</div>'+
        '<div class="cap">Gaps 3, 5, 7 — barabar nahi. <strong>Ye AP nahi hai</strong></div></div>'+
        '<p>Yahan nth figure me <strong>n²</strong> unit squares hote hain. AP ka formula lagaoge toh answer galat aayega.</p>'+
        '<div class="say">AP ka rule sirf AP pe chalega — wahi cheat code wali baat.</div>',

        '<span class="eyebrow">Asli board question</span><h2>Do figures milakar</h2>'+
        '<p><em>"nth figure aur (n + 2)th figure ke unit squares ka sum 290 hai. n find karo."</em></p>'+
        '<div class="box"><div class="seq">'+
        'n² + (n + 2)² = 290<br>'+
        'n² + n² + 4n + 4 = 290<br>'+
        '2n² + 4n − 286 = 0<br>'+
        'n² + 2n − 143 = 0<br>'+
        '(n + 13)(n − 11) = 0</div>'+
        '<div class="cap">n = 11 &nbsp;·&nbsp; n = −13 reject, figure number minus me nahi hota</div></div>'+
        '<div class="say">Do root aayein toh jo possible nahi hai use reject karo. Wo reject karna hi asli answer hai.</div>'
      ]}
  ],

  formula:[
    { id:'f1', title:'Sidhi wala rule: a + (n − 1)d', checks:['symb','nth','nth'], lvl:1,
      cards:[
        '<span class="eyebrow">Pehle sidhi</span><h2>Aath step, saat gap</h2>'+
        '<p>Ek sidhi banao. Aath steps hain. Ab batao — <strong>gap kitne hain?</strong></p>'+
        '<div class="box"><div class="big">8 steps &rarr; 7 gaps</div>'+
        '<div class="cap">Gaps hamesha steps se ek kam hote hain</div></div>'+
        '<p>Ye cheez yaad rakhna. Poora chapter isi par khada hai.</p>'+
        '<div class="say">Ye choti si baat hai. Aur isi ek baat par sabse zyada marks kat‑te hain.</div>',

        '<span class="eyebrow">Khud banate hain</span><h2>Formula rata nahi rahe — bana rahe hain</h2>'+
        '<p>Pehla term <i class="va">a</i> hai. Har term me <i class="vd">d</i> add hota hai. Toh:</p>'+
        '<div class="box"><div class="seq">'+
        'a<sub>1</sub> = <i class="va">a</i><br>'+
        'a<sub>2</sub> = <i class="va">a</i> + <i class="vd">d</i><br>'+
        'a<sub>3</sub> = <i class="va">a</i> + 2<i class="vd">d</i><br>'+
        'a<sub>4</sub> = <i class="va">a</i> + 3<i class="vd">d</i></div>'+
        '<div class="cap">Dekha? Har baar <i class="vd">d</i> ka number position se ek kam hai</div></div>'+
        '<div class="box"><div class="big">a<sub>n</sub> = <i class="va">a</i> + (<i class="vn">n</i> &minus; 1)<i class="vd">d</i></div>'+
        '<div class="cap">Bas. Yahi poora chapter hai.</div></div>',

        '<span class="eyebrow">Notation</span><h2>a<sub>n</sub> ka matlab</h2>'+
        '<p>15th term ko <strong>a<sub>15</sub></strong> likhte hain. 100th term ko a<sub>100</sub>. rth term ko bas <strong>a<sub>r</sub></strong> — a<sub>r</sub>th nahi.</p>'+
        '<p>Aur agar koi kehta hai <em>"is AP ka 15th term 2 hai"</em>, toh mathematically wo aisa likha jaayega:</p>'+
        '<div class="box"><div class="big">a<sub>15</sub> = 2 &nbsp;&rarr;&nbsp; <i class="va">a</i> + 14<i class="vd">d</i> = 2</div></div>'+
        '<div class="say">"is" dikhe toh equal to laga do. Aadha question wahin khatam ho jaata hai.</div>',

        '<span class="eyebrow">Laga ke dekho</span><h2>89th term find karna hai?</h2>'+
        '<div class="box"><div class="seq">13, 39, 65, 91, …</div>'+
        '<div class="cap"><i class="va">a</i> = 13, <i class="vd">d</i> = 26</div></div>'+
        '<div class="box"><div class="seq">a<sub>89</sub> = <i class="va">a</i> + 88<i class="vd">d</i><br>= 13 + 88 &times; 26<br>= 13 + 2288 = 2301</div></div>'+
        '<p>89 nahi — <strong>88</strong>. Ek kam. Hamesha.</p>'+
        '<div class="say">Copy pen ki bhi zarurat nahi. Ek second me aana chahiye.</div>',

        '<span class="eyebrow">Last term</span><h2>l ka formula alag nahi hai</h2>'+
        '<p>Last term ko <strong>l</strong> likhte hain. Uska formula bhi wahi hai — kyunki last term bhi to ek nth term hi hai, bas aakhri wala.</p>'+
        '<div class="box"><div class="big">l = <i class="va">a</i> + (<i class="vn">n</i> &minus; 1)<i class="vd">d</i></div></div>'+
        '<div class="say">Do formule yaad karne ki zarurat nahi. Ek hi hai.</div>'
      ]},

    { id:'f2', title:'Position find karna — n', checks:['findn','findn','findn'], lvl:1,
      cards:[
        '<span class="eyebrow">Ulta sawaal</span><h2>Kaunsa term hai wo?</h2>'+
        '<p>Ab tak position se value nikaal rahe the. Ab value di hai, <strong>position find karni hai</strong>.</p>'+
        '<p>Formula wahi hai. Bas ab <i class="vn">n</i> unknown hai, aur usko akela karna hai.</p>'+
        '<div class="box"><div class="seq">1, 5, 9, …, 305</div>'+
        '<div class="cap">Isme kitne terms hain?</div></div>'+
        '<div class="box"><div class="seq">305 = 1 + (<i class="vn">n</i> &minus; 1)4<br>304 = 4<i class="vn">n</i> &minus; 4<br>308 = 4<i class="vn">n</i><br><i class="vn">n</i> = 77</div></div>',

        '<span class="eyebrow">Sabse badi galti</span><h2>Plus one bhoolna</h2>'+
        '<p>Solve karte karte tumhare paas <i class="vn">n</i> &minus; 1 = 76 aata hai. Bahut log yahi likh dete hain — 76.</p>'+
        '<p><strong>76 gaps hain. Terms 77 hain.</strong> Wahi purani sidhi.</p>'+
        '<div class="say">Gap aur step ka farak — ye poore chapter ka dil hai.</div>',

        '<span class="eyebrow">Zero wala</span><h2>Kaunsa term zero hai?</h2>'+
        '<p>Same cheez, bas value 0 rakh do.</p>'+
        '<div class="box"><div class="seq">27, 24, 21, …<br>0 = 27 + (<i class="vn">n</i> &minus; 1)(&minus;3)<br><i class="vn">n</i> = 10</div>'+
        '<div class="cap">Answer "10th term" likhna — sirf 10 nahi. Wo position hai.</div></div>',

        '<span class="eyebrow">Trap</span><h2>Kya har number series me aayega?</h2>'+
        '<p>Nahi. Agar solve karne par <i class="vn">n</i> <strong>whole number nahi</strong> aata, toh wo number us AP ka term hai hi nahi.</p>'+
        '<div class="box"><div class="big"><i class="vn">n</i> = 7.5 &nbsp;&rarr;&nbsp; term nahi hai</div>'+
        '<div class="cap">Koi 7.5th step nahi hota. Position hamesha ginti ka number hai.</div></div>'+
        '<div class="say">Exam me ye do marks ka question hai, aur bahut log fas jaate hain.</div>'
      ]},

    { id:'f3', title:'Middle term — 3 marks, pakka aata hai', checks:['mid','mid','mid'], lvl:1,
      cards:[
        '<span class="eyebrow">Insight</span><h2>Kitne middle term hote hain?</h2>'+
        '<p>Chhote level pe le aao. Chaar terms likho: 1, 2, 3, 4. Beech me kaun hai?</p>'+
        '<div class="box"><div class="big">2 aur 3</div><div class="cap">Even number of terms &rarr; <strong>do</strong> middle terms</div></div>'+
        '<p>Ab paanch likho: 1, 2, 3, 4, 5. Beech me?</p>'+
        '<div class="box"><div class="big">3</div><div class="cap">Odd number of terms &rarr; <strong>ek</strong> middle term</div></div>'+
        '<div class="say">Jab koi baat samajh na aaye, use chhote level pe le aao. 100 terms me confuse ho rahe ho? 10 le lo.</div>',

        '<span class="eyebrow">Position ka formula</span><h2>Khud dikh jaata hai</h2>'+
        '<div class="box"><div class="big"><i class="vn">n</i> odd &rarr; (<i class="vn">n</i> + 1)/2 waala term</div>'+
        '<div class="cap">73 terms &rarr; (73+1)/2 = 37th term</div></div>'+
        '<div class="box"><div class="big"><i class="vn">n</i> even &rarr; <i class="vn">n</i>/2 aur <i class="vn">n</i>/2 + 1</div>'+
        '<div class="cap">10 terms &rarr; 5th aur 6th. Doosra hamesha pehle se ek hi zyada.</div></div>'+
        '<p>Aur "th" lagana zaroori hai — 39<strong>th</strong> term. Kyunki wo <strong>position</strong> hai, term ki value nahi.</p>',

        '<span class="eyebrow">Poora tarika</span><h2>Teen step</h2>'+
        '<ul>'+
        '<li><strong>1.</strong> Last term ka formula lagao aur <i class="vn">n</i> find karo</li>'+
        '<li><strong>2.</strong> Dekho <i class="vn">n</i> odd hai ya even — position find karo</li>'+
        '<li><strong>3.</strong> Us position ka term find karo (a + (n−1)d se)</li>'+
        '</ul>'+
        '<div class="box"><div class="seq">1, 4, 7, …, 298<br>n = 100 &rarr; even &rarr; 50th aur 51st<br>a<sub>50</sub> = 1 + 49(3) = 148<br>a<sub>51</sub> = 1 + 50(3) = 151</div></div>',

        '<span class="eyebrow">Likhna kaise hai</span><h2>Marks poore chahiye toh</h2>'+
        '<p>Exam me sirf answer nahi — ye lines likhni hoti hain:</p>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14px;line-height:1.7">'+
        'Given AP: 1, 4, 7, …, 298<br>a = 1, d = 3, l = 298<br>Since number of terms are even,<br>therefore there will be two mid terms<br>Hence the two middle terms are 148 and 151</div></div>'+
        '<div class="say">Teen marks ka question hai. Board me aata hi hai.</div>'
      ]},

    { id:'f4', title:'End se nth term', checks:['fromend','fromend','symb'], lvl:2,
      cards:[
        '<span class="eyebrow">Ulti sidhi</span><h2>Peeche se ginna</h2>'+
        '<p>Shuru se chalte ho toh <i class="va">a</i> se shuru karke <i class="vd">d</i> add karte ho. End se chaloge toh <strong>l se shuru karke <i class="vd">d</i> subtract karte ho</strong>.</p>'+
        '<div class="box"><div class="big">End se nth term = l &minus; (<i class="vn">n</i> &minus; 1)<i class="vd">d</i></div></div>'+
        '<p>Gap wahi <i class="vn">n</i> &minus; 1 hai. Bas direction ulti hai.</p>',

        '<span class="eyebrow">Example</span><h2>Karke dekho</h2>'+
        '<div class="box"><div class="seq">3, 8, 13, …, 253<br>End se 11th term<br>= 253 &minus; 10 &times; 5<br>= 203</div></div>'+
        '<div class="say">Shuru se plus, end se minus. n − 1 dono jagah wahi.</div>'
      ]},
    { id:'f5', title:'Table bharna aur missing boxes', checks:['table','table','missing'], lvl:1,
      cards:[
        '<span class="eyebrow">NCERT ka pehla question</span><h2>Char column, ek formula</h2>'+
        '<p>Book ka pehla question ek table deta hai — <i class="va">a</i>, <i class="vd">d</i>, <i class="vn">n</i> aur a<sub>n</sub>. Inme se koi ek missing hota hai.</p>'+
        '<div class="box"><div class="big">a<sub>n</sub> = <i class="va">a</i> + (<i class="vn">n</i> &minus; 1)<i class="vd">d</i></div>'+
        '<div class="cap">Charon isi ek line se jude hue hain. Koi teen pata ho toh chautha nikal aayega.</div></div>'+
        '<div class="say">Naya formula nahi hai. Wahi purana, bas ulta chalana hai.</div>',

        '<span class="eyebrow">Seedha aur ulta</span><h2>Karke dekho</h2>'+
        '<div class="box"><div class="cap"><i class="va">a</i> = 7, <i class="vd">d</i> = 3, <i class="vn">n</i> = 8 &rarr; a<sub>n</sub> = ?</div>'+
        '<div class="seq">a<sub>8</sub> = 7 + (8 &minus; 1)3 = 7 + 21 = 28</div></div>'+
        '<div class="box"><div class="cap"><i class="va">a</i> = &minus;18, <i class="vn">n</i> = 10, a<sub>n</sub> = 0 &rarr; <i class="vd">d</i> = ?</div>'+
        '<div class="seq">0 = &minus;18 + 9<i class="vd">d</i> &rarr; 9<i class="vd">d</i> = 18 &rarr; <i class="vd">d</i> = 2</div></div>'+
        '<p><i class="vn">n</i> = 10 hai toh gaps <strong>9</strong> hain — 10 se divide mat kar dena.</p>',

        '<span class="eyebrow">d = 0 wali row</span><h2>Gap zero ho toh?</h2>'+
        '<div class="box"><div class="cap"><i class="va">a</i> = 3.5, <i class="vd">d</i> = 0, <i class="vn">n</i> = 105</div>'+
        '<div class="big">a<sub>105</sub> = 3.5</div>'+
        '<div class="cap">Har term me 0 add ho raha hai — term badalta hi nahi</div></div>'+
        '<p>Ye NCERT ki paanchvi row hai, aur log yahin ghabra jaate hain. 105 se koi lena dena hi nahi.</p>',

        '<span class="eyebrow">Boxes wala</span><h2>Do term pata ho toh poora AP pata hai</h2>'+
        '<p>Question aisa aata hai: <strong>2, &#9633;, 26</strong>. Beech wala box kya hai?</p>'+
        '<div class="box"><div class="seq">2 se 26 tak <strong>2 gaps</strong> hain<br>'+
        '2<i class="vd">d</i> = 26 &minus; 2 = 24 &rarr; <i class="vd">d</i> = 12<br>'+
        'Box = 2 + 12 = <strong>14</strong></div></div>'+
        '<p>Ab ye: <strong>&#9633;, 13, &#9633;, 3</strong></p>'+
        '<div class="box"><div class="seq">13 se 3 tak bhi 2 gaps<br>'+
        '2<i class="vd">d</i> = 3 &minus; 13 = &minus;10 &rarr; <i class="vd">d</i> = &minus;5<br>'+
        'Pehla box = 13 &minus; (&minus;5) = 18, teesra = 13 + (&minus;5) = 8</div></div>'+
        '<div class="say">Gaps gino, terms nahi. 13 aur 3 ke beech 2 gaps hain, 3 nahi.</div>',

        '<span class="eyebrow">Jaal</span><h2>Average tabhi chalega jab box beech me ho</h2>'+
        '<p><strong>2, &#9633;, 26</strong> me box theek beech me hai, toh average (2+26)&divide;2 = 14 kaam kar gaya.</p>'+
        '<p>Lekin <strong>5, &#9633;, &#9633;, 9&frac12;</strong> me box beech me nahi hai. Yahan average galat answer dega.</p>'+
        '<div class="say">Shortcut tabhi lo jab pata ho wo kab chalta hai. Warna <i class="vd">d</i> find karo aur seedha chalo.</div>'
      ]},
  ],

  sum:[
    { id:'s1', title:'Gauss wala trick', checks:['sumsymb','sumn','sumn'], lvl:1,
      cards:[
        '<span class="eyebrow">Wahi purana sawaal</span><h2>1 se 100 tak add karo</h2>'+
        '<p>Gauss se ye poochha gaya tha jab wo das saal ka tha. Usne turant bata diya — <strong>5050</strong>.</p>'+
        '<div class="box"><div class="seq">'+
        'S = 1 + 2 + 3 + … + 99 + 100<br>'+
        'S = 100 + 99 + … + 3 + 2 + 1<br>'+
        '<br>2S = 101 + 101 + … + 101 &nbsp;(100 baar)<br>'+
        '2S = 100 × 101 → S = 5050</div></div>'+
        '<div class="say">Ulta likh ke add kar do. Har jodi ka total ek hi aata hai — bas.</div>',

        '<span class="eyebrow">Formula banate hain</span><h2>Wahi trick, general AP par</h2>'+
        '<div class="box"><div class="seq">'+
        'S = <i class="va">a</i> + (<i class="va">a</i>+<i class="vd">d</i>) + … + [<i class="va">a</i>+(<i class="vn">n</i>−1)<i class="vd">d</i>]<br>'+
        'S = [<i class="va">a</i>+(<i class="vn">n</i>−1)<i class="vd">d</i>] + … + (<i class="va">a</i>+<i class="vd">d</i>) + <i class="va">a</i><br>'+
        '<br>2S = <i class="vn">n</i> [2<i class="va">a</i> + (<i class="vn">n</i>−1)<i class="vd">d</i>]</div></div>'+
        '<div class="box"><div class="big"><i class="vs">S</i><sub>n</sub> = <i class="vn">n</i>/2 [2<i class="va">a</i> + (<i class="vn">n</i> − 1)<i class="vd">d</i>]</div>'+
        '<div class="cap">Har jodi ka total 2<i class="va">a</i> + (<i class="vn">n</i>−1)<i class="vd">d</i>, aur aisi <i class="vn">n</i> jodiyan</div></div>',

        '<span class="eyebrow">Sabse badi confusion</span><h2>a<sub>n</sub> aur S<sub>n</sub> ek nahi hain</h2>'+
        '<div class="box"><div class="seq">'+
        'a<sub>n</sub> = <i class="va">a</i> + (<i class="vn">n</i> − 1)<i class="vd">d</i><br>'+
        '<span class="cap">→ sirf <b>ek</b> term</span><br><br>'+
        '<i class="vs">S</i><sub>n</sub> = <i class="vn">n</i>/2 [2<i class="va">a</i> + (<i class="vn">n</i> − 1)<i class="vd">d</i>]<br>'+
        '<span class="cap">→ pehle <b>n terms milakar</b></span></div></div>'+
        '<p>Question me <strong>"total", "kul milakar", "sum"</strong> dikhe toh S<sub>n</sub>. Warna a<sub>n</sub>.</p>'+
        '<div class="say">Dono formule me [2a + (n−1)d] jaisa hi dikhta hai. Isiliye log galti karte hain. Dhyan se dekho.</div>',

        '<span class="eyebrow">Karke dekho</span><h2>8, 3, −2, … ke pehle 22 terms</h2>'+
        '<div class="box"><div class="seq">'+
        '<i class="va">a</i> = 8, <i class="vd">d</i> = 3 − 8 = −5, <i class="vn">n</i> = 22<br>'+
        '<i class="vs">S</i><sub>22</sub> = 22/2 [16 + 21(−5)]<br>'+
        '= 11 (16 − 105)<br>'+
        '= 11 × (−89) = <strong>−979</strong></div></div>'+
        '<div class="say">Sum minus me bhi aa sakta hai. Ghabrana nahi — AP neeche ja raha hai toh sum bhi neeche jaayega.</div>'
      ]},

    { id:'s2', title:'Jab last term diya ho', checks:['sumto','sumto','sumtable'], lvl:1,
      cards:[
        '<span class="eyebrow">Chhota formula</span><h2>S<sub>n</sub> = n/2 (a + l)</h2>'+
        '<p>Bade formula me 2<i class="va">a</i> ko <i class="va">a</i> + <i class="va">a</i> likh do:</p>'+
        '<div class="box"><div class="seq">'+
        '<i class="vn">n</i>/2 [<i class="va">a</i> + (<i class="va">a</i> + (<i class="vn">n</i>−1)<i class="vd">d</i>)]<br>'+
        '= <i class="vn">n</i>/2 [<i class="va">a</i> + a<sub>n</sub>]</div></div>'+
        '<div class="box"><div class="big"><i class="vs">S</i><sub>n</sub> = <i class="vn">n</i>/2 (<i class="va">a</i> + l)</div>'+
        '<div class="cap">Ye alag formula nahi hai — wahi hai, chhoti shakal me</div></div>'+
        '<div class="say">Jab <i class="vd">d</i> na diya ho lekin pehla aur aakhri term diye hon, tab ye sabse tez hai.</div>',

        '<span class="eyebrow">Ek step pehle</span><h2>n toh nikalna hi padega</h2>'+
        '<p>Series aisi di hoti hai: <strong>7 + 10½ + 14 + … + 84</strong>. Sum ke liye <i class="vn">n</i> chahiye, aur wo diya nahi hai.</p>'+
        '<div class="box"><div class="seq">'+
        '<i class="va">a</i> = 7, <i class="vd">d</i> = 3½, l = 84<br>'+
        '84 = 7 + (<i class="vn">n</i> − 1)(3½) → <i class="vn">n</i> = 23<br>'+
        '<i class="vs">S</i><sub>23</sub> = 23/2 (7 + 84) = 23/2 × 91</div></div>'+
        '<div class="say">Last term wala formula pehle <i class="vn">n</i> maangta hai. Wo step skip mat karna.</div>',

        '<span class="eyebrow">Paanch cheezein</span><h2>Koi teen pata ho toh baaki nikal aayenge</h2>'+
        '<p>Ab tumhare paas <strong>paanch</strong> cheezein hain — <i class="va">a</i>, <i class="vd">d</i>, <i class="vn">n</i>, a<sub>n</sub> aur <i class="vs">S</i><sub>n</sub>.</p>'+
        '<p>NCERT ka teesra question yahi hai: table me teen diye hain, do nikalne hain.</p>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14px;line-height:1.8">'+
        '<i class="va">a</i>, <i class="vd">d</i>, <i class="vn">n</i> diye hain → a<sub>n</sub> aur <i class="vs">S</i><sub>n</sub> nikalo<br>'+
        '<i class="va">a</i>, a<sub>n</sub>, <i class="vn">n</i> diye hain → <i class="vs">S</i><sub>n</sub> = <i class="vn">n</i>/2(<i class="va">a</i> + a<sub>n</sub>) sabse tez<br>'+
        '<i class="va">a</i>, <i class="vd">d</i>, <i class="vs">S</i><sub>n</sub> diye hain → quadratic banega</div></div>'+
        '<div class="say">Har baar sochо — kaunsa formula sabse chhota rasta hai. Lamba rasta bhi sahi hai, bas time zyada lagega.</div>'
      ]},

    { id:'s3', title:'Sum diya hai, n find karo', checks:['sumhow','sumhow','sumterms'], lvl:1,
      cards:[
        '<span class="eyebrow">Ulta sawaal</span><h2>Kitne terms lene par ye sum aayega?</h2>'+
        '<p><em>"9, 17, 25, … ke kitne terms lene par sum 636 aayega?"</em></p>'+
        '<p>Yahan <i class="vn">n</i> hi unknown hai, aur wo formula ke <strong>andar do jagah</strong> baitha hai. Isliye quadratic banega.</p>'+
        '<div class="box"><div class="seq">'+
        '636 = <i class="vn">n</i>/2 [18 + (<i class="vn">n</i> − 1)8]<br>'+
        '1272 = <i class="vn">n</i> [10 + 8<i class="vn">n</i>]<br>'+
        '8<i class="vn">n</i>² + 10<i class="vn">n</i> − 1272 = 0<br>'+
        '4<i class="vn">n</i>² + 5<i class="vn">n</i> − 636 = 0<br>'+
        '<i class="vn">n</i> = 12</div></div>'+
        '<div class="say">Quadratic dekh ke ghabrana nahi. Splitting the middle term tumhe aati hai — wahi lagana hai.</div>',

        '<span class="eyebrow">Do root</span><h2>Ek ko reject karna padta hai</h2>'+
        '<p>Jab <i class="vd">d</i> minus me ho, quadratic ke <strong>do</strong> positive root aa sakte hain. 200 logs wala famous question:</p>'+
        '<div class="box"><div class="seq">'+
        '20, 19, 18, … &nbsp; <i class="vs">S</i><sub>n</sub> = 200<br>'+
        '<i class="vn">n</i>² − 41<i class="vn">n</i> + 400 = 0<br>'+
        '(<i class="vn">n</i> − 16)(<i class="vn">n</i> − 25) = 0<br>'+
        '<i class="vn">n</i> = 16 &nbsp;ya&nbsp; <i class="vn">n</i> = 25</div></div>'+
        '<p><i class="vn">n</i> = 25 rakho toh a<sub>25</sub> = 20 + 24(−1) = <strong>−4</strong>. Logs minus me nahi ho sakte, toh 25 reject.</p>'+
        '<div class="say">Dono root check karo. Jo physically possible nahi, use reject karna hi poore marks dilata hai.</div>',

        '<span class="eyebrow">n hamesha</span><h2>Positive whole number</h2>'+
        '<ul>'+
        '<li>Fraction aaya → wo term hai hi nahi</li>'+
        '<li>Minus aaya → reject</li>'+
        '<li>Zero aaya → reject</li>'+
        '</ul>'+
        '<p><i class="vn">n</i> ginti ka number hai. Koi 7.5th term nahi hota, aur koi −3rd term nahi hota.</p>'+
        '<div class="say">Ye ek line likh dena answer me — "since n is the number of terms, it must be a positive integer". Free ka marks hai.</div>'
      ]},

    { id:'s4', title:'Sum se term wapas', checks:['sumformula','sumformula','sumsymb'], lvl:2,
      cards:[
        '<span class="eyebrow">Ulti ganga</span><h2>a<sub>n</sub> = S<sub>n</sub> − S<sub>n−1</sub></h2>'+
        '<p>Agar sum ka formula diya ho aur term poochha ho, toh ek hi rasta hai.</p>'+
        '<div class="box"><div class="seq">'+
        '<i class="vs">S</i><sub>n</sub> = a₁ + a₂ + … + a<sub>n−1</sub> + a<sub>n</sub><br>'+
        '<i class="vs">S</i><sub>n−1</sub> = a₁ + a₂ + … + a<sub>n−1</sub><br>'+
        '<br>Subtract karo → sirf a<sub>n</sub> bachta hai</div></div>'+
        '<div class="say">Do sums ka fark hi ek term hota hai. Baaki sab cancel.</div>',

        '<span class="eyebrow">Example</span><h2>S<sub>n</sub> = 4n − n²</h2>'+
        '<div class="box"><div class="seq">'+
        '<i class="vs">S</i>₁ = 4 − 1 = 3 → <i class="va">a</i> = 3<br>'+
        '<i class="vs">S</i>₂ = 8 − 4 = 4<br>'+
        'a₂ = <i class="vs">S</i>₂ − <i class="vs">S</i>₁ = 4 − 3 = 1<br>'+
        '<i class="vd">d</i> = 1 − 3 = −2</div></div>'+
        '<p>Aur <i class="vs">S</i>₁ hamesha <i class="va">a</i> hi hota hai — pehle ek term ka sum wahi ek term hai.</p>',

        '<span class="eyebrow">Doosri shakal</span><h2>a<sub>n</sub> = 3 + 4n diya ho toh?</h2>'+
        '<p>Yahan <i class="vn">n</i> ki jagah 1, 2, 3 rakh ke terms bana lo.</p>'+
        '<div class="box"><div class="seq">'+
        '<i class="vn">n</i> = 1 → 7,&nbsp; <i class="vn">n</i> = 2 → 11,&nbsp; <i class="vn">n</i> = 3 → 15<br>'+
        '<i class="vd">d</i> = 4 — har baar wahi → ye AP hai</div></div>'+
        '<p>Shortcut: a<sub>n</sub> me <i class="vn">n</i> ke aage jo number hai, <strong>wahi <i class="vd">d</i> hai</strong>. Aur <i class="va">a</i> = <i class="vn">n</i> = 1 rakh kar.</p>'+
        '<div class="say">Ye pehchan lo toh ye question ek line ka ho jaata hai.</div>'
      ]},

    { id:'s5', title:'Sum ke word problems', checks:['sumapply','summult','sumapply'], lvl:1,
      cards:[
        '<span class="eyebrow">Ek shabd</span><h2>Term ya sum — kaise pehchano</h2>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14.5px;line-height:1.9">'+
        '"<b>30th din</b> ka penalty kitna?" → a<sub>n</sub><br>'+
        '"<b>30 din</b> ka penalty kitna?" → <i class="vs">S</i><sub>n</sub><br><br>'+
        '"<b>8th row</b> me kitni seats?" → a<sub>n</sub><br>'+
        '"<b>Hall me kul</b> kitni seats?" → <i class="vs">S</i><sub>n</sub></div></div>'+
        '<p>Ek chhota sa shabd — "kul", "total", "sab milakar" — poora formula badal deta hai.</p>'+
        '<div class="say">Question do baar padho. Pehli baar samajhne ke liye, doosri baar ye dekhne ke liye ki term poochha hai ya sum.</div>',

        '<span class="eyebrow">Multiples</span><h2>Ye hamesha AP hote hain</h2>'+
        '<div class="box"><div class="seq">'+
        '8 ke pehle 15 multiples<br>'+
        '8, 16, 24, … → <i class="va">a</i> = 8, <i class="vd">d</i> = 8<br>'+
        '<i class="vs">S</i><sub>15</sub> = 15/2 [16 + 14(8)] = 960</div></div>'+
        '<p>Multiples wale AP me <i class="va">a</i> aur <i class="vd">d</i> dono wahi divisor hote hain.</p>'+
        '<p>Aur ek yaad rakhne layak baat: pehle <i class="vn">n</i> odd numbers ka sum hamesha <strong>n²</strong> hota hai. 1 + 3 + 5 + 7 = 16 = 4².</p>',

        '<span class="eyebrow">Aana-jaana</span><h2>Jahan 2 se multiply karna padta hai</h2>'+
        '<p>Potato race, paani ka can, seedhi chadhna-utarna — in sab me aadmi <strong>jaata bhi hai aur wapas bhi aata hai</strong>.</p>'+
        '<div class="box"><div class="seq">'+
        'Ek taraf ka total = <i class="vs">S</i><sub>n</sub><br>'+
        'Aana-jaana dono = 2 × <i class="vs">S</i><sub>n</sub></div></div>'+
        '<div class="say">Sum nikal liya matlab kaam khatam nahi. Sabse zyada marks yahin katte hain — 2 se multiply karna bhool jaate hain.</div>',

        '<span class="eyebrow">Aur ek</span><h2>Ghatta hua AP</h2>'+
        '<p><em>"₹700 ko 7 prizes me baanto, har prize pichle se ₹20 kam."</em></p>'+
        '<p>"Kam" dikha toh <i class="vd">d</i> <strong>minus</strong> me hai. <i class="vd">d</i> = −20.</p>'+
        '<div class="box"><div class="seq">'+
        '700 = 7/2 [2<i class="va">a</i> + 6(−20)]<br>'+
        '200 = 2<i class="va">a</i> − 120 → <i class="va">a</i> = 160<br>'+
        'Prizes: 160, 140, 120, 100, 80, 60, 40</div></div>'+
        '<div class="say">Aakhir me saare prizes likhna. Sirf <i class="va">a</i> likhoge toh poore marks nahi milenge.</div>'
      ]},

    { id:'s6', title:'Case study kaise banate hain', checks:['sumapply','sumn','sumsymb'], also:['casestudy'], lvl:2,
      cards:[
        '<span class="eyebrow">Section E</span><h2>Ek scenario, teen sawaal</h2>'+
        '<p>Board paper me teen case studies aate hain, <strong>4-4 marks</strong> ke. Har ek me ek kahani hoti hai aur uspe teen sawaal:</p>'+
        '<ul>'+
        '<li><strong>(i)</strong> 1 mark — AP hai ya nahi, ya <i class="va">a</i> aur <i class="vd">d</i> kya hai</li>'+
        '<li><strong>(ii)</strong> 1 mark — koi ek term (a<sub>n</sub>)</li>'+
        '<li><strong>(iii)</strong> 2 marks — sum, ya koi ulta sawaal. Isme OR ka choice hota hai</li>'+
        '</ul>'+
        '<div class="say">Pehle do parts lagbhag free ke hote hain. Wo mat chhodna.</div>',

        '<span class="eyebrow">Asli paper se</span><h2>Multistorey building</h2>'+
        '<p><em>Ground floor se first floor tak 10 stairs, first se second 24, second se third 38, aur aise hi.</em></p>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14px;line-height:1.8">'+
        '<b>(i)</b> 10, 24, 38 AP hai? → gaps 14, 14 → haan, <i class="vd">d</i> = 14<br>'+
        '<b>(ii)</b> 11th floor tak kul stairs → <i class="vs">S</i><sub>11</sub> = 11/2[20 + 140] = 880<br>'+
        '<b>(iii)</b> 6th floor tak aana-jaana → 2 × <i class="vs">S</i>₆ = 2 × 270 = 540</div></div>'+
        '<p>Dekha? (ii) me sum, (iii) me sum ka double. Ek hi kahani, teen alag formule.</p>',

        '<span class="eyebrow">Asli paper se</span><h2>Foldable ladder</h2>'+
        '<p><em>10 steps. Foldi hui halat me steps ke beech 6 cm, khuli halat me 30 cm. Pehla step zameen se 40 cm upar.</em></p>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:14px;line-height:1.8">'+
        '<b>(i)</b> Position I ka AP → 40, 46, 52, 58, …<br>'+
        '<b>(ii)</b> Position II ka AP → 40, 70, 100, 130, …<br>'+
        '<b>(iii)</b> Position II ki poori height → a₁₀ = 40 + 9(30) = 310 cm</div></div>'+
        '<p>Yahan sum nahi laga — height poochhi thi, toh a<sub>n</sub>. Har case study me sum nahi hota.</p>'+
        '<div class="say">Har part ko alag question maano. Kahani ek hai, formula alag alag.</div>',

        '<span class="eyebrow">Likhne ka tarika</span><h2>Chhote steps, poore marks</h2>'+
        '<ul>'+
        '<li>Har part ka number likho — (i), (ii), (iii)</li>'+
        '<li>Given AP pehle likho, phir <i class="va">a</i> aur <i class="vd">d</i></li>'+
        '<li>Formula box karke likho, phir value daalo</li>'+
        '<li>Answer sentence me — "hence there are 880 stairs"</li>'+
        '</ul>'+
        '<div class="say">(iii) me OR hota hai — dono padho, jo aasan lage wo banao. Dono banane ki zarurat nahi.</div>'
      ]}
  ],

  word:[

    { id:'w2', title:'English se equation banao', checks:['translate','translate','translate'], lvl:1,
      cards:[
        '<span class="eyebrow">Asli dikkat</span><h2>Sawaal samajhna, solve karna nahi</h2>'+
        '<p>Solve karna toh aa hi jaata hai. Fasate ho <strong>sentence ko equation banane me</strong>. Toh wahi practice karte hain.</p>'+
        '<div class="box"><div class="cap" style="text-align:left;font-size:15px;line-height:2">'+
        '"The sum of &alpha; and &beta; is 12" &rarr; &alpha; + &beta; = 12<br>'+
        '"The sum of square of 2 and x is y" &rarr; 2&sup2; + x = y<br>'+
        '"The product of a and b is 1" &rarr; a &times; b = 1</div></div>'+
        '<div class="say">Sum = plus. Product = into. "is" = equal to. Bas.</div>',

        '<span class="eyebrow">AP me</span><h2>Term ko pehle formula me badlo</h2>'+
        '<p><em>"The sum of the 4th and 8th term of an AP is 24."</em></p>'+
        '<div class="box"><div class="seq">'+
        '4th term = <i class="va">a</i> + 3<i class="vd">d</i><br>'+
        '8th term = <i class="va">a</i> + 7<i class="vd">d</i><br>'+
        '(<i class="va">a</i> + 3<i class="vd">d</i>) + (<i class="va">a</i> + 7<i class="vd">d</i>) = 24</div></div>'+
        '<div class="say">Term ek poori cheez hai. Usko hamesha bracket me rakho.</div>',

        '<span class="eyebrow">Simplest form</span><h2>Aage badhne se pehle simple karo</h2>'+
        '<div class="box"><div class="seq">'+
        '2<i class="va">a</i> + 10<i class="vd">d</i> = 24<br>'+
        '&darr; 2 common hai<br>'+
        '<i class="va">a</i> + 5<i class="vd">d</i> = 12</div></div>'+
        '<p>Ab poochho — kya isse aur simple ho sakta hai? Nahi. Toh ye simplest form hai.</p>',

        '<span class="eyebrow">Do baatein</span><h2>Do equations = linear equations wala chapter</h2>'+
        '<p>Question do baatein deta hai, toh do equations banenge. Aur uske baad ye bilkul wahi kaam hai jo tumne linear equations me kiya tha — bas x, y ki jagah <i class="va">a</i>, <i class="vd">d</i> hain.</p>'+
        '<div class="say">Elimination lagao ya substitution — jo achha lage.</div>'
      ]},

    { id:'w3', title:'Poora word problem solve karo', checks:['apply','apply','apply'], lvl:1,
      cards:[
        '<span class="eyebrow">Tarika</span><h2>Char step, har baar</h2>'+
        '<ul>'+
        '<li><strong>1.</strong> Given AP likho — situation ko numbers me</li>'+
        '<li><strong>2.</strong> <i class="va">a</i>, <i class="vd">d</i>, aur jo diya hai (l ya a<sub>n</sub>) likho</li>'+
        '<li><strong>3.</strong> Formula box karke likho, phir value daalo</li>'+
        '<li><strong>4.</strong> Answer ko <strong>sentence me</strong> likho — "hence there are 10 rows"</li>'+
        '</ul>'+
        '<div class="say">Sirf answer likhoge toh marks kat jaayenge. Steps hi marks hain.</div>',

        '<span class="eyebrow">Example</span><h2>Phoolon ki kyari</h2>'+
        '<p><em>"Sabse upar wali row me 23 paudhe, agli me 21, agli me 19 … aakhri row me 5 paudhe. Kitni rows hain?"</em></p>'+
        '<div class="box"><div class="seq">23, 21, 19, …, 5<br><i class="va">a</i> = 23, <i class="vd">d</i> = &minus;2, l = 5<br>5 = 23 + (<i class="vn">n</i> &minus; 1)(&minus;2)<br><i class="vn">n</i> = 10</div>'+
        '<div class="cap">Hence there are 10 rows in the flower bed</div></div>',

        '<span class="eyebrow">Salary wala</span><h2>Saal bhi terms hote hain</h2>'+
        '<p><em>"Subba Rao ne 1995 me &#8377;5000 salary par kaam shuru kiya, har saal &#8377;200 increment. Kis saal me salary &#8377;7000 hogi?"</em></p>'+
        '<div class="box"><div class="seq">5000, 5200, 5400, …, 7000<br><i class="vn">n</i> = 11</div>'+
        '<div class="cap">1995 pehla saal hai &rarr; 11th saal = 1995 + 10 = <strong>2005</strong></div></div>'+
        '<p>Yahan bhi wahi <i class="vn">n</i> &minus; 1. Pehle saal me increment nahi milta — wo hi <i class="va">a</i> hai.</p>'+
        '<div class="say">Question ulta poocha jaaye toh dhyan se padhna. Kaun sa saal, ya kitne saal — dono alag hain.</div>',

        '<span class="eyebrow">Decimal wala</span><h2>Paise ki tarah dekho</h2>'+
        '<p><em>"Ramkali ne pehle hafte &#8377;5 bachaye, phir har hafte &#8377;1.75 zyada. Kis hafte me &#8377;20.75 bachegi?"</em></p>'+
        '<div class="box"><div class="seq">5, 6.75, 8.50, …, 20.75<br>20.75 = 5 + (<i class="vn">n</i> &minus; 1)(1.75)<br>17.50 = 1.75(<i class="vn">n</i> &minus; 1)<br><i class="vn">n</i> = 10</div></div>'+
        '<div class="say">Decimal se mat darna. 5 me se 1.75 subtract karna hai? 5.00 likh lo — kaam saaf ho jaata hai.</div>'
      ]},

    { id:'w4', title:'Do equations wala question', checks:['twoterm','twoeq','exceeds'],
      also:['twoap'], lvl:3,
      cards:[
        '<span class="eyebrow">3 marks</span><h2>Do baatein, do equations</h2>'+
        '<p><em>"The sum of the 4th and 8th terms of an AP is 24, and the sum of the 6th and 10th terms is 44. Find the first three terms."</em></p>'+
        '<div class="box"><div class="seq">'+
        '(<i class="va">a</i>+3<i class="vd">d</i>) + (<i class="va">a</i>+7<i class="vd">d</i>) = 24 &rarr; <i class="va">a</i> + 5<i class="vd">d</i> = 12 &nbsp;(i)<br>'+
        '(<i class="va">a</i>+5<i class="vd">d</i>) + (<i class="va">a</i>+9<i class="vd">d</i>) = 44 &rarr; <i class="va">a</i> + 7<i class="vd">d</i> = 22 &nbsp;(ii)</div></div>',

        '<span class="eyebrow">Solve</span><h2>Yahan se linear equations</h2>'+
        '<div class="box"><div class="seq">'+
        '(ii) &minus; (i): 2<i class="vd">d</i> = 10 &rarr; <i class="vd">d</i> = 5<br>'+
        '(i) me daalo: <i class="va">a</i> + 25 = 12 &rarr; <i class="va">a</i> = &minus;13</div></div>'+
        '<div class="box"><div class="big">&minus;13, &minus;8, &minus;3</div>'+
        '<div class="cap">Hence the first three terms are &minus;13, &minus;8 and &minus;3</div></div>'+
        '<div class="say">Aakhir me conclusion line likhna mat bhoolna. Wo bhi marks hai.</div>',

        '<span class="eyebrow">Ek aur shakal</span><h2>Do APs, ek hi d</h2>'+
        '<p><em>"Do APs ka common difference same hai. Unke 99th terms ka difference 99 hai. 999th terms ka difference kya hoga?"</em></p>'+
        '<div class="box"><div class="seq">'+
        '(<i class="va">a</i> + 98<i class="vd">d</i>) &minus; (A + 98<i class="vd">d</i>) = 99<br>'+
        '&rarr; <i class="va">a</i> &minus; A = 99<br><br>'+
        '(<i class="va">a</i> + 998<i class="vd">d</i>) &minus; (A + 998<i class="vd">d</i>)<br>'+
        '= <i class="va">a</i> &minus; A = <strong>99</strong></div></div>'+
        '<p><i class="vd">d</i> wala hissa dono me same hai, isliye har position par cancel ho jaata hai.</p>'+
        '<div class="say">Question hard nahi hai — bas samajhne ki baat hai.</div>',

        '<span class="eyebrow">Ek aur shabd</span><h2>"Exceeds by" ka matlab</h2>'+
        '<p><em>"The 17th term of an AP exceeds its 10th term by 7."</em></p>'+
        '<div class="box"><div class="seq">'+
        'a<sub>17</sub> &minus; a<sub>10</sub> = 7<br>'+
        '(<i class="va">a</i> + 16<i class="vd">d</i>) &minus; (<i class="va">a</i> + 9<i class="vd">d</i>) = 7<br>'+
        '7<i class="vd">d</i> = 7 &rarr; <i class="vd">d</i> = 1</div></div>'+
        '<p>Do terms ka fark hamesha sirf <strong>gaps ka fark</strong> hota hai — <i class="va">a</i> apne aap cancel ho jaata hai.</p>'+
        '<div class="say">Isiliye do term diye hon toh <i class="vd">d</i> turant mil jaata hai.</div>'
      ]},
    { id:'w5', title:'Kitne numbers hain', checks:['countap','countap','equalterm'], lvl:1,
      cards:[
        '<span class="eyebrow">Chhupa hua AP</span><h2>Multiples hamesha AP hote hain</h2>'+
        '<p>7 ke multiples likho: 7, 14, 21, 28, &hellip; Gap kitna hai? <strong>7</strong>. Hamesha wahi divisor.</p>'+
        '<p>Isliye "kitne numbers" wale sawaal AP ke sawaal hain — bas AP dikh nahi raha hota.</p>'+
        '<div class="say">Question me AP likha nahi hoga. Tumhe pehchanna hai.</div>',

        '<span class="eyebrow">Example 7</span><h2>Kitne three-digit numbers 7 se divisible hain?</h2>'+
        '<div class="box"><div class="seq">'+
        'Pehla: 105 &nbsp;·&nbsp; Aakhri: 994<br>'+
        'AP: 105, 112, 119, &hellip;, 994<br>'+
        '<i class="va">a</i> = 105, <i class="vd">d</i> = 7, l = 994<br>'+
        '994 = 105 + (<i class="vn">n</i> &minus; 1)7<br>'+
        '889 = 7(<i class="vn">n</i> &minus; 1) &rarr; <i class="vn">n</i> &minus; 1 = 127 &rarr; <i class="vn">n</i> = 128</div></div>'+
        '<p>Sabse mushkil hissa yahi hai — <strong>pehla aur aakhri find karna</strong>. Uske baad wahi purana formula.</p>',

        '<span class="eyebrow">Ek shabd, ek marks</span><h2>"Between" ka matlab</h2>'+
        '<p><em>"10 aur 250 ke beech 4 ke kitne multiples hain?"</em></p>'+
        '<div class="box"><div class="seq">Pehla: 12 (10 nahi)<br>Aakhri: 248 (250 nahi)<br>'+
        '248 = 12 + (<i class="vn">n</i> &minus; 1)4 &rarr; <i class="vn">n</i> = 60</div></div>'+
        '<p>"Between" ka matlab dono ends <strong>chhod do</strong>. Agar "from 10 to 250" likha hota toh ends bhi shaamil hote.</p>'+
        '<div class="say">Ek shabd padhne me galti, aur poora answer galat. Question dhyan se padho.</div>',

        '<span class="eyebrow">Do APs</span><h2>Kis n par dono equal honge?</h2>'+
        '<p><em>"63, 65, 67, … aur 3, 10, 17, … — kis n par dono ke nth term equal honge?"</em></p>'+
        '<div class="box"><div class="seq">'+
        '63 + (<i class="vn">n</i> &minus; 1)2 = 3 + (<i class="vn">n</i> &minus; 1)7<br>'+
        '60 = (<i class="vn">n</i> &minus; 1)(7 &minus; 2) = 5(<i class="vn">n</i> &minus; 1)<br>'+
        '<i class="vn">n</i> &minus; 1 = 12 &rarr; <i class="vn">n</i> = <strong>13</strong></div></div>'+
        '<div class="say">"Equal" dikhe toh dono formule ke beech = laga do. Bas itna hi hai.</div>'
      ]},
  ]
};

/* the sum formula was promised for the next class — say so, don't half-teach it */
/* kept for the record — the sum is now taught, so nothing is locked */
const NEXT_UP={
  title:'Sum of n terms',
  ex:'Exercise 5.3',
  body:'S<sub>n</sub> = <i class="vn">n</i>/2 [2<i class="va">a</i> + (<i class="vn">n</i> &minus; 1)<i class="vd">d</i>]',
  note:'1 se 500 tak ke saare numbers add karne hain? AP aane ke baad ye ek line ka kaam hai. Exercise 5.3 — class me padhne ke baad yahan khulega.'
};

const PARTS={
  pattern:{ name:'Pattern', kicker:'Part 01 · Exercise 5.1',
    blurb:'AP hai ya nahi, a aur d kitna, aur situation se AP banana.' },
  formula:{ name:'a + (n − 1)d', kicker:'Part 02 · Exercise 5.2',
    blurb:'Koi bhi term, koi bhi position, table, missing boxes, middle term.' },
  word:{ name:'Exam sawaal', kicker:'Part 03 · Exercise 5.2',
    blurb:'Do term diye hain, kitne numbers hain, word problems. Marks yahin se aate hain.' },
  sum:{ name:'Sum (S\u2099)', kicker:'Part 04 · Exercise 5.3',
    blurb:'Saare terms milakar kitna. Gauss wala trick, table, aur sum ke word problems.' }
};
