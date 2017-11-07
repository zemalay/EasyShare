var passport = require('passport')
var passportJWT = require('passport-jwt')
var ExtractJwt = passportJWT.ExtractJwt
var Strategy = passportJWT.Strategy
var moment = require('moment')
var cfg = require('../models/authconfig')

var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
    let strategy = new Strategy(params, (payload, done) => {
        if (payload.exp >= moment().unix()) {
            return done(null, payload)
        } else {
            return done(new Error('Token expired'), null)
        }
    })
    passport.use(strategy)
    return {
        initialize: () => {
            return passport.initialize()
        },
        authenticate: () => {
            return passport.authenticate('jwt', cfg.jwtSession)
        }
    }
}