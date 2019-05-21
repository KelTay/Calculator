
const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach(function (button) {

    // Check that the text content is a number
    if (!isNaN(button.textContent)) {

        button.addEventListener("click", () => {
            display.textContent += button.textContent
        });

    } else {

        switch (button.textContent) {
            case "C":
                button.addEventListener("click", clearDisplay);
            case "Backspace":
                button.addEventListener("click", backspace);
            case "&divide;":
            case "&times;":
            case "&minus;":
            case "+":
            case "=":
            case ".":
            default: console.log("Error in switch statement.");
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

    display.textContent = digit.join("");
}