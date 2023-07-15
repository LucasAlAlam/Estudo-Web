const fs = require('fs')
const http = require('http')

http.createServer((req, res)=>{
    const url = require('url').parse(req.url, true)
    const user = url.query.user
    const pass = url.query.pass
    console.log(url.pathname)
    if (!user && !pass && url.pathname=='/') {
        fs.readFile('index.html', 'utf-8', (err, data)=>{
            res.writeHead(200, {"Contenty-type":"text/html"})
            res.write(data)
            return res.end()
        })
    } else if(user || pass){
        fs.readFile('Users.json', 'utf-8', (err, data)=>{
            if (err) {
                console.log(err)
            }
            else{
                var reader=JSON.parse(data)
                if (user==reader.user && pass==reader.pass) {
                    res.writeHead(302, {Location:"/authenticated.html"})
                    return res.end()
                } else {
                    res.writeHead(302, {Location:"/Rejected.html"})
                    return res.end()
                }
            }
        })
    } else if (url.pathname=="/authenticated.html") {
        fs.readFile("authenticated.html", 'utf-8', (err, data)=>{
            res.writeHead(200, {"Contenty-type":"text/html"})
            res.write(data)
            res.end()
        })
    }
    else if (url.pathname=="/Rejected.html") {
        fs.readFile("Rejected.html", 'utf-8', (err, data)=>{
            res.writeHead(200, {"Contenty-type":"text/html"})
            res.write(data)
            res.end()
        })
    }
}).listen(8000)