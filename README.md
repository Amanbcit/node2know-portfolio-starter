# Node A01 — Portfolio Launchpad

**Author:** Amandeep Singh  
**Stack:** Node.js · Express · Vanilla JS · Plain CSS

Express server serving HTML pages, static assets, and a JSON API for project data rendered dynamically with `fetch()`.

---

## Setup

```bash
npm install
npm run dev        # watch mode
npm start          # production
```

Open [http://localhost:3000]

---

## Routes

| Method | Path                | Description                          |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/`                 | Home page                            |
| GET    | `/about`            | About page                           |
| GET    | `/projects`         | Projects page (client-rendered)      |
| GET    | `/contact`          | Contact form                         |
| POST   | `/contact`          | Submit contact form → JSON response  |
| GET    | `/api/projects`     | List active projects (supports `?q=`)|
| GET    | `/api/projects/:id` | Single project by ID                 |

---

## Project Structure

```
server.js                         ← entry point + middleware
src/server/routes/pageRouter.js   ← page routes + contact POST
src/server/routes/apiRouter.js    ← /api routes
src/pages/*.html                  ← HTML pages (index, about, projects, contact)
public/css/styles.css             ← single stylesheet
public/js/projects.js             ← fetch + render project cards/details
public/js/contact.js              ← fetch-based contact form
public/images/projects/<slug>/    ← cover.png + screen.png per project
data/projects.json                ← 6 projects (SSD-aligned themes)
```

---

## Middleware

`morgan('dev')` · `express.static('public')` · `express.json()` · `express.urlencoded({ extended: true })`

---

## 404 Handling

- `/api/*` → `{ "error": "Not found" }` (JSON)
- Everything else → `404 — Page not found` (text)

---

## AI Usage

See [`ai-interaction-log.txt`](ai-interaction-log.txt).

---

## License (Required)

Licensed under **Node2Know Learner License 1.0** (`Node2Know-LEARN-1.0`).

## Attribution (Required)

Starter code and assignment materials © **Joshua Solomon**, used under **Node2Know-LEARN-1.0**.  
This repository contains student modifications built on the provided Node2Know starter.
