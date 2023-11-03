"use strict";

let displayText;
let operation;
let x;
let y;
let operationUsed = false;
let pointUsedX = false;
let pointUsedY = false;

// let lastElement = null;
// let lastElementIsZero = false;
let solved = false;

const display = document.querySelector(".display-text");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const multiplyBtn = document.querySelector(".multiply");
const divideBtn = document.querySelector(".divide");
const percentBtn = document.querySelector(".percent");
const powerBtn = document.querySelector(".power");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

const operBtns = [
  { el: plusBtn, value: "+" },
  { el: minusBtn, value: "-" },
  { el: multiplyBtn, value: "*" },
  { el: divideBtn, value: "/" },
  { el: percentBtn, value: "%" },
  { el: powerBtn, value: "^" },
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
  document.querySelector(".point"),
];

// active
const addActiveStyleDigits = function (element) {
  element.style.cssText = `
    // background-color: #343a40; 
    box-shadow: inset 0px 1px 3px 2px rgb(0 0 0 / 0.2);
    // color: #f1f3f5; 
    font-size: 1.5rem;
    cursor: pointer
    `;
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
  let output = input;

  if (operationUsed) {
    if (input == "." && pointUsedY) return;

    if (y) {
      // if (pointUsedY) {
      //   output = `.${output}`;
      //   // pointUsedY = false;
      // }

      output = `${y}${output}`;
    }

    y = output;

    if (input == ".") pointUsedY = true;

    displayText = `${x}${operation}${output}`;
  } else {
    if (input == "." && pointUsedX) return;

    if (x) {
      // if (x.slice(-1) == 0) {
      if (x === "0") {
        if (output == "0") output = "";
      }
      // if (pointUsedX) {
      //   output = `.${output}`;
      //   // pointUsedX = false;
      // }

      output = `${x}${output}`;
    }

    x = output;

    if (input == ".") pointUsedX = true;
    displayText = output;
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
  element.el.addEventListener("click", () => {
    let input = element.value;

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
  let result = operate(Number(x), Number(y), operation);

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

function power(x, y) {
  if (y == undefined) y = 2;
  return x ** y;
}

function percent(x, y) {
  return x * (y / 100);
}

function operate(x, y, operation) {
  let result;

  if (operation === "+") result = add(x, y);
  else if (operation === "-") result = subtract(x, y);
  else if (operation === "*") result = multiply(x, y);
  else if (operation === "/") result = divide(x, y);
  else if (operation === "%") result = percent(x, y);
  else if (operation === "^") result = power(x, y);

  return result;
}

function reset() {
  x = null;
  y = null;
  operation = null;
  operationUsed = false;
  solved = false;
  pointUsedX = false;
  pointUsedY = false;
}
