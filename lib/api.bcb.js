const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    //console.log((today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear())
    return (today.getMonth()+1)+'-'+(today.getDate()-1)+'-'+today.getFullYear()
}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => {
    try{
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err){
        return ''
    }
    
}

module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getToday,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao}),
    getUrl,
    pure: {
        getCotacao
    }
}