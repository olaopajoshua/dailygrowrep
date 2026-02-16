function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("user", name);
  alert("Welcome to DailyGrow, " + name);
  window.location.href = "index.html";
}

function login() {
  alert("Login successful");
  window.location.href = "index.html";
}
