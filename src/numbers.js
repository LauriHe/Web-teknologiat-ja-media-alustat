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

// Change these to alter the range of numbers and number of guesses
const min = 0;
const max = 100;
const maxGuesses = 10;

// Variables to keep track of the game
let numberOfGuesses = 0;
let guessedNumbers = [];
let time = 0;
let timerStarted = false;
let interval = 0;

// Generate a random number between min and max
let answer = Math.floor(Math.random() * (max - min + 1) + min);

// Display correct min/max values in ui
text.textContent = `Guess a number between ${min} and ${max}. You have ${maxGuesses} guesses in total. Timer starts from first guess.`;

// Display end of game message and reset values
const correctGuess = () => {
  enterGuess.classList.remove("hidden");
  submit.classList.add("hidden");
  input.classList.add("hidden");
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

// Update the timer
const updateTimer = () => {
  time++;
  timeText.textContent = `Time spent: ${time} seconds`;
};

// Check if player's guess is valid
const checkValid = (guess) => {
  // Check if player has run out of guesses
  if (numberOfGuesses === maxGuesses - 1) {
    tooManyGuesses();
    return false;
  }

  // Check if player has entered a guess
  if (guess === "") {
    message.textContent = "Please enter a number.";
    return false;
  }

  // Check if player has entered a number
  if (isNaN(guess)) {
    message.textContent = "Please enter a number.";
    return false;
  }

  // Check if player has entered a number between min and max
  if (guess < min || guess > max) {
    message.textContent = `Please enter a number between ${min} and ${max}.`;
    return false;
  }

  // Check if player has already guessed that number
  if (guessedNumbers.includes(guess)) {
    message.textContent = "You already guessed that number.";
    return false;
  }

  return true;
};

// Check if player's guess is correct
const checkGuess = (guess, computer) => {
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
      // Dont display the normal end of game ui if the computer is guessing
      if (!computer) {
        correctGuess();
      }
      return "correct";
    }
  }
};

// Algorithm to guess the correct number
const runAlgorithm = (times) => {
  let currentMin = min;
  let currentMax = max;
  let currentNumberOfGuesses = 0;
  let lastGuess = 0;
  let results = [];
  let guessedNumbers = [];

  // How many times to run the algorithm
  for (let i = 0; i < times; i++) {
    // Run the algorithm until it guesses the correct number
    // Stop the loop if it takes more than 100 guesses (this is to prevent an infinite loop)
    while (true && currentNumberOfGuesses < 100) {
      // Guess the number halfway between the current min and max
      // Current min and max are updated after each guess depending on the result
      let guess = parseInt(Math.floor((currentMin + currentMax) / 2));

      // This is to prevent the algorithm from getting stuck guessing 99
      if (lastGuess === 99) {
        guess = 100;
      }
      lastGuess = guess;

      // Check the guess
      let result = checkGuess(guess, true);
      currentNumberOfGuesses++;
      guessedNumbers.push(guess);

      // Exit the loop if the guess is correct
      if (result === "correct") {
        results.push(currentNumberOfGuesses);
        currentNumberOfGuesses = 0;
        break;
      }
      // Update the current min and max depending on the result
      if (result === "too low") {
        currentMin = guess;
      }
      if (result === "too high") {
        currentMax = guess;
      }
    }

    // Reset the values for the next run
    currentMin = min;
    currentMax = max;
    currentNumberOfGuesses = 0;
    answer = Math.floor(Math.random() * (max - min + 1) + min);
  }

  // If the algorithm was run only once, display the results
  if (results.length === 1) {
    text.textContent = `The algorithm took ${results[0]} guesses.`;
    timeText.classList.remove("hidden");
    timeText.textContent = "Guessed numbers: ";
    timeText.textContent += guessedNumbers;
  }

  // If the algorithm was run more than once, display the average, min and max
  if (results.length > 1) {
    let max = Math.max(...results);
    let min = Math.min(...results);
    let average = parseInt(results.reduce((a, b) => a + b) / results.length);
    text.textContent = `The algorithm took ${average} guesses on average.`;
    timeText.classList.remove("hidden");
    timeText.textContent = `The algorithm took minimum of ${min} guesses and maximum of ${max} guesses.`;
  }

  // Change the ui
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

  // Start timer
  timerStarted = true;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);

  // Check if guess is valid then check if it is correct
  if (checkValid(guess)) {
    checkGuess(guess, false);
  }
});

// Show ui to enter how many times the algorithm should run
computerGuess.addEventListener("click", () => {
  submit.classList.add("hidden");
  computerGuess.classList.add("hidden");
  timeText.classList.add("hidden");
  computerConfirm.classList.remove("hidden");
  input.attributes.placeholder.value = "Enter a number";
  text.textContent = "How many times to run the algorithm?";
});

// Check how many times to run the algorithm
computerConfirm.addEventListener("click", () => {
  const times = parseInt(input.value);
  input.value = "";

  // Check if player has entered a value
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
  if (times < 1 || times > 5000) {
    message.textContent = `Please enter a number between 0 and 5000.`;
    return;
  }

  runAlgorithm(times);
});

// Start game again
startAgain.addEventListener("click", () => {
  // hide and show elements
  enterGuess.classList.remove("hidden");
  message.classList.remove("hidden");
  computerGuess.classList.remove("hidden");
  text.classList.remove("hidden");
  input.classList.remove("hidden");
  submit.classList.remove("hidden");
  startAgain.classList.add("hidden");
  computerGuess.classList.remove("hidden");

  // reset text
  text.textContent = `Guess a number between ${min} and ${max}. You have ${maxGuesses} guesses in total. Timer starts from first guess.`;
  timeText.textContent = "Time spent: 0 seconds";
  message.textContent = "";

  // pick a new random number
  answer = Math.floor(Math.random() * (max - min + 1) + min);
});
