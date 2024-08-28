function sum(b, a) {
    return Number(a + b);
}

function multiply(b, a) {
    return Number(a * b);
}

function divide(b, a) {
    return Number(a / b);
}

function signal(a) {
    return Number(-a);
}

function percentage(a, max, op) {
    const numberToOperate = max * (a / 100);
    switch (op) {
        case '+':
            return sum(max, numberToOperate);
        case '-':
            return sum(max, signal(numberToOperate));
        case '*':
            return multiply(max, numberToOperate);
        case '/':
            return divide(max, numberToOperate);
        default:
            throw new Error('Unknown operator');
    }
}



function infixToPosfixNotation(expression) {
    const precedences = { '+': 1, '-': 1, '*': 2, '/': 2 };
    let operators = [];
    let postfix = [];
    let numberBuffer = [];

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        console.log(char);
        if (char.match(/\d/) || char == '%') {
            numberBuffer.push(char); //colocar o % para dentro do caracter
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
            stack.push(char);
            console.log(stack);
        } else if (char.includes('%')) {
            //fazer o calculo com porcentagem
            
        } 
        else {

            switch (char) {
                case '+':
                    stack.push(sum(stack.pop(), stack.pop()));
                    break;
                case '-':
                    stack.push(sum(signal(stack.pop()), stack.pop()));
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
    if (!expression) {
        throw new Error('Empty expression');
    }

    let posfix = infixToPosfixNotation(expression);
    return evaluatePosfixNotation(posfix);
    /*
        if(!expression.includes('%')){
            
        }
        else {
            expression.split('%');
            for(let i = 0; i<expression.length; i++){
                let numberBuffer = [];
                do {
                    numberBuffer.push(expression[i].pop());
                } while (expression[i][expression[i].length-1].match(/\d/));
    
                let operator = expression[i].pop();
                let max = 
            }
        }*/
}

let expression = '9-3*2/2-3%*3';
console.log(calculate(expression));  // Output should be 61
