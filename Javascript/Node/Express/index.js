const express = require ('express') //instancia o express
const path = require ('path')

const app = express() //inicializa o express
const porta = 2000
const diretorioFront = path.join(__dirname, '/Template')

/*Middlewares: Estrutura que realiza uma rotina antes de carregar a página. Podemos fazer uma validação da autenticação por meio de um middleware */

const checkAuth = (req, res, next) => {
    req.authStatus = false //Essa variável pode receber dados de autenticação. É passado o token do usuário que será confrontada com o hash no servidor. Assim, irá retornar verdadeiro ou falso para a autenticação

    if (req.authStatus) {
        console.log('Usuário autenticado')
        next()
    } else {
        console.log('Usuário não autenticado')
        next()
    }
}

//O middleware é executado com essa função, que chama checkAuth com a rotina
app.use(checkAuth)

/* Rotas: são definidas pelo método get do express. Se o usuário faz um get de uma certa rota, definimos o que será feito por meio da calback. Geralmente, é carregada uma página para ser exibida pelo usuário */

app.get('/', (req, res)=>{
    //res.send('Olá, você está rodando no meu servidor!') <== Isso envia uma mensagem ao front. Iremos enviar um arquivo html para o front a seguir
    res.sendFile(`${diretorioFront}/index.html`) //Envia arquivos html para serem rendenizados no front end da aplicação
})

//Podemos usar a url para criar rotas diferentes e passar parâmetros por elas, que serão buscadas peloas atributos de parâmetros 
app.get('/users/:id', (req,res)=>{
    const id = req.params.id

    //Podemos usar o id para fazer uma busca no banco de dados e entregar uma informação para o usuário

    console.log('O id passado foi '+id)
    res.sendFile(diretorioFront+'/users.html')
})

//Com o método listen, o servidor fica escutando uma porta específica

app.listen(porta, ()=>{
    console.log(`Server rodando na porta ${porta}`)
})