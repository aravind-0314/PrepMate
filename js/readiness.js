/* ==========================================================================
   PrepMate — readiness score
   Combines four signals into one 0-100 score:
   - quiz average (25%)
   - mock interview average confidence (25%)
   - planner completion (25%)
   - checklist completion (25%)
   ========================================================================== */

const Readiness = {
  quizAverage(data){
    if(!data.quizAttempts.length) return null;
    const totalScore = data.quizAttempts.reduce((s,a)=>s+a.score,0);
    const totalMax = data.quizAttempts.reduce((s,a)=>s+a.total,0);
    return totalMax ? Math.round((totalScore/totalMax)*100) : null;
  },

  quizAverageByCategory(data, category){
    const attempts = data.quizAttempts.filter(a=>a.category===category);
    if(!attempts.length) return null;
    const totalScore = attempts.reduce((s,a)=>s+a.score,0);
    const totalMax = attempts.reduce((s,a)=>s+a.total,0);
    return totalMax ? Math.round((totalScore/totalMax)*100) : null;
  },

  interviewAverage(data){
    const ids = Object.keys(data.interviewRatings);
    if(!ids.length) return null;
    let sum=0, count=0;
    ids.forEach(id=>{
      data.interviewRatings[id].forEach(r=>{ sum+=r; count++; });
    });
    if(!count) return null;
    return Math.round((sum/count)/5*100);
  },

  plannerCompletion(data){
    const allTaskIds = [];
    PLANNER_TRACKS.forEach(track => track.tasks.forEach(t=>allTaskIds.push(t.id)));
    data.customTasks.forEach(t=>allTaskIds.push(t.id));
    if(!allTaskIds.length) return 0;
    const done = allTaskIds.filter(id=>data.planner[id]).length;
    return Math.round((done/allTaskIds.length)*100);
  },

  checklistCompletion(data){
    const done = CHECKLIST_ITEMS.filter(i=>data.checklist[i.id]).length;
    return Math.round((done/CHECKLIST_ITEMS.length)*100);
  },

  overall(data){
    const parts = [
      this.quizAverage(data),
      this.interviewAverage(data),
      this.plannerCompletion(data),
      this.checklistCompletion(data)
    ];
    const known = parts.filter(p => p !== null);
    if(!known.length) return 0;
    // parts not yet attempted count as 0 rather than being excluded,
    // so the score reflects overall readiness, not just attempted areas.
    const sum = parts.reduce((s,p)=> s + (p===null?0:p), 0);
    return Math.round(sum/4);
  },

  band(score){
    if(score >= 75) return { label:"On track", cls:"tag-green" };
    if(score >= 45) return { label:"Building up", cls:"tag-amber" };
    return { label:"Needs focus", cls:"tag-red" };
  },

  weakestArea(data){
    const areas = [
      { key:"Quantitative Aptitude", val: this.quizAverageByCategory(data,"aptitude") },
      { key:"Core Technical", val: this.quizAverageByCategory(data,"technical") },
      { key:"Coding Logic", val: this.quizAverageByCategory(data,"coding_logic") },
      { key:"Verbal & English", val: this.quizAverageByCategory(data,"verbal") },
    ].filter(a => a.val !== null);
    if(!areas.length) return null;
    areas.sort((a,b)=>a.val-b.val);
    return areas[0];
  }
};
