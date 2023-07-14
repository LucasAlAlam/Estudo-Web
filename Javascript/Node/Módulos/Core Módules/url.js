const url = require('url')
//cria um objetos da classe date
const dataFinal = new Date() 
const dataInicial = new Date(
    dataFinal.getFullYear(), 
    dataFinal.getMonth(), 
    (dataFinal.getDate()-7)
    )
//Aqui, o construtor da classe está no módulo URL, que foi instanciado para url(minúsculo). Então, por isso que é feito new url(módulo).URL(construtor)
const bacenAPI = new url.URL('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)')

/*
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
Esse é o encadeamento dos atributos dessa classe URL. 
*/

//Podemos sertar atributos na URL
bacenAPI.searchParams.set('@dataInicial', '\''+(dataInicial.getMonth()+1)+'-'+dataInicial.getDate()+'-'+dataInicial.getFullYear()+'\'')
bacenAPI.searchParams.set('@dataFinalCotacao', '\''+(dataFinal.getMonth()+1)+'-'+dataFinal.getDate()+'-'+dataFinal.getFullYear()+'\'')
bacenAPI.searchParams.set('$top', '1')
bacenAPI.searchParams.set('$orderby', 'dataHoraCotacao desc')
bacenAPI.searchParams.set('$format', 'json')
bacenAPI.searchParams.set('$select', 'cotacaoCompra,dataHoraCotacao')

//Aqui, o link da URL é pego. Porém, os espaços são substituídos por + ao invés de %20 para fazer a requisição Essa é a razão do replace.
console.log(bacenAPI.href.replace('+', '%20'))
//Reparar que replace é método da classe string. Como bacenAPI.href é uma string, ele pode ser chamado. Depois, ele poderá ser chamado de novo, pois bacenAPI.href.replace('+', '%20') também é string

//Podemos retomar parâmetros
console.log(bacenAPI.host)
console.log(bacenAPI.pathname)
console.log(bacenAPI.search)
console.log(bacenAPI.searchParams)
console.log(bacenAPI.searchParams.get('$select'))