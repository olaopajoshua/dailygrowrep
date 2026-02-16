const signupBtn = document.querySelector(".main-btn");

signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const fullName = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelectorAll('input[type="password"]')[0].value;
  const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      window.location.href = "signin.html";
    }
  } catch (error) {
    alert("Something went wrong");
    console.error(error);
  }
});
