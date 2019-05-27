// main.js
// Author: Kelvin Tay
// Date: May 27, 2019

const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

// Stores the operands
let firstNumber = null;
let secondNumber = null;

// Stores the selected operator
let operator = null;

// True if an operator button was the last clicked button.
// This allows the display to be cleared when we click any
// subsequent number after clicking on an operator.
let isOperatorClickedLast = false;

// Add keyboard event listeners
document.addEventListener("keydown", checkKeyDown);

// Add click event listeners for number buttons.
buttons.forEach(assignNumberListener);

// Add click event listeners for non-number buttons.
buttons.forEach(assignNonNumberListener);



// Assigns click event listeners to number buttons.
function assignNumberListener(button) {

    if (!isNaN(button.textContent)) {

        button.addEventListener("click", () => {

            if (display.textContent === "0") {
                display.textContent = button.textContent;
            } else {
                display.textContent += button.textContent;
            }

            // If operator button was immediately clicked before, set display
            // to show the new number pressed.
            if (isOperatorClickedLast) {
                display.textContent = button.textContent;
                isOperatorClickedLast = false;
            }
        });
    }
}

// Assigns click event listeners to non-number buttons.
function assignNonNumberListener(button) {

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

                    // Operator is last clicked button. Re-assign click
                    // event listeners on number buttons to take this into account.
                    isOperatorClickedLast = true;
                    assignNumberListener(button);

                } else {
                    secondNumber = parseFloat(display.textContent);
                    firstNumber = operate();
                    display.textContent = firstNumber;
                }
            });

            showPressed(button);

            break;
        case "multiply":
            button.addEventListener("click", operate);
            showPressed(button);
            break;

        case "subtract":
            button.addEventListener("click", operate);
            showPressed(button);
            break;

        case "add":

            button.addEventListener("click", function () {
                operator = "ADD";

                if (firstNumber === null) {
                    firstNumber = parseFloat(display.textContent);
                    clearDisplay(); // change this later
                }
            });

            showPressed(button);
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
            button.addEventListener("click", function () {
                display.textContent += ".";
            });
            break;

        default:
            break;
    }
}

// Adds "is-depressed" class to show the button as pressed.
function showPressed(button) {
    button.classList.add("is-depressed");
}

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

// Clear the calculator's display
function clearDisplay() {
    display.textContent = "0";
}

// Clear display and reset calculator variables
function resetCalculator() {
    display.textContent = "0";
    firstNumber = null;
    secondNumber = null;
    isOperatorClickedLast = false;
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