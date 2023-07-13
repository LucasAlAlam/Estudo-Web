const http = require ('http')
const port = 5000

const server = http.createServer((req,res) => {
    res.write('Server Node rodando')    //Envia requisição HTTP com texto puro
    res.end()   //fim da sessão
})

server.listen(port, () => { //O servidor irá ouvir uma determinada porta. Isso será importante para o tratamento de eventos
    console.log('servidor rodando na porta '+port)
} )