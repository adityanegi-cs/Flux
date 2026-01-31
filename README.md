## Flux
Flux is a gamified budgeting and habit-tracking web application designed for college students to help them manage their monthly allowance, build healthy habits, and save money consistently.

## 1.Problem Statement :
College students often struggle with impulsive spending, irregular habits (late sleep, outside food, unnecessary expenses), and lack of financial discipline. Existing finance apps are either too complex or not tailored for student life.  
**Flux** addresses this problem by enforcing a backend-controlled savings rule and motivating students through habits, points, and gamification.

## 2.Architecture Diagram :
[ Frontend (Browser) ] -> API Requests (fetch) ->[ Backend (Node.js + Express) ] -> Business Logic (60% savings rule) ->[ In-Memory Data Store ]

---

## 3.Tech Stack :

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

## 4.Setup Instructions (Local) :

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

## 5.AI Tools Used :

- **ChatGPT** was used for:
  - Problem ideation and refinement
  - Backend architecture and API design
  - Business logic formulation (60% savings rule)
  - Code refactoring and error resolution
  - Documentation and README preparation

---

## 6.Prompt Strategy Summary :

We followed an **iterative prompt-driven development approach**:

1. Defined a real-world student finance problem  
2. Designed a clean frontend–backend system architecture  
3. Shifted all critical business logic to the backend  
4. Refined prompts based on correctness, feasibility, and scalability  
5. Ensured clarity and reproducibility in final outputs  

Prompts were continuously improved to avoid overengineering and maintain simplicity.

---

## 7.Source Code Structure :

flux/
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
└── backend/
├── server.js
└── package.json
└── package-lock.json

## 8.Final Output :

- Fully working full-stack web application  
- Backend-enforced rule: users must save at least **60%** of their allowance  
- Habit-based gamification system  
- Ready for local testing and deployment  

---

## 9.Reproducibility Instructions :

Follow these steps to reproduce and run the project from scratch:

## a. Clone the repository
```bash
git clone https://github.com/your-username/flux.git
cd flux
```

## b. Install backend dependencies :
cd backend
npm install

## c. Start the backend server :
node server.js

## Backend will run on:

http://localhost:3000

## d. Run the frontend

Open frontend/index.html using Live Server in VS Code.

Ensure the backend is running before interacting with the UI.
