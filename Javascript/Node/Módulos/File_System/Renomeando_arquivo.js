const fs = require('fs')

fs.rename('arquivo.txt', 'arquivonovo.txt', (err)=>{
    if(err){
        console.log(err)
        return
    }
    else {
        console.log('arquivo renomeado!')
    }
})