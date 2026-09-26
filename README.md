# PrepMate — Placement Preparation Platform

A self-contained web app that helps students answer four questions during
placement season: **what to prepare, how to prepare, where they stand, and
what to improve next.**

## Running it

No build step, no server, no dependencies to install.

1. Unzip the folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
3. Create an account on the sign-up page — everything is stored locally in
   your browser's `localStorage`, so each browser/device keeps its own data.

To try it fresh, open the file in a private/incognito window, or clear
`localStorage` for the page.

## What it does

- **Sign up / sign in** — a lightweight local account system scoped to the
  browser it runs in. This is a prototype: passwords are not sent anywhere
  and are not protected by production-grade cryptography.
- **Dashboard** — a single readiness score (0–100) blending quiz accuracy,
  mock-interview confidence, study-planner completion and a readiness
  checklist, each weighted 25%. Surfaces the single weakest quiz category
  automatically.
- **Practice zone** — timed multiple-choice quizzes across four tracks:
  Quantitative Aptitude, Core Technical (CS fundamentals), Coding Logic, and
  Verbal/English. Every attempt is saved to a personal history.
- **Mock interview** — a flashcard flow through real HR/behavioural and
  technical interview questions. The student answers out loud, then
  self-rates confidence 1–5; ratings accumulate over repeated attempts.
- **Study planner** — a five-track roadmap (Aptitude, CS Core, DSA, Interview
  Readiness, Resume & Profile) with checkable tasks, a target-date countdown,
  and space to add personal tasks.
- **Progress report** — charts (via Chart.js) showing accuracy by category
  and score trend over time, plus a full readiness breakdown and
  per-question interview confidence.

## Project structure

```
prepmate/
├── index.html          Sign-in page (entry point)
├── signup.html          Account creation
├── dashboard.html        Readiness score + module overview
├── practice.html         Quiz categories and quiz-taking flow
├── interview.html        Mock interview flashcards
├── planner.html          Roadmap, custom tasks, checklist
├── report.html           Charts and self-evaluation breakdown
├── css/base.css          Shared design system
└── js/
    ├── store.js           Auth + localStorage data layer
    ├── content.js         Quiz bank, interview questions, planner/checklist data
    └── readiness.js       Readiness-score calculation
```

## Extending it

The quiz bank, interview questions, and planner tracks all live in
`js/content.js` as plain JavaScript objects/arrays — add more questions or
tracks there without touching any other file. To move this from a
prototype to a real multi-device product, `js/store.js` is the one file
that would be replaced with real API calls to a backend and database.
