let points = 0;

function show(id) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

async function setAllowance() {
  const allowance = document.getElementById("allowance").value;

  const res = await fetch("http://localhost:3000/allowance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ allowance })
  });

  const data = await res.json();
  document.getElementById("status").innerText = data.message;
}

async function addExpense() {
  const amount = document.getElementById("amount").value;

  const res = await fetch("http://localhost:3000/expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  const data = await res.json();
  document.getElementById("status").innerText = data.message;

  if (data.allowed) {
    const li = document.createElement("li");
    li.innerText = `₹${amount}`;
    document.getElementById("expenseList").appendChild(li);
    points += 5;
  }

  document.getElementById("points").innerText = points;
}

function habit(box) {
  points += box.checked ? 10 : -10;
  document.getElementById("points").innerText = points;
}
