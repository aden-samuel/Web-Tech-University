// FR-08: calculator using only the four basic arithmetic operators.
(function () {
    const display = document.getElementById("calcDisplay");
    const keys = document.querySelector(".calculator-keys");
    if (!display || !keys) return;

    function calculate(expression) {
        const clean = expression.replace(/\s/g, "");
        const tokens = clean.match(/(?:\d+(?:\.\d*)?|\.\d+|[+\-*/])/g);
        const operators = ["+", "-", "*", "/"];

        if (!tokens || tokens.join("") !== clean) {
            throw new Error("Invalid expression");
        }

        const numbers = [];
        const signs = [];
        let expectNumber = true;

        // A minus sign can also be used to enter a negative number.
        for (let i = 0; i < tokens.length; i++) {
            if (expectNumber) {
                let sign = 1;
                if (tokens[i] === "-") {
                    sign = -1;
                    i++;
                }
                if (i >= tokens.length || operators.includes(tokens[i])) {
                    throw new Error("Invalid number");
                }
                numbers.push(sign * Number(tokens[i]));
                expectNumber = false;
            } else {
                if (!operators.includes(tokens[i])) throw new Error("Invalid operator");
                signs.push(tokens[i]);
                expectNumber = true;
            }
        }

        if (expectNumber || numbers.length !== signs.length + 1) {
            throw new Error("Incomplete expression");
        }

        // Apply multiplication and division before addition and subtraction.
        for (let i = 0; i < signs.length;) {
            if (signs[i] === "*" || signs[i] === "/") {
                if (signs[i] === "/" && numbers[i + 1] === 0) {
                    throw new Error("Cannot divide by zero");
                }
                const result = signs[i] === "*"
                    ? numbers[i] * numbers[i + 1]
                    : numbers[i] / numbers[i + 1];
                numbers.splice(i, 2, result);
                signs.splice(i, 1);
            } else {
                i++;
            }
        }

        let result = numbers[0];
        for (let i = 0; i < signs.length; i++) {
            result = signs[i] === "+" ? result + numbers[i + 1] : result - numbers[i + 1];
        }
        if (!Number.isFinite(result)) throw new Error("Invalid result");
        return Number(result.toFixed(8)).toString();
    }

    keys.addEventListener("click", function (event) {
        const button = event.target.closest("button");
        if (!button) return;

        if (button.dataset.action === "clear") {
            display.value = "";
            return;
        }

        if (button.dataset.action === "equals") {
            try {
                display.value = calculate(display.value);
            } catch (error) {
                display.value = "Error";
            }
            return;
        }

        const value = button.dataset.value;
        if (!value) return;
        if (display.value === "Error") display.value = "";

        const isOperator = ["+", "-", "*", "/"].includes(value);
        const last = display.value.slice(-1);

        if (isOperator && !display.value && value !== "-") return;
        if (isOperator && ["+", "-", "*", "/"].includes(last)) {
            if (value === "-" && last !== "-") {
                display.value += value;
            } else {
                display.value = display.value.slice(0, -1) + value;
            }
        } else {
            display.value += value;
        }
    });
})();
