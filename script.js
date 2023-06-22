let balance = 0;
let currentUser = null;

function showLoginPage() {
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("signUpPage").style.display = "none";
  document.getElementById("mainPage").style.display = "none";
}

function showSignUp() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signUpPage").style.display = "block";
  document.getElementById("mainPage").style.display = "none";
}

function showMainPage() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signUpPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("usernameDisplay").innerText = currentUser;
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulating user account retrieval from database
  const account = retrieveUserAccount(username);
  if (account && account.password === password) {
    currentUser = username;
    showMainPage();
    updateBalance();
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("Invalid username or password");
  }
}

function createAccount() {
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  // Simulating user account creation and storage in the database
  const account = retrieveUserAccount(newUsername);
  if (account) {
    alert("Username already exists. Please choose a different username.");
  } else {
    createUserAccount(newUsername, newPassword);
    alert("Account created successfully. Please login to continue.");
    showLoginPage();
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
  }
}

function retrieveUserAccount(username) {
  // Simulating retrieval of user account from database (file-based approach)
  const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
  if (storedAccounts) {
    return storedAccounts.find((account) => account.username === username);
  }
  return null;
}

function createUserAccount(username, password) {
  // Simulating creation and storage of user account in the database (file-based approach)
  const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
  const newAccount = {
    username: username,
    password: password
  };
  if (storedAccounts) {
    storedAccounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(storedAccounts));
  } else {
    localStorage.setItem("accounts", JSON.stringify([newAccount]));
  }
}

function logout() {
  currentUser = null;
  showLoginPage();
}

function updateBalance() {
  const balanceElement = document.getElementById("balance");
  balanceElement.innerText = balance.toFixed(2);
}

function deposit() {
  if (currentUser === null) {
    alert("Please login to perform transactions");
    return;
  }

  const amountElement = document.getElementById("amount");
  const amount = parseFloat(amountElement.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount");
    return;
  }
  balance += amount;
  updateBalance();
  amountElement.value = "";
}

function withdraw() {
  if (currentUser === null) {
    alert("Please login to perform transactions");
    return;
  }

  const amountElement = document.getElementById("amount");
  const amount = parseFloat(amountElement.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount");
    return;
  }
  if (amount > balance) {
    alert("Insufficient balance");
    return;
  }
  balance -= amount;
  updateBalance();
  amountElement.value = "";
}

showLoginPage();
