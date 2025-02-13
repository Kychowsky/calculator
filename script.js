


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
            return firstNumber + secondNumber;;
        case "-":
            return firstNumber - secondNumber;
        case "x":
            return firstNumber * secondNumber;
        case "/":
            if (secondNumber === 0) return "Error"; // Prevent division by zero
            return firstNumber / secondNumber;
        default:
            return "Error";
    }
}
/* Clear button */
function clearField() {
    inputField.value = "";
    firstNumber = "";
    operator = "";
    secondNumber = "";
    isOperatorSelected = false;
}

/* Select input field */
const calculator = document.querySelector('.calculator-container');

const inputField = document.createElement('input');
inputField.classList.add("input");
inputField.setAttribute("type", "text");
inputField.setAttribute("readonly", true); // Prevent manual typing
inputField.autofocus = true;
calculator.prepend(inputField);


/* Clear Input Field */
const clearInputField = document.querySelector('.clear');
clearInputField.addEventListener("click", clearField);


/* Numpad */
const numpad = document.querySelectorAll('.numbers');

numpad.forEach(function (button) {
    button.addEventListener("click", function () {
        const number = button.textContent;
        if (isOperatorSelected) {
            secondNumber += number;
        } else {
            firstNumber += number;
        }
        inputField.value += number;
    });
});

/* Operator buttons */

function designateOperand(event) {
    if (firstNumber === "") return;
    operator = event.target.textContent;
    inputField.value += ` ${operator} `;
    isOperatorSelected = true;
}

const operatorButtons = document.querySelectorAll(".operators");

operatorButtons.forEach( (button) => {
    button.addEventListener("click", designateOperand)
});

/* Operate button */
const operateButton = document.querySelector(".operate");

operateButton.addEventListener("click", function () {
    if (firstNumber && operator && secondNumber) {
        inputField.value = operate(firstNumber, operator, secondNumber);
        firstNumber = inputField.value;
        operator = "";
        secondNumber = "";
        isOperatorSelected = false;
    }
});
