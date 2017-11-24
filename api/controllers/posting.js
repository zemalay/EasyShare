module.exports.getAllPostings = (application, req, res) => {
    let posting = new application.api.repositories.posting(application)

    posting.getAll()
        .then(result => res.status(200).json(result))
        .catch(rejected => res.status(412).json(rejected))
}

module.exports.savePosting = (application, req, res) => {
    let posting = new application.api.repositories.posting(application)

    posting.save(req.body)
        .then(result => res.json(result))
        .catch(rejected => res.status(412).json({
            error: rejected.messages
        }))
}

module.exports.getPostingById = (application, req, res) => {

}