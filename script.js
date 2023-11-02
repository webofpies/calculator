"use strict";

let displayText;
let operation;
let x;
let y;
let operationUsed = false;
let lastElement = null;
let lastElementIsZero = false;
let solved = false;
const operBtns = [".plus", ".minus", ".multiply", ".divide"];
const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display-text");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const operSymbolToString = {
  "+": "plus",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

digitBtns.forEach((element) =>
  element.addEventListener("click", (e) => {
    let input = e.target.textContent;

    if (solved) {
      reset();
    }

    if (operationUsed) {
      if (y) input = `${y}${input}`;
      y = Number(input);

      displayText = `${x}${operation}${y}`;
    } else {
      if (x) input = `${x}${input}`;
      x = Number(input);

      displayText = x;
    }

    display.textContent = displayText;
  })
);

// add event for operation buttons
operBtns.forEach((element) => {
  let btn = document.querySelector(element);
  btn.addEventListener("click", (e) => {
    // if there's X this means we already have two values, and need to solve
    if (x && y) {
      x = solve();
      y = null;
    }
    // get operation after because if we have x and y present
    // this means we already have an operation in memory
    operation = e.target.textContent;

    // do not add operation symbol if no digits
    if (displayText) {
      operationUsed = true;

      displayText = `${x}${operation}`;
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
  reset();
});

const solve = function () {
  // y = Number(displayText.replace(`${x}${operation}`, ""));

  let result = operate(x, y, operSymbolToString[operation]);
  // console.log(result);
  displayText = String(result);
  display.textContent = displayText;
  solved = true;
  // lastElement = result;
  // reset();
  return result;
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

function reset() {
  x = null;
  y = null;
  operation = null;
  operationUsed = false;
  // lastElement = null;
  solved = false;
}
