var scanf = require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
})
/*
O comando acima faz um require de readline. O método createInterface cria uma interface de entrada e saída de comandos, sendo especificado o método de leitura e de saída usando process com stdin e stdout. O input: e output: é apenas para especificar os parâmetros da função. Quando se tem certeza da ordem, pode ficar como está abaixo:

var scanf = require('readline').createInterface(
    process.stdin,
    process.stdout
)*/
scanf.question('Insira um número: ', (insertion) => {
    console.log(insertion)
    scanf.close()
})

/* Esse código é feito usando callbacks. A execução é assincrona. É enviado uma requisição de leitura para o sistema operacional. Até ocorrer o processamento, o código é executado. O próximo console.log é executado antes que haja inserção de input. */
console.log("Teste")