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

//calculator logic

const display = document.querySelector('.display');
let currentInput = '0';
let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clear() {
    currentInput = '0';
    firstNumber = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function handleNumber(value) {
    // Check if value is a decimal point and if one already exists
    if (value === '.' && currentInput.includes('.')) {
        return; // Ignore additional decimal points
    }

    if (shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
        operator = op;
        shouldResetDisplay = true;
    } else if (!shouldResetDisplay) {
        const result = operate(operator, firstNumber, parseFloat(currentInput));
        if (typeof result === 'string') {
            currentInput = result;
        } else {
            currentInput = Number(result.toFixed(8)).toString();
            firstNumber = parseFloat(currentInput);
        }
        operator = op;
        shouldResetDisplay = true;
        updateDisplay();
    } else {
        operator = op;
    }
    
}

function handleEquals() {
    if (firstNumber !== null && operator && !shouldResetDisplay) {
        const result = operate(operator, firstNumber, parseFloat(currentInput));
        if (typeof result === 'string') {
            currentInput = result;
        } else {
            currentInput = Number((result.toFixed(8)).toString());
        }
        firstNumber = null;
        operator = null;
        shouldResetDisplay = true;
        updateDisplay();
    }
}

//event listeners

document.querySelectorAll('.btn.number').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value === '=') {
            handleEquals();
        } else {
            handleNumber(value);        
        }
    });
});

document.querySelectorAll('.btn.operator').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleOperator(value);
    });
});

document.querySelector('.btn.clear').addEventListener('click', clear);
document.querySelector('.btn.backspace').addEventListener('click', backspace);

// Initialize display
updateDisplay();

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Number keys
    if (/^[0-9]$/.test(key)) {
        handleNumber(key);
    }

    // Operator keys
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key);
    }

    // Equals and Enter key
    else if (key === '=' || key === 'Enter') {
        handleEquals();
    }

    // Decimal point
    else if (key === '.') {
        handleNumber(key);
    }

    // Clear (Escape or C)
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
    }

    // Backspace
    else if (key === 'Backspace') {
        backspace();
    }
});