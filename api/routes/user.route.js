module.exports = (application) => {
    application.get('/api/getusers', (req, res) => {
        application.api.controllers.user.getUsers(application, req, res)
    })
    application.post("/api/saveuser", (req, res) => {
        application.api.controllers.user.saveUser(application, req, res)
    })
}
