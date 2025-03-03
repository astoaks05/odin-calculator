//functions

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
    if (b === 0) {
        return "Nitwit! You can't divide by zero!";
    }
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Invalid operator!";
    }
}

//event listeners

let display = document.querySelector(".display");
let currentInput = "";
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.dataset.value;
        display.textContent = currentInput;
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === "") return;
        if (firstNumber && currentOperator) {
            secondNumber = currentInput;
            display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = display.textContent;
        } else {
            firstNumber = currentInput;
        }
        currentOperator = button.dataset.value;
        currentInput = "";
    });
});

document.querySelector(".equal").addEventListener("click", () => {
    if (currentOperator && firstNumber !== "" && currentInput !== "") {
        secondNumber = currentInput;
        display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        firstNumber = display.textContent;
        currentInput = "";
    }
});

document.querySelector(".clear").addEventListener("click", () => {
    display.textContent = "0";
    currentInput = "";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
});

document.querySelector(".backspace").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || "0";
});