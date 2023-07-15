const url = require('url')
const https = require('https')
const dataFinal = new Date() 
const dataInicial = new Date(
    dataFinal.getFullYear(), 
    dataFinal.getMonth(), 
    (dataFinal.getDate()-7)
    )
const bacenAPI = new url.URL('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)')
bacenAPI.searchParams.set('@dataInicial', '\''+(dataInicial.getMonth()+1)+'-'+dataInicial.getDate()+'-'+dataInicial.getFullYear()+'\'')
bacenAPI.searchParams.set('@dataFinalCotacao', '\''+(dataFinal.getMonth()+1)+'-'+dataFinal.getDate()+'-'+dataFinal.getFullYear()+'\'')
bacenAPI.searchParams.set('$top', '1')
bacenAPI.searchParams.set('$orderby', 'dataHoraCotacao desc')
bacenAPI.searchParams.set('$format', 'json')
bacenAPI.searchParams.set('$select', 'cotacaoCompra,dataHoraCotacao')

https.get(bacenAPI.href.replace('+', '%20'), (res)=>{
    res.on('data', (data)=>{
        const info = JSON.parse(data.toString('utf-8').replace('[', '').replace(']',''))
        console.log('O valor do dólar hoje é: '+info.value.cotacaoCompra)
    })
})