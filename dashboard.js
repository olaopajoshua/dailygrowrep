const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "signin.html";
}

document.getElementById("welcome").innerText =
  "Welcome back, " + user.fullName;

const levelSelect = document.getElementById("levelSelect");
const taskButtons = document.querySelectorAll(".task-btn");
const taskTexts = document.querySelectorAll(".goal-card p");

let streak = 0;
let completed = 0;
let dailyTasks = [false, false, false];

// ================= TASK LEVEL SETS =================

const taskSets = {
  Beginner: [
    "📖 Read 10 pages",
    "💪 15 min exercise",
    "💻 Practice coding 20 mins"
  ],
  Intermediate: [
    "📖 Read 25 pages",
    "💪 30 min workout",
    "💻 Build small coding project"
  ],
  Advanced: [
    "📖 Read 50 pages",
    "💪 1 hour intense workout",
    "💻 Solve 5 complex coding problems"
  ]
};

// ================= LOAD USER DATA FROM BACKEND =================

async function loadUserData() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      password: user.password // only works if you stored it (optional)
    })
  });

  const data = await res.json();

  streak = data.user.streak;
  completed = data.user.completed;
  dailyTasks = data.user.dailyTasks;
  levelSelect.value = data.user.level;

  document.getElementById("streak").innerText = streak;
  document.getElementById("completed").innerText = completed;

  loadTasks(levelSelect.value);
  updateActiveGoals();
}

function loadTasks(level) {
  const tasks = taskSets[level];

  taskTexts.forEach((text, index) => {
    text.innerText = tasks[index];

    if (dailyTasks[index]) {
      taskButtons[index].classList.add("completed");
      taskButtons[index].innerText = "Completed";
    }
  });
}

function updateActiveGoals() {
  const activeGoals = dailyTasks.filter(task => !task).length;
  document.getElementById("activeGoals").innerText = activeGoals;
}

// ================= SAVE TO BACKEND =================

async function updateUserData() {
  await fetch("http://localhost:5000/api/auth/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user.email,
      streak,
      completed,
      dailyTasks,
      level: levelSelect.value
    })
  });
}

// ================= EVENTS =================

// Daily focus button
document.getElementById("completeBtn").addEventListener("click", async () => {
  streak++;
  completed++;

  document.getElementById("streak").innerText = streak;
  document.getElementById("completed").innerText = completed;

  await updateUserData();
  alert("Challenge completed 🎉");
});

// Task buttons
taskButtons.forEach((btn, index) => {

  btn.addEventListener("click", async () => {

    if (dailyTasks[index]) return;

    dailyTasks[index] = true;

    btn.classList.add("completed");
    btn.innerText = "Completed";

    completed++;
    document.getElementById("completed").innerText = completed;

    updateActiveGoals();

    await updateUserData();
  });

});

// Level change
levelSelect.addEventListener("change", async () => {
  loadTasks(levelSelect.value);
  await updateUserData();
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "signin.html";
});

// Initial load
loadUserData();
