/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info about each game
    gameCard.innerHTML = `
      <img class="game-img" src="${game.img}" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
      <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
      <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
    `;

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
  <h3>Individual Contributions</h3>
  <p>${totalContributions.toLocaleString()}</p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
  <h3>Total Raised</h3>
  <p>$${totalRaised.toLocaleString()}</p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `
  <h3>Number of Games</h3>
  <p>${GAMES_JSON.length.toLocaleString()}</p>
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

  // add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

  // add the funded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// count the number of unfunded games
const unfundedCount = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedString =
  unfundedCount === 1
    ? "There is 1 game that remains unfunded."
    : `There are ${unfundedCount} games that remain unfunded.`;

// create a new DOM element containing the template string and append it
const description = document.createElement("p");
description.innerHTML = `
  We have raised <strong>$${totalRaised.toLocaleString()}</strong> across
  <strong>${GAMES_JSON.length.toLocaleString()}</strong> games.
  ${unfundedString}
`;
descriptionContainer.appendChild(description);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it
const topGameEl = document.createElement("p");
topGameEl.textContent = topGame.name;
firstGameContainer.appendChild(topGameEl);

// do the same for the runner up item
const runnerUpEl = document.createElement("p");
runnerUpEl.textContent = runnerUpGame.name;
secondGameContainer.appendChild(runnerUpEl);
