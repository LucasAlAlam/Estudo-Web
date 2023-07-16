const fs = require('fs')
fs.appendFile('arquivo.txt', "\nEscrevendo  isso no arquivo por append file", ()=>{
    console.log("Callback de append File")
})