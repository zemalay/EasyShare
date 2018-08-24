module.exports.saveCourse = (app, req, res) => {
  let course = new app.api.repositories.course(app);
  course.save();
};

module.exports.getCourses = (app, req, res) => {
  let course = new app.api.repositories.course(app);
  course
    .getAll()
    .then(courses => res.json(courses))
    .catch(err =>
      res.status(412).json({
        error: err.messages
      })
    );
};
