module.exports.saveCourse = (app, req, res) => {
    let course = new app.api.repositories.course(app)
    course.save()
}

module.exports.getCourses = (app, req, res) => {
    let course = new app.api.repositories.course(app)
    course.getAll()
        .then(resolve => res.json(resolve))
        .catch(rejected => res.status(412).json({
            error: rejected.messages
        }))
}