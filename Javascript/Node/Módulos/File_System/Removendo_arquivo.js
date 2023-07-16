const fs = require('fs')

fs.unlink("arquivo.txt", (err)=>{
    if (err){
        console.log("erro ao excluir arquivo: "+err)
        return
    }
    else 
        console.log("Arquivo Excluído!")
})