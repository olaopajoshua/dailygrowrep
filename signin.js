const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("loginBtn");

signInBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("https://dailygrow-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    alert("Login successful!");

    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("Cannot connect to server");
  }
});
