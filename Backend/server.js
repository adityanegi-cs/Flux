const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/*
  users = {
    userId: {
      allowance: number,
      spent: number
    }
  }
*/
const users = {};

// Set allowance for a user
app.post("/allowance", (req, res) => {
  const { userId, allowance } = req.body;

  if (!userId || !allowance) {
    return res.status(400).json({ message: "userId and allowance required" });
  }

  users[userId] = {
    allowance: Number(allowance),
    spent: 0
  };

  res.json({
    message: `Allowance set to ₹${allowance}. You must save at least 60%.`
  });
});

// Add expense for a user
app.post("/expense", (req, res) => {
  const { userId, amount } = req.body;

  if (!users[userId]) {
    return res.status(400).json({ message: "User not found" });
  }

  const user = users[userId];
  const maxSpend = user.allowance * 0.4;

  if (user.spent + amount > maxSpend) {
    return res.json({
      allowed: false,
      message: "❌ Expense denied. Save at least 60% of your allowance."
    });
  }

  user.spent += Number(amount);

  res.json({
    allowed: true,
    message: `✅ Expense added. Remaining spendable: ₹${maxSpend - user.spent}`
  });
});

// Debug route (optional)
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("Flux backend running on http://localhost:3000");
});
