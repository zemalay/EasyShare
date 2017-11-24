module.exports = (application) => {
    var auth = require('../repositories/auth.js')()

    application.get('/api/getusers', auth.authenticate(), (req, res) => {
        application.api.controllers.user.getUsers(application, req, res)
    })
    application.post('/api/saveuser', (req, res) => {
        application.api.controllers.user.saveUser(application, req, res)
    })

    application.put('/api/user/:id', (req, res) => {
        application.api.controllers.user.updateUser(application, req, res)
    })

    application.put('/api/userkeyupdt', (req, res) => {
        application.api.controllers.user.updateUserPassword(application, req, res)
    })

    application.get('/api/getuser/:userid', auth.authenticate(), (req, res) => {
        application.api.controllers.user.getUserById(application, req, res)
    })
}