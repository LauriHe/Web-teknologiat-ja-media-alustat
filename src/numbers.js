"use strict";

const enterGuess = document.querySelector("#enterGuess");
const input = document.querySelector("#inputField");
const submit = document.querySelector("#submit");
const message = document.querySelector("#message");
const text = document.querySelector("#text");
const timeText = document.querySelector("#timer");
const startAgain = document.querySelector("#startAgain");

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

const timer = () => {
  time++;
  timeText.textContent = `Time spent: ${time} seconds`;
};

startAgain.addEventListener("click", () => {
  enterGuess.classList.remove("hidden");
  message.classList.remove("hidden");
  startAgain.classList.add("hidden");
  answer = Math.floor(Math.random() * (max - min + 1) + min);
  text.textContent = `Guess a number between ${min} and ${max}. You have ${maxGuesses} guesses in total. Timer starts from first guess.`;
  timeText.textContent = "Time spent: 0 seconds";
  message.textContent = "";
});

submit.addEventListener("click", () => {
  message.textContent = "";
  const guess = parseInt(input.value);
  input.value = "";

  if (!timerStarted) {
    timerStarted = true;
    clearInterval(interval);
    interval = setInterval(timer, 1000);
  }

  if (numberOfGuesses === maxGuesses - 1) {
    tooManyGuesses();
    return;
  }

  if (guess === "") {
    message.textContent = "Please enter a number.";
    return;
  }

  if (isNaN(guess)) {
    message.textContent = "Please enter a number.";
    return;
  }

  if (guess <= min || guess >= max) {
    message.textContent = `Please enter a number between ${min} and ${max}.`;
    return;
  }

  if (guessedNumbers.includes(guess)) {
    message.textContent = "You already guessed that number.";
    return;
  }

  if (guess >= min && guess <= max) {
    if (guess < answer) {
      numberOfGuesses++;
      guessedNumbers.push(guess);
      message.textContent = `Too low, guesses left: ${
        maxGuesses - numberOfGuesses
      }`;
    } else if (guess > answer) {
      numberOfGuesses++;
      guessedNumbers.push(guess);
      message.textContent = `Too high, guesses left: ${
        maxGuesses - numberOfGuesses
      }`;
    } else {
      numberOfGuesses++;
      correctGuess();
    }
  }
});
