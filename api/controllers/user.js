/**
 * @api {get} getusers/ Request for Users informations
 * @apiName GetUsers
 * @apiGroup User
 * @apiSuccess {Object} List of all Users
 */
module.exports.getUsers = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.getAll()
        .then(resolve => res.json(resolve))
        .catch(rejected => res.json(rejected))
}

module.exports.saveUser = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.save(req.body)
        .then(resolve => res.json(resolve))
        .catch(rejected => res.json(rejected))
}

module.exports.getUserById = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.get(req.params.userid)
        .then(resolve => res.json(resolve))
        .catch(rejected => res.status(204).json(rejected))
}

module.exports.authUser = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.getAuth(req.body)
        .then(resolve => res.json(resolve))
        .catch(rejected => res.json(rejected))
}