"use strict";

let displayText;
let operation;
let x;
let y;
let operationUsed = false;
let lastElement = null;
let lastElementIsZero = false;
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
    // let input;

    // if there's already a value e.g "85 +"
    // console.log(e.target.textContent);
    // console.log(typeof Number("a"));
    // if (input === "0") {
    //   if (typeof lastElement == "number") {
    //     //   input = 0;
    //     //   console.log("asdasdasd");
    //     // } else {
    //     input = "";
    //   }
    // }
    if (displayText) {
      if (lastElementIsZero) {
        displayText = displayText.substring(0, displayText.length - 1);
      }
      displayText = `${displayText}${input}`;
    } else {
      if (input == 0) {
        // console.log(displayText);
        displayText = "";
      } else {
        displayText = `${input}`;
      }
      // if (input == 0) {
      //   displayText = "";
      // } else {
      // }
    }

    if (input == 0) lastElementIsZero = true;
    // lastElement = input;
    display.textContent = displayText;
  })
);

// add event for operation buttons
operBtns.forEach((element) => {
  let btn = document.querySelector(element);
  btn.addEventListener("click", (e) => {
    operation = e.target.textContent;
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
      // operation = input;

      displayText = `${x}${operation}`;
      display.textContent = displayText;

      // lastElement = String(operation);
      lastElementIsZero = false;
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
  y = Number(displayText.replace(`${x}${operation}`, ""));

  let result = operate(x, y, operSymbolToString[operation]);
  display.textContent = String(result);
  // lastElement = result;
  reset();
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
}
