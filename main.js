
const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

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

        switch (button.textContent) {
            case "C":
                button.addEventListener("click", clearDisplay);
                break;
            case "Backspace":
                button.addEventListener("click", backspace);
                break;
            case "&divide;":
                button.addEventListener("click", divide);
                break;
            case "&times;":
                button.addEventListener("click", multiply);
                break;
            case "&minus;":
                button.addEventListener("click", subtract);
                break;
            case "+":
                button.addEventListener("click", add);
                break;
            case "=":
                break;
            case ".":
                break;
            default: console.log("Error in switch statement.");
                break;
        }

    }
});

// Functions for performing basic arithmetic operations

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//
function operate(operator, num1, num2) {

}

// Clear the calculator's display
function clearDisplay() {
    display.textContent = "0";
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