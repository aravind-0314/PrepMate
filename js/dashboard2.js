
/* =====================================================
   PREPMATE DASHBOARD 2.0
   Career Path + Readiness + Analytics + Study Planner
===================================================== */

(function () {
  "use strict";

  Store.requireAuth();

  const user = Store.currentUser();
  if (!user) return;

  const data = Store.getData();
  if (!data) return;

  const $ = id => document.getElementById(id);

  function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
  }

  function percent(value) {
    return Math.max(
      0,
      Math.min(100, Number(value) || 0)
    );
  }

  // =====================================
  // 1. STUDENT DETAILS
  // =====================================

  const firstName = (user.name || "Student")
    .trim()
    .split(/\s+/)[0];

  setText("navUserName", user.name || "Student");
  setText("greeting", "Welcome back, " + firstName);

  setText(
    "todayDate",
    new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  );

  // =====================================
  // 2. SELECTED CAREER PATH
  // =====================================

  const availableCareers =
    typeof CAREER_PATHS !== "undefined"
      ? CAREER_PATHS
      : [];

  const selectedCareer = availableCareers.find(
    career => career.id === user.careerId
  );

  const careerSkillList = $("careerSkillList");

  if (selectedCareer) {
    setText("careerCardTitle", selectedCareer.name);

    setText(
      "careerDescription",
      selectedCareer.description
    );

    setText(
      "careerIcon",
      selectedCareer.icon || "◎"
    );

    setText("careerStatus", "PATH SELECTED");
    setText("careerAction", "Change Career →");

    careerSkillList.replaceChildren();

    (selectedCareer.skills || [])
      .forEach(skill => {
        const tag = document.createElement("span");
        tag.className = "career-skill-tag";
        tag.textContent = skill;
        careerSkillList.appendChild(tag);
      });

  } else if (user.careerId) {
    // A previously saved career is not in the current
    // career definitions. Preserve its saved name.
    setText(
      "careerCardTitle",
      user.targetRole || "Your selected career"
    );

    setText(
      "careerDescription",
      "Review or update your career path."
    );

    setText("careerStatus", "PATH SELECTED");
    setText("careerAction", "Change Career →");

  } else {
    setText(
      "careerCardTitle",
      "Choose your career path"
    );

    setText(
      "careerDescription",
      "Select Full Stack Development, Software Testing, " +
      "AI/ML or another career to explore its required skills."
    );

    setText("careerStatus", "NOT SELECTED");
    setText("careerAction", "Choose Career →");
  }

  // =====================================
  // 3. PLACEMENT READINESS
  // =====================================

  const score = percent(Readiness.overall(data));
  const band = Readiness.band(score);

  setText("scoreVal", score);
  setText("scoreBand", band.label);

  $("scoreBand").className = "tag " + band.cls;

  $("scoreRing").setAttribute(
    "aria-label",
    "Placement readiness: " + score + " out of 100"
  );

  if (score >= 75) {
    setText(
      "readinessMessage",
      "Your preparation is progressing"
    );
  } else if (score >= 45) {
    setText(
      "readinessMessage",
      "Keep building your skills"
    );
  } else {
    setText(
      "readinessMessage",
      "Build your preparation momentum"
    );
  }

  // Animated readiness ring
  const circumference = 2 * Math.PI * 68;
  const arc = $("scoreArc");

  arc.style.strokeDasharray = circumference;
  arc.style.strokeDashoffset = circumference;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      arc.style.strokeDashoffset =
        circumference * (1 - score / 100);
    });
  });

  // =====================================
  // 4. READINESS BREAKDOWN
  // =====================================

  const quizAverage =
    Readiness.quizAverage(data);

  const interviewAverage =
    Readiness.interviewAverage(data);

  const plannerCompletion =
    Readiness.plannerCompletion(data);

  const checklistCompletion =
    Readiness.checklistCompletion(data);

  setText(
    "quizScore",
    quizAverage === null
      ? "—"
      : quizAverage + "%"
  );

  setText(
    "interviewScore",
    interviewAverage === null
      ? "—"
      : interviewAverage + "%"
  );

  setText(
    "plannerScore",
    plannerCompletion + "%"
  );

  setText(
    "checklistScore",
    checklistCompletion + "%"
  );

  // =====================================
  // 5. STATISTICS
  // =====================================

  const attempts = Array.isArray(data.quizAttempts)
    ? data.quizAttempts
    : [];

  setText("statQuizzes", attempts.length);

  const ratings = data.interviewRatings || {};

  setText(
    "statInterview",
    Object.keys(ratings).length
  );

  setText(
    "statPlanner",
    plannerCompletion + "%"
  );

  if (data.targetDate) {
    // Parse YYYY-MM-DD as a local calendar date.
    const parts = data.targetDate
      .split("-")
      .map(Number);

    const target = new Date(
      parts[0],
      parts[1] - 1,
      parts[2]
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = Math.ceil(
      (target - today) / 86400000
    );

    setText(
      "statDays",
      Number.isFinite(days)
        ? days >= 0
          ? days
          : "Past"
        : "—"
    );
  } else {
    setText("statDays", "—");
  }

  // =====================================
  // 6. RECOMMENDED FOCUS
  // =====================================

  const weakest = Readiness.weakestArea(data);

  if (weakest) {
    setText("focusTitle", weakest.key);

    setText(
      "focusDescription",
      "Your current score in " +
      weakest.key +
      " is " +
      weakest.val +
      "%. Practice this category to strengthen " +
      "your preparation."
    );

  } else {
    setText(
      "focusTitle",
      "Start your first quiz"
    );

    setText(
      "focusDescription",
      "Complete an assessment to identify your " +
      "strongest and weakest skills."
    );
  }

  // =====================================
  // 7. SKILL PERFORMANCE
  // =====================================

  const skills = [
    {
      name: "Quantitative Aptitude",
      category: "aptitude"
    },
    {
      name: "Core Technical",
      category: "technical"
    },
    {
      name: "Coding Logic",
      category: "coding_logic"
    },
    {
      name: "Verbal & English",
      category: "verbal"
    }
  ];

  const skillContainer = $("skillBars");
  skillContainer.replaceChildren();

  skills.forEach(skill => {
    const value = Readiness.quizAverageByCategory(
      data,
      skill.category
    );

    const item = document.createElement("div");
    item.className = "skill-item";

    const heading = document.createElement("div");
    heading.className = "skill-heading";

    const name = document.createElement("span");
    name.textContent = skill.name;

    const result = document.createElement("strong");
    result.textContent =
      value === null ? "—" : value + "%";

    heading.append(name, result);

    const track = document.createElement("div");
    track.className = "skill-track";

    const fill = document.createElement("div");
    fill.className = "skill-fill";

    track.appendChild(fill);
    item.append(heading, track);

    if (value === null) {
      const note = document.createElement("div");
      note.className = "skill-empty";
      note.textContent = "Not attempted yet";
      item.appendChild(note);
    }

    skillContainer.appendChild(item);

    requestAnimationFrame(() => {
      fill.style.width =
        value === null
          ? "0%"
          : percent(value) + "%";
    });
  });

  // =====================================
  // 8. RECENT QUIZ CHART
  // =====================================

  function drawChart() {
    const svg = $("performanceChart");
    const empty = $("chartEmpty");
    const container = $("chartContainer");

    const recent = attempts
      .filter(attempt =>
        Number(attempt.total) > 0 &&
        Number.isFinite(Number(attempt.score))
      )
      .slice(-7);

    if (!recent.length) {
      container.hidden = true;
      empty.hidden = false;
      return;
    }

    container.hidden = false;
    empty.hidden = true;

    const NS = "http://www.w3.org/2000/svg";

    function element(tag, attributes, text) {
      const node = document.createElementNS(NS, tag);

      Object.entries(attributes || {}).forEach(
        ([key, value]) => node.setAttribute(key, value)
      );

      if (text !== undefined) {
        node.textContent = text;
      }

      return node;
    }

    svg.replaceChildren();

    const left = 44;
    const right = 474;
    const top = 18;
    const bottom = 208;

    [0, 25, 50, 75, 100].forEach(value => {
      const y = bottom -
        (value / 100) * (bottom - top);

      svg.appendChild(element("line", {
        x1: left,
        y1: y,
        x2: right,
        y2: y,
        class: "chart-grid"
      }));

      svg.appendChild(element(
        "text",
        {
          x: 34,
          y: y + 4,
          "text-anchor": "end",
          class: "chart-label"
        },
        value + "%"
      ));
    });

    const values = recent.map(attempt =>
      percent(
        Number(attempt.score) /
        Number(attempt.total) * 100
      )
    );

    const points = values.map((value, index) => {
      const x = recent.length === 1
        ? (left + right) / 2
        : left +
          (index / (recent.length - 1)) *
          (right - left);

      const y = bottom -
        (value / 100) * (bottom - top);

      return { x, y, value };
    });

    if (points.length > 1) {
      const area =
        "M " + points[0].x + " " + bottom +
        " L " +
        points.map(p => p.x + " " + p.y).join(" L ") +
        " L " +
        points[points.length - 1].x + " " + bottom +
        " Z";

      svg.appendChild(element("path", {
        d: area,
        class: "chart-area"
      }));
    }

    svg.appendChild(element("polyline", {
      points: points
        .map(p => p.x + "," + p.y)
        .join(" "),
      class: "chart-line"
    }));

    points.forEach((point, index) => {
      const circle = element("circle", {
        cx: point.x,
        cy: point.y,
        r: 6,
        class: "chart-point"
      });

      circle.appendChild(
        element(
          "title",
          {},
          "Quiz " +
          (attempts.length - recent.length + index + 1) +
          ": " +
          Math.round(point.value) +
          "%"
        )
      );

      svg.appendChild(circle);

      svg.appendChild(element(
        "text",
        {
          x: point.x,
          y: 232,
          "text-anchor": "middle",
          class: "chart-label"
        },
        "Q" + (index + 1)
      ));
    });
  }

  drawChart();

  // =====================================
  // 9. STUDY PLAN
  // =====================================

  setText(
    "studyPercentage",
    plannerCompletion + "%"
  );

  requestAnimationFrame(() => {
    $("studyProgressFill").style.width =
      percent(plannerCompletion) + "%";
  });

  const taskContainer = $("studyTasks");
  const allTasks = [];

  if (typeof PLANNER_TRACKS !== "undefined") {
    PLANNER_TRACKS.forEach(track => {
      (track.tasks || []).forEach(task => {
        allTasks.push(task);
      });
    });
  }

  (data.customTasks || []).forEach(task => {
    allTasks.push(task);
  });

  const orderedTasks = [...allTasks].sort(
    (a, b) =>
      Number(Boolean(data.planner?.[a.id])) -
      Number(Boolean(data.planner?.[b.id]))
  );

  taskContainer.replaceChildren();

  if (!orderedTasks.length) {
    const message = document.createElement("p");
    message.className = "hint";
    message.textContent =
      "No study tasks yet. Open your planner to get started.";

    taskContainer.appendChild(message);

  } else {
    orderedTasks.slice(0, 6).forEach(task => {
      const completed = Boolean(
        data.planner?.[task.id]
      );

      const row = document.createElement("div");
      row.className =
        "study-task" + (completed ? " done" : "");

      const marker = document.createElement("span");
      marker.className = "task-marker";
      marker.textContent = completed ? "✓" : "○";

      const name = document.createElement("span");
      name.className = "task-name";

      name.textContent =
        task.title ||
        task.text ||
        task.name ||
        task.label ||
        "Study task";

      row.append(marker, name);
      taskContainer.appendChild(row);
    });
  }

  // =====================================
  // 10. MOBILE NAVIGATION
  // =====================================

  const menuBtn = $("menuBtn");
  const navLinks = $("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });
  }

  // =====================================
  // 11. SIGN OUT
  // =====================================

  function signOut() {
    Store.logout();
    window.location.href = "index.html";
  }

  $("logoutBtn")?.addEventListener(
    "click",
    signOut
  );

  $("mobileLogoutBtn")?.addEventListener(
    "click",
    signOut
  );

})();