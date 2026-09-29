
/* PrepMate — Merged Local Data Store */

const DB_USERS = "prepmate_users";
const DB_SESSION = "prepmate_session";
const DB_PREFIX = "prepmate_data_";

const Store = {
  _read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  },

  _write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  _hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return "h" + Math.abs(h).toString(36) + str.length;
  },

  getUsers() {
    return this._read(DB_USERS, {});
  },

  saveUsers(users) {
    this._write(DB_USERS, users);
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
      careerId: "",
      careerSelectedAt: null,
      createdAt: Date.now()
    };

    this.saveUsers(users);
    this.initUserData(key);

    return { ok: true };
  },

  login(email, password) {
    const users = this.getUsers();
    const key = email.trim().toLowerCase();
    const user = users[key];

    if (!user) {
      return {
        ok: false,
        error: "No account found with that email."
      };
    }

    if (user.password !== this._hash(password)) {
      return {
        ok: false,
        error: "Incorrect password."
      };
    }

    this._write(DB_SESSION, { email: key });
    return { ok: true };
  },

  logout() {
    localStorage.removeItem(DB_SESSION);
  },

  currentUserEmail() {
    const session = this._read(DB_SESSION, null);
    return session ? session.email : null;
  },

  currentUser() {
    const email = this.currentUserEmail();
    if (!email) return null;

    return this.getUsers()[email] || null;
  },

  requireAuth() {
    if (!this.currentUser()) {
      window.location.href = "index.html";
    }
  },

  // Career selection

  setCareerPath(careerId, careerName) {
    const email = this.currentUserEmail();
    if (!email) return false;

    const users = this.getUsers();
    if (!users[email]) return false;

    if (
      typeof careerId !== "string" ||
      !careerId.trim() ||
      typeof careerName !== "string" ||
      !careerName.trim()
    ) {
      return false;
    }

    users[email].careerId = careerId;
    users[email].targetRole = careerName;
    users[email].careerSelectedAt = Date.now();

    this.saveUsers(users);
    return true;
  },

  getCareerPath() {
    const user = this.currentUser();
    return user ? user.careerId || "" : "";
  },

  getCareerName() {
    const user = this.currentUser();
    return user ? user.targetRole || "" : "";
  },

  hasSelectedCareer() {
    return Boolean(this.getCareerPath());
  },

  // Student progress

  initUserData(email) {
    const key = DB_PREFIX + email;

    if (!localStorage.getItem(key)) {
      this._write(key, {
        quizAttempts: [],
        firedrillAttempts: [],
        interviewRatings: {},
        checklist: {},
        planner: {},
        targetDate: "",
        customTasks: []
      });
    }
  },

  getData() {
    const email = this.currentUserEmail();
    if (!email) return null;

    this.initUserData(email);

    const data = this._read(DB_PREFIX + email, null);

    // Upgrade existing accounts without deleting progress.
    if (data && !Array.isArray(data.firedrillAttempts)) {
      data.firedrillAttempts = [];
      this.saveData(data);
    }

    return data;
  },

  saveData(data) {
    const email = this.currentUserEmail();
    if (!email) return;

    this._write(DB_PREFIX + email, data);
  },

  // Normal quizzes

  recordQuiz(category, score, total) {
    const data = this.getData();
    if (!data) return;

    if (!Array.isArray(data.quizAttempts)) {
      data.quizAttempts = [];
    }

    data.quizAttempts.push({
      category,
      score,
      total,
      date: Date.now()
    });

    this.saveData(data);
  },

  // Teammate's FireDrill

  recordFireDrill(attempt) {
    const data = this.getData();
    if (!data) return;

    if (!Array.isArray(data.firedrillAttempts)) {
      data.firedrillAttempts = [];
    }

    data.firedrillAttempts.push({
      category: attempt.category,
      score: attempt.score,
      total: attempt.total,
      percentage: attempt.percentage,
      date: Date.now()
    });

    this.saveData(data);
  },

  // Interview

  rateInterviewQuestion(questionId, rating) {
    const data = this.getData();
    if (!data) return;

    if (!data.interviewRatings[questionId]) {
      data.interviewRatings[questionId] = [];
    }

    data.interviewRatings[questionId].push(rating);
    this.saveData(data);
  },

  // Readiness checklist

  toggleChecklist(itemId) {
    const data = this.getData();
    if (!data) return false;

    data.checklist[itemId] = !data.checklist[itemId];
    this.saveData(data);

    return data.checklist[itemId];
  },

  // Study planner

  togglePlanner(taskId) {
    const data = this.getData();
    if (!data) return false;

    data.planner[taskId] = !data.planner[taskId];
    this.saveData(data);

    return data.planner[taskId];
  },

  addCustomTask(text) {
    const data = this.getData();
    if (!data) return null;

    const id =
      "custom_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 7);

    data.customTasks.push({ id, text });
    this.saveData(data);

    return id;
  },

  removeCustomTask(id) {
    const data = this.getData();
    if (!data) return;

    data.customTasks = data.customTasks.filter(
      task => task.id !== id
    );

    delete data.planner[id];
    this.saveData(data);
  },

  setTargetDate(dateStr) {
    const data = this.getData();
    if (!data) return;

    data.targetDate = dateStr;
    this.saveData(data);
  }
};