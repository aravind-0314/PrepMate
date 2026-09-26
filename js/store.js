/* ==========================================================================
   PrepMate — local data store
   Everything runs client-side with localStorage. There is no server, so
   passwords are not cryptographically secure — this is a self-contained
   demo/prototype, not a production auth system.
   ========================================================================== */

const DB_USERS = "prepmate_users";
const DB_SESSION = "prepmate_session";
const DB_PREFIX = "prepmate_data_";

const Store = {
  // ---- tiny helpers ----
  _read(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  },
  _write(key, value){ localStorage.setItem(key, JSON.stringify(value)); },

  _hash(str){
    // Not real crypto — just enough to avoid storing plaintext passwords
    // in an obvious way for a client-only demo.
    let h = 0;
    for(let i=0;i<str.length;i++){ h = (Math.imul(31,h) + str.charCodeAt(i))|0; }
    return "h" + Math.abs(h).toString(36) + str.length;
  },

  // ---- users ----
  getUsers(){ return this._read(DB_USERS, {}); },
  saveUsers(u){ this._write(DB_USERS, u); },

  signup({name, email, password, branch, gradYear, targetRole}){
    const users = this.getUsers();
    const key = email.trim().toLowerCase();
    if(users[key]) return { ok:false, error:"An account with this email already exists." };
    users[key] = {
      name: name.trim(),
      email: key,
      password: this._hash(password),
      branch: branch || "",
      gradYear: gradYear || "",
      targetRole: targetRole || "",
      createdAt: Date.now()
    };
    this.saveUsers(users);
    this.initUserData(key);
    return { ok:true };
  },

  login(email, password){
    const users = this.getUsers();
    const key = email.trim().toLowerCase();
    const u = users[key];
    if(!u) return { ok:false, error:"No account found with that email." };
    if(u.password !== this._hash(password)) return { ok:false, error:"Incorrect password." };
    this._write(DB_SESSION, { email: key });
    return { ok:true };
  },

  logout(){ localStorage.removeItem(DB_SESSION); },

  currentUserEmail(){
    const s = this._read(DB_SESSION, null);
    return s ? s.email : null;
  },

  currentUser(){
    const email = this.currentUserEmail();
    if(!email) return null;
    const users = this.getUsers();
    return users[email] || null;
  },

  requireAuth(){
    if(!this.currentUserEmail()){
      window.location.href = "index.html";
    }
  },

  // ---- per-user app data ----
  initUserData(email){
    const key = DB_PREFIX + email;
    if(!localStorage.getItem(key)){
      this._write(key, {
        quizAttempts: [],       // {category, score, total, date}
        interviewRatings: {},   // {questionId: [1-5, ...]}
        checklist: {},          // {itemId: true/false}
        planner: {},            // {taskId: true/false}
        targetDate: "",
        customTasks: []
      });
    }
  },

  getData(){
    const email = this.currentUserEmail();
    if(!email) return null;
    this.initUserData(email);
    return this._read(DB_PREFIX + email, null);
  },

  saveData(data){
    const email = this.currentUserEmail();
    if(!email) return;
    this._write(DB_PREFIX + email, data);
  },

  recordQuiz(category, score, total){
    const d = this.getData();
    d.quizAttempts.push({ category, score, total, date: Date.now() });
    this.saveData(d);
  },

  rateInterviewQuestion(qId, rating){
    const d = this.getData();
    if(!d.interviewRatings[qId]) d.interviewRatings[qId] = [];
    d.interviewRatings[qId].push(rating);
    this.saveData(d);
  },

  toggleChecklist(itemId){
    const d = this.getData();
    d.checklist[itemId] = !d.checklist[itemId];
    this.saveData(d);
    return d.checklist[itemId];
  },

  togglePlanner(taskId){
    const d = this.getData();
    d.planner[taskId] = !d.planner[taskId];
    this.saveData(d);
    return d.planner[taskId];
  },

  addCustomTask(text){
    const d = this.getData();
    const id = "custom_" + Date.now();
    d.customTasks.push({ id, text });
    this.saveData(d);
    return id;
  },

  removeCustomTask(id){
    const d = this.getData();
    d.customTasks = d.customTasks.filter(t => t.id !== id);
    delete d.planner[id];
    this.saveData(d);
  },

  setTargetDate(dateStr){
    const d = this.getData();
    d.targetDate = dateStr;
    this.saveData(d);
  }
};
