const fs = require ('fs').promises
//instancia o módulo de file system com promises
const arquivo = fs.writeFile('arquivo.txt', 'Arquivo escrito com método síncrono e promises')
arquivo.then(console.log("Arquivo criado!"))
//cria um arquivo e faz uma resposta com then
arquivo.then(fs.readFile('arquivo.txt', 'utf-8').then(data => console.log(data)))