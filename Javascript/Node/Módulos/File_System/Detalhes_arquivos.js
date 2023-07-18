const fs = require('fs')

fs.stat('/etc/passwd', (err, data)=>{
    if(err)
        console.log(err)
    else
        console.log(data.isFile(), data.isDirectory(), data.isSymbolicLink(), data.ctime, data.isFIFO(), data)
})

//O método stat mostra detalhes do arquivo. Esse método cria um objeto data que contém os dados de um arquivo