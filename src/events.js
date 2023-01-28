"use strict";

// Cheat code variables
let input = "";
let index = 0;

// Cheat code function
document.addEventListener("keydown", (event) => {
  const key = event.key;
  input += key; // Each key press is added to the input string
  index++;

  // If the input string contains "secret" then the alert is triggered
  if (input.includes("secret")) {
    alert("You found the secret!");
    input = "";
  }

  // Reset the variables if input string gets unnecessaryly long
  if (index > 100) {
    input = "";
    index = 0;
  }
});

// Double click function
document.addEventListener("dblclick", (event) => {
  alert("x: " + event.clientX + " y: " + event.clientY); // Show x and y coordinates of the double click event
});

// Touch element
const touchElement = document.getElementById("touchElement");
touchElement.addEventListener("touchstart", (event) => {
  alert("Touch detected!");
});

// Variable to keep track of seconds
let timer1 = 0;

// Function to increase the timer value and alert if it reaches 15
const countDown1 = () => {
  timer1++;
  if (timer1 === 15) {
    clearInterval(interval1);
    alert("Hurry up!");
  }
};

// Set interval to call the countDown function every second
const interval1 = setInterval(countDown1, 1000);

// Second identical timer for detecting idling
let timer2 = 0;

const countDown2 = () => {
  timer2++;
  if (timer2 === 15) {
    alert("Idling detected, hurry up!");
    timer2 = 0;
  }
};

const interval2 = setInterval(countDown2, 1000);

// Reset the timer if the user interacts with the page
document.addEventListener("mousemove", (event) => {
  timer2 = 0;
});

document.addEventListener("keydown", (event) => {
  timer2 = 0;
});

document.addEventListener("click", (event) => {
  timer2 = 0;
});
