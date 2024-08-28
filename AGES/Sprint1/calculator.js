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



function infixToPosfixNotation(expression) {
    const precedences = { '+': 1, '-': 1, '%': 0, '*': 2, '/': 2 };
    let operators = [];
    let postfix = [];
    let numberBuffer = [];

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        console.log(char);
        if (char.match(/\d/)) {
            numberBuffer.push(char);
        } else {
            if (numberBuffer.length) {
                postfix.push(numberBuffer.join(''));
                numberBuffer = [];
            }

            if (char in precedences) {
                while (operators.length && precedences[operators[operators.length - 1]] >= precedences[char]) {
                    postfix.push(operators.pop());
                }
                operators.push(char);
            } else {
                throw new Error('Invalid symbol');
            }
        }
    }

    if (numberBuffer.length) {
        postfix.push(numberBuffer.join(''));
    }

    while (operators.length) {
        postfix.push(operators.pop());
    }

    return postfix;
}

function evaluatePosfixNotation(expression) {
    let stack = [];

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (char.match(/\d/)) {
            stack.push(Number(char));
        } else {

            switch (char) {
                case '+':
                    stack.push(sum(stack.pop(), stack.pop()));
                    break;
                case '-':
                    stack.push(substract(stack.pop(), stack.pop()));
                    break;
                case '*':
                    stack.push(multiply(stack.pop(), stack.pop()));
                    break;
                case '/':
                    stack.push(divide(stack.pop(), stack.pop()));
                    break;
                case '%':
                    let a = stack.pop();
                    let b = stack.pop();
                    console.log(a, b);
                    stack.push(percentage(b, a));
                    break;
                default:
                    throw new Error('Unknown operator');
            }
        }
    }

    return stack[0];
}

function calculate(expression) {
    let expressions = [];
    if (!expression) {
        throw new Error('Empty expression');
    }
    if (expression.has('%')) {
        expressions = expression.split('%');
        for (let i = 0; i < expressions.length; i++) {
            let percentage = () => {
                let numberBuffer = [];
                let i = expressions
                while (expressions) {
                    let char = expressions[i];
                    if (char.match(/\d/)) {
                        numberBuffer.push(char);
                    } else {
                        if (numberBuffer.length) {
                            postfix.push(numberBuffer.join(''));
                            numberBuffer = [];
                        }
                    }
                }
        }
        }
        let posfix = infixToPosfixNotation(expression);
        return evaluatePosfixNotation(posfix);
    }

    let expression = '9+6*8+4';
    console.log(calculate(expression));  // Output should be 61
