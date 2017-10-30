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
    console.log(req.params.userid)
    user.get(req.params.userid, (err, result) => {
        if (err) return res.json(err)
        res.json(result)
    })
}