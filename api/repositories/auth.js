const passport = require('passport'),
    passportJWT = require('passport-jwt'),
    ExtractJwt = passportJWT.ExtractJwt,
    Strategy = passportJWT.Strategy,
    moment = require('moment'),
    cfg = require('../models/authconfig'),

    params = {
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