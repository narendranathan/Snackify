// Array to store registrations temporarily
let registrations = [];

// Show selected form
function showForm(type) {
document.getElementById('registrationForm').reset();
document.getElementById('loginForm').reset();

if (type === 'registration') {
  document.getElementById('registrationFormSection').style.display = 'block';
  document.getElementById('intro').style.display = 'none';
} else {
  document.getElementById('registrationFormSection').style.display = 'none';
}
if (type === 'login') {
  document.getElementById('loginFormSection').style.display = 'block';
  document.getElementById('intro').style.display = 'none';
} else {
  document.getElementById('loginFormSection').style.display = 'none';
}
}

// Register user
function registerUser(event) {
event.preventDefault();

const username = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const phone = document.getElementById("phone").value.trim();

if (!username || !email || !password || !phone) {
    alert("Please fill in all fields.");
    return;
}

// Check if email already registered
if (registrations.some(user => user.email === email)) {
    alert("This email is already registered.");
    return;
}

registrations.push({ username, email, password, phone });

alert("Registration successful!");
document.getElementById("registrationForm").reset();
showForm('login');
}

// Login user
function loginUser(event) {
event.preventDefault();

const email = document.getElementById("loginEmail").value.trim();
const password = document.getElementById("loginPassword").value.trim();

const user = registrations.find(user => user.email === email && user.password === password);

if (user) {
    alert("Welcome, " + user.username + "!");
    window.location.href = 'recipes.html';
} else {
    alert("Enter valid data.");
}

document.getElementById("loginForm").reset();
}

