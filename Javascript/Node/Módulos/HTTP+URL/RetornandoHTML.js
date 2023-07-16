const http = require ('http')
const fs = require ('fs').promises
const port = 5000 //Inicializa porta

const server = http.createServer((req,res) => {
    res.statusCode=200 //Retorna um status code 200 (OK)
    res.setHeader('Contenty-type', 'text/html') //Seta o head da requisição http
    fs.readFile('../../../../Curso PHP/PHPmoderno/formulário.html', 'utf-8') //busca arquivo html
    .then( 
        (data)=>res.end(data) //data recebe o arquivo e apresenta por meio do metodo end
    )
    .catch((err)=>console.log("Erro ao carregar a página"+err))
})

server.listen(port, () => {
    console.log('servidor rodando na porta '+port)
})