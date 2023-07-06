//Os argumentos são passados para um array denominado process.argv
process.argv.forEach((element) => {
    console.log(element)
}); //leitura dos argumentos

console.log(process.argv[3]) //printa o terceiro argumento
/* lembrando que os argumentos estão organizados na seguinte ordem 
executável do node
nome do arquivo
argumento 1
argumento 2
    .
    .
    .
argumento n
*/