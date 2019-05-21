
const display = document.querySelector("#div-display");
const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach(function (button) {

    // Check that the text content is a number
    if (!isNaN(button.textContent)) {
        button.addEventListener("click", function () {
            display.textContent += button.textContent;
        });
    } else {

        switch (button.textContent) {
            case "C":
                display.textContent = "";
            case "Backspace":
                
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

function operate(operator, num1, num2) {

}