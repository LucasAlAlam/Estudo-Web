const fs = require('fs')

fs.writeFile('arquivo.txt', "Escrevendo isso por write", ()=>{
    console.log("callback de write")
})