"use strict";

let displayText;
let operation;
let x;
let y;
let operationUsed = false;
let lastElement = null;
let lastElementIsZero = false;
let solved = false;
// const operBtns = [".plus", ".minus", ".multiply", ".divide"];
// const digitBtns = document.querySelectorAll(".digit");
const operBtns = [
  document.querySelector(".plus"),
  document.querySelector(".minus"),
  document.querySelector(".multiply"),
  document.querySelector(".divide"),
];
const digitBtns = [
  document.querySelector(".zero"),
  document.querySelector(".one"),
  document.querySelector(".two"),
  document.querySelector(".three"),
  document.querySelector(".four"),
  document.querySelector(".five"),
  document.querySelector(".six"),
  document.querySelector(".seven"),
  document.querySelector(".eight"),
  document.querySelector(".nine"),
];
const display = document.querySelector(".display-text");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const operSymbolToString = {
  "+": "plus",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
};

// active
const addActiveStyleDigits = function (element) {
  element.style.cssText =
    "background-color: #343a40; color: #f1f3f5; cursor: pointer;";
};

// release
const addDefaultStyleDigits = function (element) {
  element.style.cssText =
    "background-color: #e9ecef; color: #495057; cursor: pointer;";
};

// hover
const addHoverStyleDigits = function (element) {
  element.style.cssText =
    "background-color: #f8f9fa; border: 2px solid #dee2e6; cursor: pointer;";
};

const addDigit = function (input) {
  // console.log(operationUsed);
  // if (solved) {
  //   // console.log("asdasd");
  //   x = null;
  // displayText = input;
  // display.textContent = displayText;
  // }

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
};

const addOperator = function (input) {
  // if there's X this means we already have two values, and need to solve
  if (x != null && y != null) {
    x = solve();
    y = null;
  }

  // do not add operation symbol if no digits
  if (displayText) {
    // get operation after because if we have x and y present
    // this means we already have an operation in memory
    operation = input;
    operationUsed = true;

    displayText = `${x}${operation}`;
    display.textContent = displayText;
  }
};

const addEquals = function () {
  if (operationUsed) {
    solve();
    operationUsed = false;
  }
};

digitBtns.forEach((element) =>
  element.addEventListener("click", (e) => {
    let input = e.target.textContent;

    addDigit(input);
  })
);

operBtns.forEach((element) => {
  element.addEventListener("click", (e) => {
    let input = e.target.textContent;

    addOperator(input);
  });
});

equalsBtn.addEventListener("click", () => {
  addEquals();
});

clearBtn.addEventListener("click", (e) => {
  displayText = "";
  display.textContent = displayText;
  reset();
});

// mouse click, hover, active - digit buttons
digitBtns.forEach((element) => {
  element.addEventListener("mousedown", function () {
    addActiveStyleDigits(element);
  });
});

digitBtns.forEach((element) => {
  element.addEventListener("mouseup", function () {
    addDefaultStyleDigits(element);
  });
});

digitBtns.forEach((element) => {
  element.addEventListener("mouseover", function () {
    addHoverStyleDigits(element);
  });
});

digitBtns.forEach((element) => {
  element.addEventListener("mouseout", function () {
    addDefaultStyleDigits(element);
  });
});

// keyboard clicks
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (key !== undefined) {
    if (!isNaN(key)) {
      addDigit(key);
    }
    // else if (key === "Backspace")
    else if (key == "+" || key == "-" || key == "*" || key == "/") {
      addOperator(key);
    } else if (key == "=" || key == "Enter") solve();
  }
});

document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (key !== undefined) {
    digitBtns.forEach((element) => {
      if (key == digitBtns.indexOf(element)) {
        addActiveStyleDigits(element);
      }
    });
  }
});

document.addEventListener("keyup", function (e) {
  const key = e.key;

  if (key !== undefined) {
    digitBtns.forEach((element) => {
      if (key == digitBtns.indexOf(element)) {
        addDefaultStyleDigits(element);
      }
    });
  }
});

const solve = function () {
  // override x
  let result = operate(x, y, operSymbolToString[operation]);

  displayText = parseFloat(result.toPrecision(8));
  display.textContent = displayText;

  solved = true;

  x = result;
  y = null;

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
  if (y == 0) return "cannot divide by zero";
  else return x / y;
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
  solved = false;
}
