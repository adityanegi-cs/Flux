const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let allowance = 0;
let spent = 0;

app.post("/allowance", (req, res) => {
  allowance = Number(req.body.allowance);
  spent = 0;

  res.json({
    message: `Allowance set to ₹${allowance}. You must save at least 60%.`
  });
});

app.post("/expense", (req, res) => {
  const amount = Number(req.body.amount);

  const maxSpend = allowance * 0.4;

  if (spent + amount > maxSpend) {
    return res.json({
      allowed: false,
      message: "❌ Expense denied. You must save at least 60% of your allowance."
    });
  }

  spent += amount;

  res.json({
    allowed: true,
    message: `✅ Expense added. Remaining spendable: ₹${maxSpend - spent}`
  });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
