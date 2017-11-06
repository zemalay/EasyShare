/**
 * @api {get} getusers/ Request for Users informations
 * @apiName GetUsers
 * @apiGroup User
 * @apiSuccess {Object} List of all Users
 */
module.exports.getUsers = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.getAll((err, results) => {
        if (err) return res.json(err)
        res.json(results)
    })
}
module.exports.saveUser = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.save(req.body, (err, result) => {
        if (err) return res.json(err)
        res.json(result)
    })
}

module.exports.getUserById = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.get(req.params.userid, (err, result) => {
        if (err) return res.json(err)
        res.json(result)
    })
}

module.exports.authUser = (application, req, res) => {
    let jwt = require('jwt-simple')
    let moment = require('moment')
    let user = new application.api.repositories.user(application)
    let cfg = application.api.models.authconfig
    user.getAuth(req.body, (err, user) => {
        if (err) return res.json(err)
        if (user.length != 0 && user.length == 1) {
            let payload = {
                iat: moment().unix(),
                exp: moment().add(24, 'hours').unix()
            }
            let token = jwt.encode(payload, cfg.jwtSecret)
            return res.json({ messages: 'Your token has duration 24 hours', token: token })
        } else {
            res.json({ message: 'O email ou a senha incorreto' })
        }
    })
}