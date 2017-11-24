module.exports.getUsers = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.getAll()
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.message
        }))
}

module.exports.saveUser = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.save(req.body)
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.message
        }))
}

module.exports.getUserById = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.get(req.params.userid)
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.message
        }))
}

module.exports.updateUser = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    let account = req.body
    account.id = req.params.id
    user.update(account)
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.message
        }))
}

module.exports.updateUserPassword = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.updatePassword(req.body)
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.message
        }))
}
module.exports.authUser = (application, req, res) => {
    let user = new application.api.repositories.user(application)
    user.getAuth(req.body)
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.message
        }))
}