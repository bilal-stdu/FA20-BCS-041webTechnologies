const form = document.getElementById("loginForm");

function validate() {
  const username = "mbilalahmed977@gmail.com";
  const password = "123";

  const inputUsername = document.getElementById("email").value;
  const inputPassword = document.getElementById("password").value;

  if (inputUsername === username && inputPassword === password) {
    alert("Authentication successful!");

    window.location.href = "index.html";
  } else {
    alert("Incorrect username or password.");
  }
}

console.log("Hi");
