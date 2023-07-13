const http = require ('http')
const port = 5000

const server = http.createServer((req,res) => {
    res.write('Server Node rodando')
    res.end()
})

server.listen(port, () => {
    console.log('servidor rodando na porta '+port)
} )