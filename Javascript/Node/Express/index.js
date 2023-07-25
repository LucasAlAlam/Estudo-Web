const express = require ('express')
const path = require ('path')

const app = express()
const porta = 2000
const diretorioFront = path.join(__dirname, '/Template')

app.get('/', (req, res)=>{
    //res.send('Olá, você está rodando no meu servidor!') <== Isso envia uma mensagem ao front. Iremos enviar um arquivo html para o front a seguir
    res.sendFile(`${diretorioFront}/index.html`) //Envia arquivos html para serem rendenizados no front end da aplicação
})

app.listen(porta, ()=>{
    console.log(`Server rodando na porta ${porta}`)
})