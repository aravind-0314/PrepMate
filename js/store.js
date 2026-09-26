/* ==========================================================================
   PrepMate — local data store

   Everything runs client-side with localStorage.
   This is a self-contained demo/prototype, not production authentication.
   ========================================================================== */

const DB_USERS = "prepmate_users";
const DB_SESSION = "prepmate_session";
const DB_PREFIX = "prepmate_data_";

const Store = {

  // ---- tiny helpers ----

  _read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },

  _write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  _hash(str) {
    // Not real crypto — just enough for this client-only demo.
    let h = 0;

    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }

    return "h" + Math.abs(h).toString(36) + str.length;
  },


  // ============================================================
  // USERS
  // ============================================================

  getUsers() {
    return this._read(DB_USERS, {});
  },

  saveUsers(u) {
    this._write(DB_USERS, u);
  },

  signup({ name, email, password, branch, gradYear, targetRole }) {

    const users = this.getUsers();

    const key = email.trim().toLowerCase();

    if (users[key]) {
      return {
        ok: false,
        error: "An account with this email already exists."
      };
    }

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

    return {
      ok: true
    };
  },


  login(email, password) {

    const users = this.getUsers();

    const key = email.trim().toLowerCase();

    const u = users[key];

    if (!u) {
      return {
        ok: false,
        error: "No account found with that email."
      };
    }

    if (u.password !== this._hash(password)) {
      return {
        ok: false,
        error: "Incorrect password."
      };
    }

    this._write(DB_SESSION, {
      email: key
    });

    return {
      ok: true
    };
  },


  logout() {
    localStorage.removeItem(DB_SESSION);
  },


  currentUserEmail() {

    const s = this._read(DB_SESSION, null);

    return s ? s.email : null;
  },


  currentUser() {

    const email = this.currentUserEmail();

    if (!email) {
      return null;
    }

    const users = this.getUsers();

    return users[email] || null;
  },


  requireAuth() {

    if (!this.currentUserEmail()) {
      window.location.href = "index.html";
    }
  },


  // ============================================================
  // USER DATA
  // ============================================================

  initUserData(email) {

    const key = DB_PREFIX + email;

    if (!localStorage.getItem(key)) {

      this._write(key, {

        // Existing quiz results
        quizAttempts: [],

        // ======================================================
        // MEMBER 3 — FIREDRILL RESULTS
        // ======================================================

        firedrillAttempts: [],

        // Existing interview data
        interviewRatings: {},

        // Existing checklist
        checklist: {},

        // Existing planner
        planner: {},

        // Target placement date
        targetDate: "",

        // Custom planner tasks
        customTasks: []

      });
    }
  },


  getData() {

    const email = this.currentUserEmail();

    if (!email) {
      return null;
    }

    this.initUserData(email);

    const data = this._read(
      DB_PREFIX + email,
      null
    );

    // ----------------------------------------------------------
    // Compatibility:
    // If an old account was created before FireDrill was added,
    // make sure firedrillAttempts exists.
    // ----------------------------------------------------------

    if (data && !data.firedrillAttempts) {
      data.firedrillAttempts = [];

      this.saveData(data);
    }

    return data;
  },


  saveData(data) {

    const email = this.currentUserEmail();

    if (!email) {
      return;
    }

    this._write(
      DB_PREFIX + email,
      data
    );
  },


  // ============================================================
  // NORMAL QUIZ
  // ============================================================

  recordQuiz(category, score, total) {

    const d = this.getData();

    if (!d) {
      return;
    }

    if (!d.quizAttempts) {
      d.quizAttempts = [];
    }

    d.quizAttempts.push({

      category: category,

      score: score,

      total: total,

      date: Date.now()

    });

    this.saveData(d);
  },


  // ============================================================
  // MEMBER 3 — FIREDRILL
  // ============================================================

  recordFireDrill(attempt) {

    const d = this.getData();

    if (!d) {
      return;
    }

    // Make sure old users also have this array.
    if (!d.firedrillAttempts) {
      d.firedrillAttempts = [];
    }

    d.firedrillAttempts.push({

      category: attempt.category,

      score: attempt.score,

      total: attempt.total,

      percentage: attempt.percentage,

      date: Date.now()

    });

    this.saveData(d);
  },


  // ============================================================
  // INTERVIEW
  // ============================================================

  rateInterviewQuestion(qId, rating) {

    const d = this.getData();

    if (!d) {
      return;
    }

    if (!d.interviewRatings[qId]) {
      d.interviewRatings[qId] = [];
    }

    d.interviewRatings[qId].push(rating);

    this.saveData(d);
  },


  // ============================================================
  // READINESS CHECKLIST
  // ============================================================

  toggleChecklist(itemId) {

    const d = this.getData();

    if (!d) {
      return false;
    }

    d.checklist[itemId] = !d.checklist[itemId];

    this.saveData(d);

    return d.checklist[itemId];
  },


  // ============================================================
  // STUDY PLANNER
  // ============================================================

  togglePlanner(taskId) {

    const d = this.getData();

    if (!d) {
      return false;
    }

    d.planner[taskId] = !d.planner[taskId];

    this.saveData(d);

    return d.planner[taskId];
  },


  addCustomTask(text) {

    const d = this.getData();

    if (!d) {
      return null;
    }

    const id = "custom_" + Date.now();

    d.customTasks.push({

      id: id,

      text: text

    });

    this.saveData(d);

    return id;
  },


  removeCustomTask(id) {

    const d = this.getData();

    if (!d) {
      return;
    }

    d.customTasks =
      d.customTasks.filter(
        t => t.id !== id
      );

    delete d.planner[id];

    this.saveData(d);
  },


  // ============================================================
  // TARGET DATE
  // ============================================================

  setTargetDate(dateStr) {

    const d = this.getData();

    if (!d) {
      return;
    }

    d.targetDate = dateStr;

    this.saveData(d);
  }

};