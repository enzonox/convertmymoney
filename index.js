const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBcb = require('./lib/api.bcb')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) => {
    const cotacao = await apiBcb.getCotacao()
    res.render('home', {
        cotacao
    }) 
})
app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos ou não preenchidos'
        })
    }
})

app.listen(3000, err => {
    if(err){
        console.log('não foi possível iniciar')
    } else {
        console.log('ConvertMyMoney está online')
    }
})