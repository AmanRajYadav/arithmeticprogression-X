/* ════════════════════════════════════════════════════════════════
   POOLS — which generators live behind which door.

   The three doors follow the book:
     Part 01  Exercise 5.1            what an AP is, a and d
     Part 02  Exercise 5.2, pehla hissa   the formula itself
     Part 03  Exercise 5.2, exam sawaal   two terms, counting, word problems

   Sum of n terms (Exercise 5.3) is not here yet — it has not been
   taught. It sits on the menu as a coming-soon card instead.
   ════════════════════════════════════════════════════════════════ */

const POOLS={
  pattern:[gIsAP,gIsAP,gIsAP,gFindD,gFindD,gFindAD,gBuild,gBuild,gNext,gSituation,gSituation],
  formula:[gNth,gNth,gNth,gFindN,gFindN,gTable,gTable,gMissing,gMissing,gFromEnd,gMid,gMid,gSymb],
  word:[gTwoTerms,gTwoTerms,gTranslate,gApply,gApply,gExceeds,gCountAP,gCountAP,gEqualTerms,gTwoAPsDiff,gTwoEq]
};

const LESSON_TOPIC_GEN={
  isap:gIsAP, findd:gFindD, findad:gFindAD, build:gBuild, next:gNext,
  nth:gNth, findn:gFindN, fromend:gFromEnd, mid:gMid, symb:gSymb,
  table:gTable, missing:gMissing,
  situation:gSituation, translate:gTranslate, apply:gApply, twoeq:gTwoEq,
  twoterm:gTwoTerms, exceeds:gExceeds, countap:gCountAP,
  equalterm:gEqualTerms, twoap:gTwoAPsDiff
};

/* generator keys whose reported topic differs from the key itself */
const CHECK_TOPIC={ findad:'findd' };
function topicOfCheck(k){ return CHECK_TOPIC[k]||k; }

const TOPIC_PART={
  isap:'pattern', findd:'pattern', build:'pattern', next:'pattern', situation:'pattern',
  nth:'formula', findn:'formula', fromend:'formula', mid:'formula', symb:'formula',
  table:'formula', missing:'formula',
  translate:'word', apply:'word', twoeq:'word', twoterm:'word',
  exceeds:'word', countap:'word', equalterm:'word', twoap:'word'
};

function genQuestion(part,lvl){
  if(part==='mixed'||part==='weekly'){
    const all=POOLS.pattern.concat(POOLS.formula, POOLS.word);
    return pick(all)(lvl);
  }
  let g=pick(POOLS[part]||POOLS.pattern);
  if(part==='word'&&lvl<3&&g===gTwoEq)g=gApply;      /* the 3-mark question stays on hard */
  return g(lvl);
}
function genForTopic(topic,lvl){
  const g=LESSON_TOPIC_GEN[topic]||gIsAP;
  return g(lvl);
}
/* a run of fresh questions, no two identical prompts back to back */
function buildRun(part,lvl,count){
  const out=[], seen=new Set();
  let guard=0;
  while(out.length<count && guard++<count*30){
    const q=genQuestion(part,lvl);
    const sig=(q.lead||'')+'|'+(q.seq||'')+'|'+(q.ansLabel||'');
    if(seen.has(sig))continue;
    seen.add(sig); out.push(q);
  }
  while(out.length<count)out.push(genQuestion(part,lvl));
  return out;
}
