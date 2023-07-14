const http = require('http')

const server = http.createServer((req, res)=>{

    const url = require('url').parse(req.url, true)
    /*retorna um objeto para url contendo um parâmetro query com um objeto dentro contendo as querys passadas. Isso é definido pelo argumento true. Se fosse false, iria ser retornada uma string sem tratamento */
    const fname = url.query.fname
    const lname = url.query.lname
    //passa para fname e lname os seus respectivos atributos de dentro do objeto query de url

    if(fname || lname){
        res.end("<h1>Seu nome é "+fname+" "+lname+"</h1>")
    }else{
        res.end('<h1> Preencha seu nome:</h1><form method="get"><label for="nome">Frist name</label><br><input type="text" id="nome" name="fname"><br><label for="lname">Last name</label><br><input type="text" name="lname"><br><input type="submit" value="Submit"> </form>')
    }
}).listen(8000)