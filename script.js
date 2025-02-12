/* Mathematical Functions */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error"; // Prevent division by zero
    return a / b;
}

let firstNumber = "";
let operator = "";
let secondNumber = "";
let isOperatorSelected = false;

/* Operate function */
function operate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
        default:
            return "Error";
    }
}

/* Select input field */
const calculator = document.querySelector('.calculator-container');

// Create input field
const inputFieldContainer = document.querySelector(".input-field-container");
const body = document.querySelector("body");
body.prepend(inputFieldContainer);

const inputField = document.createElement('input');
inputField.classList.add("input");
inputField.setAttribute("type", "text");
inputField.setAttribute("readonly", true); // Prevent manual typing
inputField.autofocus = true;
inputFieldContainer.appendChild(inputField);


/* Clear button */
function clearField() {
    inputField.value = "";
    firstNumber = "";
    operator = "";
    secondNumber = "";
    isOperatorSelected = false;
}

const clearButton = document.createElement('button');
clearButton.textContent = "Clear";
clearButton.classList.add("clear");
clearButton.addEventListener("click", clearField);
inputFieldContainer.appendChild(clearButton);

/* Numpad */
const numpad = document.querySelector('.number-container');

for (let i = 0; i <= 9; i++) {
    let buttonNumber = document.createElement('button');
    buttonNumber.textContent = `${i}`;
    buttonNumber.classList.add('numbers');
    buttonNumber.addEventListener("click", function () {
        if (isOperatorSelected) {
            secondNumber += i;
        } else {
            firstNumber += i;
        }
        inputField.value += i;
    });
    if (i == 0){
        buttonNumber.classList.add("zero");
    }
    numpad.appendChild(buttonNumber);
}



/* Operator buttons */
const operators = document.querySelector('.operator-container');

function designateOperand(event) {
    if (firstNumber === "") return;
    operator = event.target.textContent;
    inputField.value += ` ${operator} `;
    isOperatorSelected = true;
}

["+", "-", "*", "/"].forEach(op => {
    let operatorButton = document.createElement("button");
    operatorButton.textContent = op;
    operatorButton.classList.add('operators');
    operatorButton.addEventListener("click", designateOperand);
    operators.appendChild(operatorButton);
});

/* Equals button */
const operateButton = document.createElement("button");
operateButton.textContent = '=';
operateButton.classList.add('operators', 'operate');
operateButton.addEventListener("click", function () {
    if (firstNumber && operator && secondNumber) {
        inputField.value = operate(firstNumber, operator, secondNumber);
        firstNumber = inputField.value;
        operator = "";
        secondNumber = "";
        isOperatorSelected = false;
    }
});
operators.appendChild(operateButton);
