"use strict";

let displayText;
let operation;
let x;
let y;
let operationUsed = false;
const operBtns = [".plus", ".minus", ".multiply", ".divide"];
const display = document.querySelector(".display-text");
const digitBtns = document.querySelectorAll(".digit");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const op = {
  "+": "plus",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

digitBtns.forEach((element) =>
  element.addEventListener("click", (e) => {
    let input = e.target.textContent;

    // if there's already value e.g "85 +"
    if (displayText) {
      displayText = `${displayText}${input}`;
    } else {
      if (input == 0) {
        displayText = "";
      } else {
        displayText = `${input}`;
      }
    }

    display.textContent = displayText;
  })
);

// add event for operation buttons
operBtns.forEach((element) => {
  let btn = document.querySelector(element);
  btn.addEventListener("click", (e) => {
    let input = e.target.textContent;
    // if there's X this means we already have two values, and need to solve
    if (x) {
      solve();
    }
    // do not add operation symbol if no digits
    if (displayText) {
      x = Number(displayText);

      if (operationUsed) {
        displayText = displayText.substring(0, displayText.length - 1);
      }
      operationUsed = true;
      operation = input;

      displayText = `${x}${input}`;
      display.textContent = displayText;
    }
  });
});

equalsBtn.addEventListener("click", (e) => {
  if (operationUsed) {
    solve();
  }
});

clearBtn.addEventListener("click", (e) => {
  displayText = "";
  display.textContent = displayText;
  x = null;
  y = null;
  operation = null;
});

const solve = function () {
  y = Number(displayText.replace(`${x}${operation}`, ""));

  displayText = String(operate(x, y, op[operation]));
  display.textContent = displayText;

  operationUsed = false;
  x = null;
  y = null;
  operation = null;
};

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(x, y, operation) {
  let result;

  if (operation === "plus") result = add(x, y);
  else if (operation === "subtract") result = subtract(x, y);
  else if (operation === "multiply") result = multiply(x, y);
  else if (operation === "divide") result = divide(x, y);

  return result;
}
