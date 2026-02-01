## TEAM FLUX
## PROMPT TEMPLATE AND PROMPTS USED 

## Backend –  Prompt Templates :
### 1. Problem Ideation Prompt:
“Design a student-focused finance application that encourages saving money through gamification, habit tracking, and rewards, keeping hostel life and limited allowances in mind.”
________________________________________
### 2.Backend Business Logic Prompt:
“Implement backend logic that enforces a rule where students must save at least 60% of their allowance, rejecting or warning transactions that exceed the safe spending limit.”
________________________________________
### 3.AI Motivation Prompt:
“Based on the student’s current savings, spending behavior, and allowance usage, generate a short motivational message that encourages disciplined financial habits in a friendly, non-judgmental tone.”
________________________________________
### 4.Gamification & Rewards Prompt:
“Design a point-based gamification system where users earn points for saving money, maintaining streaks, and completing financial learning tasks, and can redeem points for student-relevant rewards.”
________________________________________
### 5.UX & Student Context Prompt:
“Adapt financial advice and alerts to common student scenarios such as hostel expenses, canteen food, late sleeping habits, and impulsive spending, keeping the language relatable and practical.”
________________________________________
### 6.System Architecture Prompt:
“Propose a simple, reproducible full-stack architecture with a static frontend and a Node.js backend, optimized for hackathon deployment and easy local testing.”

________________________________________
## Frontend –  Prompt Templates :
### 1. The "UI Polish & Bug Fix" Prompt
Use this for: Explaining how you fixed visual glitches and added premium styling to the Rewards section.
Prompt Used:
"I have a Rewards section in my web app that has a visual glitch where the logos are misaligned in the corner, some brand icons (Netflix, Zomato) are missing, and text details disappear when I hover over the card.
Please update the CSS to:
Fix the alignment so elements appear perfectly centered inside the icon circles.
Create a smooth lift-up and glow animation on hover that does not hide the text.
Implement custom styling for Netflix, Spotify, and Steam using their official brand colors (e.g., Green for Spotify, Red for Netflix).
Ensure the layout remains stable when the user interacts with the elements."
### 2. The "Logic & Constraints" Prompt
Use this for: Explaining how you implemented the 40% spending rule and safety locks.
Prompt Used:
"Add a logical constraint to the Add Expense (addEx) feature.
Requirements:
Calculate the user's Total Income vs Total Expenses.
If the user attempts an action that exceeds 40% of their total capacity, trigger a Confirmation Warning Dialog.
Implement a penalty system where they lose 50 XP if they proceed despite the warning.
Update the dashboard to visually display this safe limit."
### 3. The "Content & Structure" Prompt
Use this for: Explaining the Multi-Page Academy and Learning System.
Prompt Used:
"Overhaul the Academy section to support long-form content.
Specifics:
Instead of a simple popup, create a multi-page modal with 4-5 pages of content.
Add 'Previous' and 'Next' navigation buttons.
The 'Reward/Complete' button should only be visible on the final page.
Once a user completes an item, mark it as permanently finished so they cannot farm points."
### 4. The "Gamification & Engagement" Prompt
Use this for: Explaining the Daily Quests, Streaks, and Check-in system.
Prompt Used:
"Add a new section for Daily Quests to increase user retention.
Features:
A Daily Check-In button that resets every 24 hours and rewards the user.
A list of interactive tasks (e.g., Link Instagram, Join Discord, Verify Profile) that can be clicked to simulate completion.
Ensure these actions update the user's total XP and Level immediately."
