const fs = require ('fs')

fs.writeFile('arquivo.txt', 'Arquivo escrito com método síncrono', () =>{
    fs.readFile('arquivo.txt', 'utf-8', (err, data) => {
        console.log(data)
    })
}) 

/* As funções, no "estado natual" digamos assim, são assíncronas no Node. Nesse exemplo, estamos usando uma função para criar um arquivo com algo escrito. O que está no arquivo será lido no callback. Esse exemplo poderia tender a gerar um callback hell, pois dentro de readFile poderiamos adicionar outra rotina de callbaack, que chamaria outra e assim sucessivamente. Para isso, é mais aconcelhavel o uso de promises
*/