module.exports = (application) => {
    application.post('/api/authenticate', (req, res) => {
        application.api.controllers.user.authUser(application, req, res)
    })
}