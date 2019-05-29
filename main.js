// main.js
// Author: Kelvin Tay
// Date: May 21, 2019

const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

let firstNumber = null; // The first operand
let operand = null; // The second operand

// Stores the selected operator
let operator = null;

// True if an operator button was the last clicked button.
// This allows the display to be cleared when we click any
// subsequent number after clicking on an operator.
let isOperatorClickedLast = false;

// True if equal button was last clicked. Allows user to continue pressing
// equals button to continue the operation on the new value.
let isEqualClickedLast = false;

// Add keyboard event listeners
document.addEventListener("keydown", checkKeyDown);

// Add click event listeners to the buttons
buttons.forEach((button) => {

    // Add click event listeners for number buttons.
    if (!isNaN(button.textContent)) {

        button.addEventListener("click", () => {

            // If display is 0, or if operator button was immediately
            // clicked before, set display to show the new number pressed.
            if (display.textContent === "0" || isOperatorClickedLast) {

                display.textContent = button.textContent;
                isOperatorClickedLast = false;
                isEqualClickedLast = false;

            } else if (isEqualClickedLast) {

                display.textContent = button.textContent;
                isOperatorClickedLast = false;
                isEqualClickedLast = false;
                firstNumber = null;
                operand = null;

            } else {
                display.textContent += button.textContent;
            }
        });
    }

    // Add click event listeners for non-number buttons.
    else {

        switch (button.id) {
            case "clear":
                button.addEventListener("click", resetCalculator);
                break;

            case "backspace":
                button.addEventListener("click", backspace);
                break;

            case "divide":
                button.addEventListener("click", operatorPressed);
                break;

            case "multiply":
                button.addEventListener("click", operatorPressed);
                break;

            case "subtract":
                button.addEventListener("click", operatorPressed);
                break;

            case "add":
                button.addEventListener("click", operatorPressed);
                break;

            case "equals":

                button.addEventListener("click", function () {
                    isEqualClickedLast = true;

                    if (firstNumber !== null) {

                        if (operand === null) {
                            operand = parseFloat(display.textContent);
                        }

                        firstNumber = operate(operator, firstNumber, operand);
                        display.textContent = firstNumber;
                    }

                    removePressed();

                });
                break;

            /*                
                        case "decimal":
                            button.addEventListener("click", function () {
                                if (!display.textContent.includes(".")) {
                                    display.textContent += ".";
                                }
                            });
                            break;
            */
            default:
                console.log("Error in switch statement for adding click listeners to non-number buttons\n");
                break;
        }
    }
});

// Adds "is-depressed" class to show the button as pressed.
function showPressed(button) {

    removePressed();

    button.classList.add("is-depressed");
}

// Remove the "is-depressed" class from all buttons
function removePressed() {

    buttons.forEach((button) => {
        if (button.classList.contains("operator") && button.id != "equals") {
            button.classList.remove("is-depressed");
        }
    });
}


// Called when an operator button is pressed
function operatorPressed() {
    operator = this.id.toUpperCase();

    if (!isOperatorClickedLast && !isEqualClickedLast) {

        if (firstNumber === null) {

            firstNumber = parseFloat(display.textContent);

        } else {
            operand = parseFloat(display.textContent);
            firstNumber = operate(operator, firstNumber, operand);
            display.textContent = firstNumber;
        }

    }

    operand = null;

    // True if an operator is the last clicked button.
    isOperatorClickedLast = true;
    isEqualClickedLast = false;

    showPressed(this);
}

// Functions for performing basic arithmetic operations

function divide(num1, num2) {

    if (num2 === 0) {
        return "Cannot divide by zero"
    }

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
            return multiply(num1, num2);

        case "SUBTRACT":
            return subtract(num1, num2);

        case "ADD":
            return add(num1, num2);

        default:
            console.log("Error in switch statement of function operate\n");
            break;
    }
}

// Clear display and reset calculator variables
function resetCalculator() {
    display.textContent = "0";
    firstNumber = null;
    operand = null;
    isOperatorClickedLast = false;
    isEqualClickedLast = false;
    removePressed();
}

// Remove the last inputted number from the display
function backspace() {
    const digit = display.textContent.split("");
    digit.splice(-1, 1);

    if (digit.length === 0) {
        display.textContent = "0";

        if (isEqualClickedLast) {
            firstNumber = null;
            isOperatorClickedLast = false;
            isEqualClickedLast = false;
        }
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
            case "*":
            case "-":
            case "+":
                operatorPressed();
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