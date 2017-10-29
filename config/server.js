/* importar o módulo do framework express */
var express = require('express')

/* importar o módulo do consign */
var consign = require('consign')

/* importar o módulo do body-parser */
var bodyParser = require('body-parser')

var multiparty = require('connect-multiparty')



/* iniciar o objeto do express */
var app = express()


/* configurar o middleware express.static */
app.use(express.static('./api/public'))

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }))


app.use(multiparty())

// app.use( (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', "*")
//     res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE")
//     res.setHeader('Access-Control-Allow-Headers', "content-type")
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     next()
// })

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('api/routes')
	.then("/config/dbConnection.js")
	.then('api/models')
	.then('api/controllers')
	.into(app)

/* exportar o objeto app */
module.exports = app