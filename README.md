## Flux
Flux is a gamified budgeting and habit-tracking web application designed for college students to help them manage their monthly allowance, build healthy habits, and save money consistently.

## Problem Statement :
College students often struggle with impulsive spending, irregular habits (late sleep, outside food, unnecessary expenses), and lack of financial discipline. Existing finance apps are either too complex or not tailored for student life.  
**Flux** addresses this problem by enforcing a backend-controlled savings rule and motivating students through habits, points, and gamification.

## Architecture Diagram :
[ Frontend (Browser) ]
|
| API Requests (fetch)
v
[ Backend (Node.js + Express) ]
|
| Business Logic (60% savings rule)
v
[ In-Memory Data Store ]

---

## Tech Stack

 Frontend
- HTML
- CSS
- JavaScript

 Backend
- Node.js
- Express.js

 Tools & Platforms
- VS Code
- GitHub
- Netlify (Frontend Deployment)
- Render (Backend Deployment)

---

## Setup Instructions (Local)

Prerequisites
- Node.js (LTS version)
- VS Code
- Browser (Chrome recommended)

 Backend Setup
 
```bash
cd backend
npm install
node server.js
```
Backend will run on:
http://localhost:3000
Frontend Setup
Open frontend/index.html using Live Server in VS Code.

## AI Tools Used

- **ChatGPT** was used for:
  - Problem ideation and refinement
  - Backend architecture and API design
  - Business logic formulation (60% savings rule)
  - Code refactoring and error resolution
  - Documentation and README preparation

---

## Prompt Strategy Summary

We followed an **iterative prompt-driven development approach**:

1. Defined a real-world student finance problem  
2. Designed a clean frontend–backend system architecture  
3. Shifted all critical business logic to the backend  
4. Refined prompts based on correctness, feasibility, and scalability  
5. Ensured clarity and reproducibility in final outputs  

Prompts were continuously improved to avoid overengineering and maintain simplicity.

---

## Source Code Structure

flux/
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
└── backend/
├── server.js
└── package.json

## Final Output

- Fully working full-stack web application  
- Backend-enforced rule: users must save at least **60%** of their allowance  
- Habit-based gamification system  
- Ready for local testing and deployment  

---

## Build Reproducibility Instructions (Mandatory)

Follow these steps to reproduce and run the project from scratch:

## Clone the repository
```bash
git clone https://github.com/your-username/flux.git
cd flux
```

## Install backend dependencies
cd backend
npm install

## Start the backend server
node server.js