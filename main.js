
const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

// Stores the operands
let firstNumber = null;
let secondNumber = null;

// Stores the selected operator
let operator = null;

document.addEventListener("keydown", checkKeyDown);

buttons.forEach(function (button) {

    // Check that the text content is a number
    if (!isNaN(button.textContent)) {

        button.addEventListener("click", () => {

            if (display.textContent === "0") {
                display.textContent = button.textContent;
            } else {
                display.textContent += button.textContent;
            }
        });

    } else {

        switch (button.id) {
            case "clear":
                button.addEventListener("click", resetCalculator);
                break;

            case "backspace":
                button.addEventListener("click", backspace);
                break;

            case "divide":
                button.addEventListener("click", () => {
                    if (firstNumber === null) {

                        firstNumber = parseFloat(display.textContent);
                        operator = "DIVIDE";

                    } else {
                        secondNumber = parseFloat(display.textContent);
                        firstNumber = operate();
                        display.textContent = firstNumber;
                    }
                });
                break;
            case "multiply":
                button.addEventListener("click", operate);
                break;

            case "subtract":
                button.addEventListener("click", operate);
                break;

            case "add":

                button.addEventListener("click", function () {
                    operator = "ADD";

                    if (firstNumber === null) {
                        firstNumber = parseFloat(display.textContent);
                        resetCalculator(); // change this later
                    }
                });
                break;

            case "equals":

                button.addEventListener("click", function () {
                    if (firstNumber !== null) {
                        secondNumber = parseFloat(display.textContent);
                        display.textContent = operate(operator, firstNumber, secondNumber);
                    }
                });
                break;

            case "decimal":
                break;

            default:
                break;
        }

    }
});

// Functions for performing basic arithmetic operations

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function add(num1, num2) {
    return num1 + num2;
}

// Performs the operations on the input value
function operate(operator, num1, num2) {
    switch (operator) {
        case "DIVIDE":
            return divide(num1, num2);
        case "MULTIPLY":

            break;
        case "SUBTRACT":

            break;
        case "ADD":
            return add(num1, num2);
            break;
        default:
            break;
    }
}

// Clear the calculator's display and reset calculator variables
function resetCalculator() {
    display.textContent = "0";
    firstNumber = null;
    secondNumber = null;
}

// Remove the last inputted number from the display
function backspace() {
    const digit = display.textContent.split("");
    digit.splice(-1, 1);

    if (digit.length === 0) {
        display.textContent = "0";
    } else {
        display.textContent = digit.join("");
    }
}

// Check the key pressed
function checkKeyDown(event) {

    if (!isNaN(event.key)) {
        if (display.textContent === "0") {
            display.textContent = event.key;
        } else {
            display.textContent += event.key;
        }

    } else {

        switch (event.key) {
            case "Delete":
                resetCalculator();
                break;
            case "Backspace":
                backspace();
                break;
            case "/":

                break;
            case "*":

                break;
            case "-":

                break;
            case "+":

                break;
            case "Enter":
                break;
            case ".":
                break;
            default:
                break;
        }
    }
}