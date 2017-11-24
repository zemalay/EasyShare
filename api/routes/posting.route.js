module.exports = (application) => {
    var auth = require('../repositories/auth.js')()

    application.get('/api/getpostings', auth.authenticate(), (req, res) => {
        application.api.controllers.posting.getAllPostings(application, req, res)
    })

    application.post('/api/saveposting', auth.authenticate(), (req, res) => {
        application.api.controllers.posting.savePosting(application, req, res)
    })

}

