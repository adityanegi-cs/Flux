const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * In-memory DB (MVP)
 */
const users = {};

/* ---------- AI LOGIC ---------- */

function generateAIReply(user, message = "") {
  const text = message.toLowerCase();
  const savedPercent =
    ((user.allowance - user.spent) / user.allowance) * 100;

  // Message-aware replies
  if (text.includes("stress") || text.includes("tension")) {
    return "🧠 It’s okay to feel stressed. Small consistent savings reduce pressure. You’re doing fine.";
  }

  if (text.includes("save")) {
    return "💡 Try tracking even small expenses. That habit improves savings quickly.";
  }

  if (text.includes("spent") || text.includes("expense")) {
    return "📊 Reviewing expenses before sleeping helps control spending.";
  }

  // Finance-based logic
  if (savedPercent >= 70) {
    return "🔥 Amazing discipline! You’re saving over 70% of your allowance. Keep this streak alive.";
  }

  if (savedPercent >= 60) {
    return "💪 Good job! You’re meeting the 60% savings goal. Stay consistent.";
  }

  if (savedPercent >= 40) {
    return "⚠️ You’re close to your safe limit. Be mindful with discretionary spending.";
  }

  return "🚨 High spending detected. Pause unnecessary expenses today.";
}

/* ---------- AUTH ---------- */

app.post("/api/signup", (req, res) => {
  const { userId, name, university, allowance } = req.body;

  if (!userId || !allowance || allowance <= 0) {
    return res.status(400).json({ message: "Invalid signup data" });
  }

  users[userId] = {
    name,
    university,
    allowance: Number(allowance),
    balance: Number(allowance),
    spent: 0,
    points: 0,
    streak: 0,
    txs: []
  };

  res.json({ message: "Signup successful", userId });
});

/* ---------- TRANSACTIONS ---------- */

app.post("/api/transaction", (req, res) => {
  const { userId, type, amount } = req.body;
  const user = users[userId];

  if (!user || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid transaction" });
  }

  const maxSpend = user.allowance * 0.4;

  if (type === "expense") {
    if (user.spent + amount > maxSpend) {
      return res.json({
        allowed: false,
        message: "❌ Expense denied. You must save at least 60%."
      });
    }
    user.balance -= amount;
    user.spent += amount;
    user.points += 10;
  }

  if (type === "income") {
    user.balance += amount;
    user.points += 5;
  }

  res.json({
    allowed: true,
    balance: user.balance,
    points: user.points
  });
});

/* ---------- AI CHAT ---------- */

app.post("/api/ai/motivate", (req, res) => {
  const { userId, message } = req.body;
  const user = users[userId];

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const reply = generateAIReply(user, message);

  res.json({
    message: reply,
    points: user.points,
    streak: user.streak
  });
});

/* ---------- SERVER ---------- */

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`⚡ Flux backend running on http://localhost:${PORT}`)
);
