const fs = require('fs') //importa um módulo

fs.readFile('arquivo.txt', 'utf-8', (err, data)=>{err?console.log(err):console.log(data)}) //usa um método readFile do módulo
//o último argumento é uma função anônima passada para especificar uma rotina com o conteúdo data do arquivo
//https://ricardo-reis.medium.com/fun%C3%A7%C3%B5es-an%C3%B4nimas-javascript-92361075fd89