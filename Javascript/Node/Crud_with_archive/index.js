const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
    const link = url.parse(req.url, true)
    console.log("1 "+link.pathname)
    if (link.pathname == '/' || link.pathname == '/index.html') {
        fs.readFile('index.html', 'utf-8', (err, data)=>{
            res.writeHead(200, {'Contenty-Type':'text/html'})
            res.write(data)
            console.log('2')
            res.end()
        })
    }
    else if(link.pathname == '/login.html'){
        console.log('Entrou no login'+link.pathname)
        if(link.query.name && link.query.pass){
            console.log('Tem um name e pass'+link.pathname)
            fs.readFile('Users.json', 'utf-8', (err, data)=>{
                console.log('carregou users.json'+link.pathname)
                const json = JSON.parse(data)
                const jsonFiltrado = json.users
                var usuarioEncontrado = jsonFiltrado.find((jsonFiltrado)=>{
                    return jsonFiltrado.name==link.query.name
                })
                console.log(jsonFiltrado,usuarioEncontrado)
                if (usuarioEncontrado) {
                    console.log('9'+link.pathname)
                    if(usuarioEncontrado.pass==link.query.pass){
                        res.writeHead(200, {'Contenty-Type':'text/html'})
                        res.write('Acesso Permitido! <a href="login.html">Sair</a>')
                        res.end()
                    }
                    else{
                        console.log('10'+link.pathname)
                        res.writeHead(401, {'Contenty-Type':'text/html'})
                        fs.readFile('unauthorized.html', 'utf-8', (err,data)=>{
                            res.end(data)
                        })
                    }
                } else {
                    console.log('11'+link.pathname)
                    res.writeHead(404, {'Contenty-Type':'text/html'})
                    fs.readFile('not_found.html', 'utf-8', (err,data)=>{
                        res.end(data)
                    }) 
                }
            })
        } else {
            console.log('6'+link.pathname)
            fs.readFile('login.html', 'utf-8', (err,data)=>{
                res.writeHead(200, {'Contenty-Type': 'text/html'})
                res.write(data)
                res.end()
            })
        }
    }
    else if(link.pathname == '/cadastro.html'){
        console.log('3 '+link.pathname)
        console.log(link)
        if (link.query.name && link.query.pass) {
            fs.readFile('Users.json', 'utf-8', (err, data)=>{
                const json=JSON.parse(data)
                console.log(json.users.length, link.query.name, link.query.pass)
                json['users'][json.users.length] = {
                    "name":link.query.name,
                    "pass":link.query.pass
                }
                fs.writeFile('Users.json', JSON.stringify(json), (err, data)=>{
                    if (err) {
                        console.log(err)
                    } else {
                    res.statusCode = 200
                    }
                })
                res.writeHead(302, {Location:"/cadastro.html"})
                res.end()
            })
        } else {
            console.log('4')
            fs.readFile('cadastro.html', 'utf-8', (err, data)=>{
                res.writeHead(200, {'Contenty-Type':'text/html'})
                res.write(data)
                res.end()
            })
        }
    }
    else {
        res.writeHead(404, {'Contenty-Type':'text/html'})
                    fs.readFile('not_found.html', 'utf-8', (err,data)=>{
                        res.end(data)
                    }) 
    }
}).listen(5000)