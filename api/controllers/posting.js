module.exports.getAllPostings = (app, req, res) => {
    let posting = new app.api.repositories.posting(app)

    posting.getAll()
        .then(result => res.status(200).json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.messages
        }))
}

module.exports.savePosting = (app, req, res) => {
    let posting = new app.api.repositories.posting(app)

    posting.save(req.body)
        .then(result => res.status(201).json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.messages
        }))
}

module.exports.w = (app, req, res) => {

}