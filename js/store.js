
/* =====================================================
   PREPMATE — LOCAL DATA STORE
   Authentication, student progress and career selection

   NOTE:
   This uses localStorage and is intended for a
   browser-based prototype, not production authentication.
===================================================== */

const DB_USERS = "prepmate_users";
const DB_SESSION = "prepmate_session";
const DB_PREFIX = "prepmate_data_";

const Store = {

  // ==============================
  // LOCAL STORAGE HELPERS
  // ==============================

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

  // Existing prototype password hash.
  // Retained for compatibility with existing accounts.
  // NOT cryptographically secure.
  _hash(str) {
    let h = 0;

    for (let i = 0; i < str.length; i++) {
      h = (
        Math.imul(31, h) + str.charCodeAt(i)
      ) | 0;
    }

    return (
      "h" +
      Math.abs(h).toString(36) +
      str.length
    );
  },

  // ==============================
  // USER MANAGEMENT
  // ==============================

  getUsers() {
    return this._read(DB_USERS, {});
  },

  saveUsers(users) {
    this._write(DB_USERS, users);
  },

  signup({
    name,
    email,
    password,
    branch,
    gradYear,
    targetRole
  }) {

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

      // New career-selection fields
      careerId: "",
      careerSelectedAt: null,

      createdAt: Date.now()
    };

    this.saveUsers(users);

    this.initUserData(key);

    return {
      ok: true
    };
  },

  // ==============================
  // LOGIN AND LOGOUT
  // ==============================

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

    const session = this._read(
      DB_SESSION,
      null
    );

    return session
      ? session.email
      : null;
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

    if (!this.currentUser()) {
      window.location.href = "index.html";
    }
  },

  // ==============================
  // CAREER PATH MANAGEMENT
  // ==============================

  setCareerPath(careerId, careerName) {

    const email = this.currentUserEmail();

    if (!email) {
      return false;
    }

    const users = this.getUsers();

    if (!users[email]) {
      return false;
    }

    if (
      typeof careerId !== "string" ||
      !careerId.trim() ||
      typeof careerName !== "string" ||
      !careerName.trim()
    ) {
      return false;
    }

    // Update the student's career profile.
    users[email].careerId = careerId;
    users[email].targetRole = careerName;
    users[email].careerSelectedAt = Date.now();

    this.saveUsers(users);

    return true;
  },

  getCareerPath() {

    const user = this.currentUser();

    if (!user) {
      return "";
    }

    return user.careerId || "";
  },

  getCareerName() {

    const user = this.currentUser();

    if (!user) {
      return "";
    }

    return user.targetRole || "";
  },

  hasSelectedCareer() {

    return Boolean(
      this.getCareerPath()
    );
  },

  // ==============================
  // STUDENT DATA
  // ==============================

  initUserData(email) {

    const key = DB_PREFIX + email;

    if (!localStorage.getItem(key)) {

      this._write(key, {

        quizAttempts: [],

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

    if (!email) {
      return null;
    }

    this.initUserData(email);

    return this._read(
      DB_PREFIX + email,
      null
    );
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

  // ==============================
  // QUIZ MANAGEMENT
  // ==============================

  recordQuiz(category, score, total) {

    const data = this.getData();

    if (!data) {
      return;
    }

    data.quizAttempts.push({

      category: category,

      score: score,

      total: total,

      date: Date.now()

    });

    this.saveData(data);
  },

  // ==============================
  // INTERVIEW MANAGEMENT
  // ==============================

  rateInterviewQuestion(questionId, rating) {

    const data = this.getData();

    if (!data) {
      return;
    }

    if (!data.interviewRatings[questionId]) {

      data.interviewRatings[questionId] = [];

    }

    data.interviewRatings[questionId].push(
      rating
    );

    this.saveData(data);
  },

  // ==============================
  // CHECKLIST MANAGEMENT
  // ==============================

  toggleChecklist(itemId) {

    const data = this.getData();

    if (!data) {
      return false;
    }

    data.checklist[itemId] =
      !data.checklist[itemId];

    this.saveData(data);

    return data.checklist[itemId];
  },

  // ==============================
  // STUDY PLANNER
  // ==============================

  togglePlanner(taskId) {

    const data = this.getData();

    if (!data) {
      return false;
    }

    data.planner[taskId] =
      !data.planner[taskId];

    this.saveData(data);

    return data.planner[taskId];
  },

  // ==============================
  // CUSTOM STUDY TASKS
  // ==============================

  addCustomTask(text) {

    const data = this.getData();

    if (!data) {
      return null;
    }

    const id =
      "custom_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 7);

    data.customTasks.push({

      id: id,

      text: text

    });

    this.saveData(data);

    return id;
  },

  removeCustomTask(id) {

    const data = this.getData();

    if (!data) {
      return;
    }

    data.customTasks =
      data.customTasks.filter(
        task => task.id !== id
      );

    delete data.planner[id];

    this.saveData(data);
  },

  // ==============================
  // TARGET PLACEMENT DATE
  // ==============================

  setTargetDate(dateStr) {

    const data = this.getData();

    if (!data) {
      return;
    }

    data.targetDate = dateStr;

    this.saveData(data);
  }

};