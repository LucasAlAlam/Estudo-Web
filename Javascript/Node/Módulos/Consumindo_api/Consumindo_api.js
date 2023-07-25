//Importa os módulos utilizados
const url = require('url')
const https = require('https')

//Cria os objetos Date. Data Inicial é dada como 7 dias atrás. Para isso, basta subtrair 7 da data atual. Se houver mudança de mês ou ano, isso será considerado automaticamente pelo objeto Date
const dataFinal = new Date() 
const dataInicial = new Date(
    dataFinal.getFullYear(), 
    dataFinal.getMonth(), 
    (dataFinal.getDate()-7)
    )

//Cria um objeto URL com o construtor da classe, sendo passado por argumento o caminho da API    
const bacenAPI = new url.URL('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)')

//Seta os parâmetros da requisição:
//Data inicial da busca
bacenAPI.searchParams.set('@dataInicial', '\''+(dataInicial.getMonth()+1)+'-'+dataInicial.getDate()+'-'+dataInicial.getFullYear()+'\'')
//Data Final da busca
bacenAPI.searchParams.set('@dataFinalCotacao', '\''+(dataFinal.getMonth()+1)+'-'+dataFinal.getDate()+'-'+dataFinal.getFullYear()+'\'')
//Filtra o primeiro resultado
bacenAPI.searchParams.set('$top', '1')
//Organiza pela dataHoraCotacao de maneira decrescente
bacenAPI.searchParams.set('$orderby', 'dataHoraCotacao desc')
//Formato da resposta em JSON
bacenAPI.searchParams.set('$format', 'json')
//filtra os dados de cotacaoCompra e dataHoraCotacao
bacenAPI.searchParams.set('$select', 'cotacaoCompra,dataHoraCotacao')
//Tudo isso acima é feito com o método set nos parâmentros de busca

//Configurada a URL, vamos fazer a requisição usando http com o método get. Por alguma razão, a classe URL troca o espaço por +, então é necessário dar replace em + para %20. A resposta será referenciada por res, que será um rstream de registro do evento
https.get(bacenAPI.href.replace('+', '%20'), (res)=>{
    res.on('data', (data)=>{ //res.on é um event emitter (Estudo-Web/Javascript/Node/Introdução/eventEmitter.js). É um método que é evocado quando há uma resposta da requisição, ou seja, um disparo do evento que será lido por res. Como parâmentro, é passado um evento 'data' e um listener (data) com uma rotina a ser executada quando tal evento ocorrer
        const info = JSON.parse(data.toString('utf-8').replace('[', '').replace(']',''))
        //passa o data para json tirando os caracteres de colchetes
        console.log('O valor do dólar hoje é: '+info.value.cotacaoCompra)
    })
})