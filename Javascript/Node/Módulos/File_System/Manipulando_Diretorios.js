const fs = require('fs')


while (!fs.existsSync('./DirTeste')) {
    console.log('Pasta está sendo criada')
    fs.mkdirSync('DirTeste')
}
console.log("Pasta existe")

//O File System possui funções para manipulação de diretórios