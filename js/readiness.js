/* ==========================================================================
   PrepMate — readiness and assessment intelligence

   Includes:
   - overall readiness score
   - quiz average
   - category-wise quiz average
   - interview confidence
   - planner completion
   - checklist completion
   - weakest area
   - weak topic detection
   ========================================================================== */


const Readiness = {


  /* ================================================================
     QUIZ AVERAGE
     ================================================================ */

  quizAverage(data) {

    if (!data.quizAttempts.length) {
      return null;
    }

    const totalScore =
      data.quizAttempts.reduce(
        (sum, attempt) =>
          sum + attempt.score,
        0
      );


    const totalMax =
      data.quizAttempts.reduce(
        (sum, attempt) =>
          sum + attempt.total,
        0
      );


    return totalMax
      ? Math.round(
          (totalScore / totalMax) * 100
        )
      : null;

  },


  /* ================================================================
     QUIZ AVERAGE BY CATEGORY
     ================================================================ */

  quizAverageByCategory(data, category) {

    const attempts =
      data.quizAttempts.filter(
        attempt =>
          attempt.category === category
      );


    if (!attempts.length) {
      return null;
    }


    const totalScore =
      attempts.reduce(
        (sum, attempt) =>
          sum + attempt.score,
        0
      );


    const totalMax =
      attempts.reduce(
        (sum, attempt) =>
          sum + attempt.total,
        0
      );


    return totalMax
      ? Math.round(
          (totalScore / totalMax) * 100
        )
      : null;

  },


  /* ================================================================
     INTERVIEW AVERAGE
     ================================================================ */

  interviewAverage(data) {

    const ids =
      Object.keys(
        data.interviewRatings
      );


    if (!ids.length) {
      return null;
    }


    let sum = 0;

    let count = 0;


    ids.forEach(id => {

      data.interviewRatings[id]
        .forEach(rating => {

          sum += rating;

          count++;

        });

    });


    if (!count) {
      return null;
    }


    return Math.round(
      (sum / count) / 5 * 100
    );

  },


  /* ================================================================
     PLANNER COMPLETION
     ================================================================ */

  plannerCompletion(data) {

    const allTaskIds = [];


    PLANNER_TRACKS.forEach(
      track => {

        track.tasks.forEach(
          task => {

            allTaskIds.push(
              task.id
            );

          }
        );

      }
    );


    data.customTasks.forEach(
      task => {

        allTaskIds.push(
          task.id
        );

      }
    );


    if (!allTaskIds.length) {
      return 0;
    }


    const done =
      allTaskIds.filter(
        id => data.planner[id]
      ).length;


    return Math.round(
      (done / allTaskIds.length) * 100
    );

  },


  /* ================================================================
     CHECKLIST COMPLETION
     ================================================================ */

  checklistCompletion(data) {

    const done =
      CHECKLIST_ITEMS.filter(
        item =>
          data.checklist[item.id]
      ).length;


    return Math.round(
      (done / CHECKLIST_ITEMS.length) * 100
    );

  },


  /* ================================================================
     OVERALL READINESS
     ================================================================ */

  overall(data) {

    const parts = [

      this.quizAverage(data),

      this.interviewAverage(data),

      this.plannerCompletion(data),

      this.checklistCompletion(data)

    ];


    const known =
      parts.filter(
        value =>
          value !== null
      );


    if (!known.length) {
      return 0;
    }


    /*
      Areas that are not attempted
      count as 0.
    */

    const sum =
      parts.reduce(
        (total, value) =>
          total +
          (value === null ? 0 : value),
        0
      );


    return Math.round(
      sum / 4
    );

  },


  /* ================================================================
     READINESS BAND
     ================================================================ */

  band(score) {

    if (score >= 75) {

      return {
        label: "On track",
        cls: "tag-green"
      };

    }


    if (score >= 45) {

      return {
        label: "Building up",
        cls: "tag-amber"
      };

    }


    return {
      label: "Needs focus",
      cls: "tag-red"
    };

  },


  /* ================================================================
     WEAKEST AREA
     ================================================================ */

  weakestArea(data) {

    const areas = [

      {
        key: "Quantitative Aptitude",

        val:
          this.quizAverageByCategory(
            data,
            "aptitude"
          )
      },

      {
        key: "Core Technical",

        val:
          this.quizAverageByCategory(
            data,
            "technical"
          )
      },

      {
        key: "Coding Logic",

        val:
          this.quizAverageByCategory(
            data,
            "coding_logic"
          )
      },

      {
        key: "Verbal & English",

        val:
          this.quizAverageByCategory(
            data,
            "verbal"
          )
      }

    ].filter(
      area =>
        area.val !== null
    );


    if (!areas.length) {
      return null;
    }


    areas.sort(
      (a, b) =>
        a.val - b.val
    );


    return areas[0];

  },


  /* ================================================================
     WEAK TOPIC DETECTION
     ================================================================

     A topic is considered weak when
     accuracy is below 60%.

     Example:

     Technical      40%  -> Weak
     Aptitude       80%  -> Good
     Coding Logic   50%  -> Weak

     ================================================================ */

  weakTopics(data) {

    const categories = [

      {
        key: "aptitude",

        label:
          "Quantitative Aptitude"
      },

      {
        key: "technical",

        label:
          "Core Technical"
      },

      {
        key: "coding_logic",

        label:
          "Coding Logic"
      },

      {
        key: "verbal",

        label:
          "Verbal & English"
      }

    ];


    const weakTopics = [];


    categories.forEach(
      category => {

        const accuracy =
          this.quizAverageByCategory(
            data,
            category.key
          );


        /*
          Ignore categories that
          have not been attempted.
        */

        if (accuracy === null) {
          return;
        }


        /*
          Below 60% = weak topic.
        */

        if (accuracy < 60) {

          weakTopics.push({

            key:
              category.key,

            label:
              category.label,

            accuracy:
              accuracy

          });

        }

      }
    );


    /*
      Lowest accuracy first.
    */

    weakTopics.sort(
      (a, b) =>
        a.accuracy - b.accuracy
    );


    return weakTopics;

  },


  /* ================================================================
     FIREDRILL AVERAGE
     ================================================================ */

  fireDrillAverage(data) {

    const attempts =
      data.firedrillAttempts || [];


    if (!attempts.length) {
      return null;
    }


    const total =
      attempts.reduce(
        (sum, attempt) =>
          sum +
          (Number(
            attempt.percentage
          ) || 0),
        0
      );


    return Math.round(
      total / attempts.length
    );

  },


  /* ================================================================
     FIREDRILL BEST SCORE
     ================================================================ */

  fireDrillBest(data) {

    const attempts =
      data.firedrillAttempts || [];


    if (!attempts.length) {
      return null;
    }


    return Math.max(
      ...attempts.map(
        attempt =>
          Number(
            attempt.percentage
          ) || 0
      )
    );

  },


  /* ================================================================
     FIREDRILL ATTEMPT COUNT
     ================================================================ */

  fireDrillAttempts(data) {

    const attempts =
      data.firedrillAttempts || [];


    return attempts.length;

  }

};