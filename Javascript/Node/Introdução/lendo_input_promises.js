/*Promisses são métodos de execução de código assincrono alternativos aos callbaaks. Possuem vantagens em relação aos callbacks tradicionais em relação a organização de código. 
https://medium.com/trainingcenter/entendendo-promises-de-uma-vez-por-todas-32442ec725c2
Pordemos usar o módulo inquirer (npm install --save inquirer@^8.0.0) para implementar promisses
*/

const inquirer = require('inquirer');

//é usado o método prompt para a passagem de um array (indicado por []) no qual cada elemento é um objeto. Isso é feito para que possa ser passado duas perguntas
const req = inquirer.prompt([
    {
        name: 'p1',
        message: 'O que imprimir? '
    },
    {
        name: 'p2',
        message: "mais 1"
    }
])

/*Os promises possuem um método then para especificar uma ação em caso de requisição bem sucedida. E um catch se houver erro. As perguntas feitas acima originam as respostas que são passadas para answers. Asism, cria-se uma função anônima para executar uma rotina*/
req.then(
    (answers) => console.log(answers)
)
req.catch(
    (err) => console.log(err)
)