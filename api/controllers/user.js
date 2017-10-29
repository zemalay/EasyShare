module.exports.getUsers = (application, req, res) => {
    var Users = application.api.models.user.Schema

    Users.find((err, data) => {
        if (err) return res.json(err)
        res.json(data)
    })
}
module.exports.saveUser = (application, req, res) => {
    var User = application.api.models.user.Schema

    var newUser = new User(req.body)
    newUser.save((err, user) => {
        if (err) return res.json(err)
        res.json(user)
    })
}