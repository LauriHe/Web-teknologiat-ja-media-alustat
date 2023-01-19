"use strict";

const enterGuess = document.querySelector("#enterGuess");
const input = document.querySelector("#inputField");
const submit = document.querySelector("#submit");
const message = document.querySelector("#message");
const text = document.querySelector("#text");
const timeText = document.querySelector("#timer");
const startAgain = document.querySelector("#startAgain");
const computerGuess = document.querySelector("#computerButton");
const computerConfirm = document.querySelector("#computerConfirm");

const min = 0;
const max = 100;
const maxGuesses = 10;
let numberOfGuesses = 0;
let guessedNumbers = [];
let time = 0;
let timerStarted = false;
let interval = 0;

let answer = Math.floor(Math.random() * (max - min + 1) + min);

text.textContent = `Guess a number between ${min} and ${max}. You have ${maxGuesses} guesses in total. Timer starts from first guess.`;

// Display end of game message and reset values
const correctGuess = () => {
  enterGuess.classList.add("hidden");
  startAgain.classList.remove("hidden");
  message.classList.add("hidden");
  clearInterval(interval);
  timerStarted = false;
  text.textContent = `Correct! It took you ${numberOfGuesses} guesses and ${time} seconds.`;
  timeText.textContent = "";
  time = 0;
  numberOfGuesses = 0;
  guessedNumbers = [];
  input.value = "";
};

// Display end of game message and reset values
const tooManyGuesses = () => {
  enterGuess.classList.add("hidden");
  startAgain.classList.remove("hidden");
  message.classList.add("hidden");
  clearInterval(interval);
  timerStarted = false;
  time = 0;
  text.textContent = `You ran out of guesses. The number was ${answer}.`;
  timeText.textContent = "";
  numberOfGuesses = 0;
  guessedNumbers = [];
  input.value = "";
};

// Update timer
const timer = () => {
  time++;
  timeText.textContent = `Time spent: ${time} seconds`;
};

const checkGuess = (guess, computer) => {
  // Start timer if it hasn't been started yet
  if (!timerStarted && !computer) {
    timerStarted = true;
    clearInterval(interval);
    interval = setInterval(timer, 1000);
  }

  // Check if player has run out of guesses
  if (numberOfGuesses === maxGuesses - 1) {
    tooManyGuesses();
    return;
  }

  // Check if player has entered a guess
  if (guess === "") {
    message.textContent = "Please enter a number.";
    return;
  }

  // Check if player has entered a number
  if (isNaN(guess)) {
    message.textContent = "Please enter a number.";
    return;
  }

  // Check if player has entered a number between min and max
  if (guess <= min || guess >= max) {
    message.textContent = `Please enter a number between ${min} and ${max}.`;
    return;
  }

  // Check if player has already guessed that number
  if (guessedNumbers.includes(guess)) {
    message.textContent = "You already guessed that number.";
    return;
  }

  // Check if player's guess is correct
  if (guess >= min && guess <= max) {
    if (guess < answer) {
      numberOfGuesses++;
      guessedNumbers.push(guess);
      message.textContent = `Too low, guesses left: ${
        maxGuesses - numberOfGuesses
      }`;
      return "too low";
    } else if (guess > answer) {
      numberOfGuesses++;
      guessedNumbers.push(guess);
      message.textContent = `Too high, guesses left: ${
        maxGuesses - numberOfGuesses
      }`;
      return "too high";
    } else {
      numberOfGuesses++;
      if (!computer) {
        correctGuess();
      }
      return "correct";
    }
  }
};

const runAlgorithm = (times) => {
  let currentMin = min;
  let currentMax = max;
  let currentNumberOfGuesses = 0;
  let results = [];
  let guessedNumbers = [];

  for (let i = 0; i < times; i++) {
    while (true) {
      let guess = parseInt(Math.floor((currentMin + currentMax) / 2));
      let result = checkGuess(guess, true);
      currentNumberOfGuesses++;
      guessedNumbers.push(guess);

      if (result === "correct") {
        results.push(currentNumberOfGuesses);
        currentNumberOfGuesses = 0;
        break;
      }
      if (result === "too low") {
        currentMin = guess;
      }
      if (result === "too high") {
        currentMax = guess;
      }
    }
    currentMin = min;
    currentMax = max;
    currentNumberOfGuesses = 0;
  }

  if (results.length === 1) {
    text.textContent = `The algorithm took ${results[0]} guesses.`;
    timeText.classList.remove("hidden");
    timeText.textContent = "Guessed numbers: ";
    timeText.textContent += guessedNumbers;
  }

  if (results.length > 1) {
    let max = Math.max(...results);
    let min = Math.min(...results);
    let average = results.reduce((a, b) => a + b) / results.length;
    text.textContent = `The algorithm took ${average} guesses on average.`;
    timeText.classList.remove("hidden");
    timeText.textContent = `The algorithm took minimum of ${min} guesses and maximum of ${max} guesses.`;
  }
  message.classList.add("hidden");
  input.classList.add("hidden");
  computerConfirm.classList.add("hidden");
  startAgain.classList.remove("hidden");
};

// Check the player's guess
submit.addEventListener("click", () => {
  message.textContent = "";
  const guess = parseInt(input.value);
  input.value = "";
  computerGuess.classList.add("hidden");
  checkGuess(guess, false);
});

computerGuess.addEventListener("click", () => {
  submit.classList.add("hidden");
  computerGuess.classList.add("hidden");
  timeText.classList.add("hidden");
  computerConfirm.classList.remove("hidden");
  input.attributes.placeholder.value = "Enter a number";
  text.textContent = "How many times to run the algorithm?";
});

computerConfirm.addEventListener("click", () => {
  const times = parseInt(input.value);
  input.value = "";
  if (times === "") {
    message.textContent = "Please enter a number.";
    return;
  }

  // Check if player has entered a number
  if (isNaN(times)) {
    message.textContent = "Please enter a number.";
    return;
  }

  // Check if player has entered a number between min and max
  if (times <= 0 || times >= 2000) {
    message.textContent = `Please enter a number between 0 and 2000.`;
    return;
  }

  runAlgorithm(times);
});

// Start game again
startAgain.addEventListener("click", () => {
  enterGuess.classList.remove("hidden");
  message.classList.remove("hidden");
  computerGuess.classList.remove("hidden");
  text.classList.remove("hidden");
  input.classList.remove("hidden");
  submit.classList.remove("hidden");
  startAgain.classList.add("hidden");
  computerGuess.classList.remove("hidden");
  answer = Math.floor(Math.random() * (max - min + 1) + min);
  text.textContent = `Guess a number between ${min} and ${max}. You have ${maxGuesses} guesses in total. Timer starts from first guess.`;
  timeText.textContent = "Time spent: 0 seconds";
  message.textContent = "";
});
