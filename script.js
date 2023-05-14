// Get references to important HTML elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const addMoneyBtn = document.getElementById('add');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculateTotal');

// Define an empty array to hold the user data
let data = [];

// Define some initial user data
const user1 = {
  name: 'Ram\'s Walmart',
  money: 200000
};

const user2 = {
  name: 'Aayush\'s Walmart',
  money: 500000
};

const user3 = {
  name: 'Prajaal\'s Walmart',
  money: 8603140
};

// Add the initial user data to the array
addData(user1);
addData(user2);
addData(user3);

// Function to add a new user to the data array
function createNew() {
  const name = prompt('Enter franchise name:');
  const amount = parseInt(prompt('Enter amount:'), 10);

  if (!isNaN(amount) && name !== '') {
    // If the user entered valid data, create a new user object and add it to the array
    const newUser = {
      name: name + " Walmar",
      money: amount,
    };
    addData(newUser);
  } 

  else {
    alert('Please enter valid name and amount.');
  }
}

// Define a function to add 23% to the wealth of all users
function addMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 1.23 };
  });

  updateDOM();
}

// Function is created to sort the users by their wealth
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Show only the millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}
// Function to calculate the total wealth of all users
function calculate() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  // Create a new HTML element to display the total wealth
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

//define a function to add new data to the array and update the HTML
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Update the HTML based on the current state of the data array
function updateDOM(providedData = data) {
  // Clear the existing HTML
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Create a new HTML element for each user and add it to the main element
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Define a function to format the value values in a human-readable
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}

addUserBtn.addEventListener('click', createNew);
addMoneyBtn.addEventListener('click', addMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculate);