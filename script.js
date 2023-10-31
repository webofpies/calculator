"use strict";

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
  const result = 0;
  if (operation === "add") result = add(x, y);
  else if (operation === "subtract") result = subtract(x, y);
  else if (operation === "multiply") result = multiply(x, y);
  else if (operation === "divide") result = divide(x, y);

  return result;
}

let existingValue;
const display = document.querySelector(".display-text");

const digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach((element) =>
  element.addEventListener("click", (e) => {
    let input = e.target.textContent;
    if (existingValue) existingValue = `${existingValue}${input}`;
    else if (input == 0) existingValue = "";
    else {
      existingValue = `${input}`;
    }

    display.textContent = existingValue;
  })
);

let operUsed = false;
const operBtns = document.querySelectorAll(".oper");
operBtns.forEach((element) =>
  element.addEventListener("click", (e) => {
    let input = e.target.textContent;
    if (input == "=") {
      existingValue = operate();
    } else {
      if (operUsed)
        existingValue = existingValue.substring(0, existingValue.length - 1);
      if (input) operUsed = true;
      if (existingValue) existingValue = `${existingValue}${input}`;
      else existingValue = "";
    }

    display.textContent = existingValue;
  })
);
