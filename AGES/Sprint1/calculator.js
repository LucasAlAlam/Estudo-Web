function sum(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function percentage(a, max) {
    return max * (a / 100);
}

function signal(a) {
    return -a;
}

//para fazer isso, usar o algoritmo de shunting yard com notação polonesa reversa para converter a expressão infixa em posfixa

function infixToPosfixNotation(expresion) {
    const precedences = { '+': 1, '-': 1, '%': 1, '*': 2, '/': 2 };
    let operators = [];
    let postfix = [];

    for (let i = 0; i < expresion.length; i++) {
        let token = expresion[i];
        if (token.match(/\d/)) {
            postfix.push(token);
        } else if (token in precedences) {
            while (operators.length && precedences[operators[operators.length - 1]] >= precedences[token]) {
                postfix.push(operators.pop());
            }
            operators.push(token);
        }

        return postfix.concat(operators.reverse());
    }
}

function evaluatePosfixNotation(expresion) {
    let stack = [];
    for (let i = 0; i < expresion.length; i++) {
        let token = expresion[i];
        if (token.match(/\d/)) {
            stack.push(token);
        } else {
            switch (token) {
                case '+':
                    stack.push(sum(Number(stack.pop()), Number(stack.pop())));
                    break;
                case '-':
                    stack.push(substract(Number(stack.pop()), Number(stack.pop())));
                    break;
                case '*':
                    stack.push(multiply(Number(stack.pop()), Number(stack.pop())));
                    break;
                case '/':
                    stack.push(divide(Number(stack.pop()), Number(stack.pop())));
                    break;
                case '%':
                    stack.push(percentage(Number(stack.pop()), Number(stack.pop())));
                    break;
            }
        }
        return stack[0];
    }
}

function calculate(expresion) {
    let posfix = infixToPosfixNotation(expresion);
    return evaluatePosfixNotation(posfix);
}

expression = '9+6*8+4%'
console.log(calculate(expression));
