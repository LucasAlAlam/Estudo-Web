//Os argumentos são passados para um array denominado process.argv

var minimist = require('minimist') //O minimist serve para transformar o array de argumentos em um vetor associativo. Espera argumentos no formato --<nome da associação> = <conteúdo da associação>
var arg = minimist(process.argv)

console.log(arg['name'])

/*process.argv.forEach((element) => {
    console.log(element)
}); 

leitura dos argumentos sem o minimist
*/

/*console.log(process.argv[3]) printa o terceiro argumento

lembrando que os argumentos estão organizados na seguinte ordem 
executável do node
nome do arquivo
argumento 1
argumento 2
    .
    .
    .
argumento n
*/