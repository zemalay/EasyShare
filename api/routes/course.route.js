module.exports = (app) => {
    app.post('/api/course', function (req, res) {
        app.api.controllers.course.saveCourse(app, req, res)
    })

    app.get('/api/courses', function (req, res) {
        app.api.controllers.course.getCourses(app, req, res)
    });
}