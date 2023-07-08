var scanf = require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
})
/*
O comando acima faz um require de readline. O método createInterface cria uma interface de entrada e saída de comandos
var scanf = require('readline').createInterface(
    process.stdin,
    process.stdout
)*/
scanf.question('Insira um número: ', (insertion) => {
    console.log(insertion)
    scanf.close()
})