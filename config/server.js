const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    auth = require('../api/repositories/auth.js')(),
    app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(auth.initialize())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE")
    res.setHeader('Access-Control-Allow-Headers', "content-type")
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

/* efetua o autoload das rotas, dos models, dbConn, routes, repositories e controllers para o objeto app */
consign()
    .include('api/routes')
    .then("/config/dbConnection.js")
    .then('api/models')
    .then('api/controllers')
    .then('api/repositories')
    .into(app)

module.exports = app