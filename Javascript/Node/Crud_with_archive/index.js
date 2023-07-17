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
        //404
    }
}).listen(5000)