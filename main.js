// main.js
// Author: Kelvin Tay
// Date: May 21, 2019

const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

let firstNumber = null; // The first operand
let operand = null; // The second operand
let result = null; // The result of the operation

// Stores the selected operator
let operator = null;

// True if an operator button was the last clicked button.
// This allows the display to be cleared when we click any
// subsequent number after clicking on an operator.
let isOperatorClickedLast = false;

// True if equal button was last clicked. Allows user to continue pressing
// equals button to continue the operation on the new value.
//let isEqualClickedLast = false;

// Add keyboard event listeners
document.addEventListener("keydown", checkKeyDown);


buttons.forEach((button) => {

    // Add click event listeners for number buttons.
    if (!isNaN(button.textContent)) {

        button.addEventListener("click", () => {

            // If display is 0, or if operator button was immediately
            // clicked before, set display to show the new number pressed.
            if (display.textContent === "0" || isOperatorClickedLast) {
                display.textContent = button.textContent;
                isOperatorClickedLast = false;

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

                button.addEventListener("click", () => {

                    if (firstNumber === null) {  // remove this
                        
                        operator = "DIVIDE"; // use button.id.toUpperCase()
                        firstNumber = parseFloat(display.textContent);

                        // True if an operator is the last clicked button.
                        isOperatorClickedLast = true;

                    } else {
                        result = parseFloat(display.textContent);
                        firstNumber = operate();
                        display.textContent = firstNumber;
                    }

                    //showPressed(button);
                });

                break;
            case "multiply":


                break;

            case "subtract":


                break;

            case "add":

                break;

            case "equals":

                button.addEventListener("click", function () {

                    if (firstNumber !== null) {

                        if (operand === null) {
                            operand = parseFloat(display.textContent);
                        }
                        
                        firstNumber = operate(operator, firstNumber, operand);
                        display.textContent = firstNumber;
                    }
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
                break;
        }
    }
});

// Adds "is-depressed" class to show the button as pressed.
/* 
function showPressed(button) {

    if (isNaN(button.textContent) && button.textContent != ".") {

        if (!button.classList.contains("clear")) {

        }
    }

    button.classList.add("is-depressed");
} 
*/

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
    operand = null;                    // necessary?
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