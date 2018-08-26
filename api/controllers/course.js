module.exports.saveCourse = (app, req, res) => {
  let course = new app.api.repositories.course(app);
  
  course
    .save(req.body)
    .then(result => res.status(201).json(result))
    .catch(rejected =>
      res.status(409).json({
        error: rejected.message
      })
    );
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

module.exports.getCourseById = (app, req, res) => {
  let course = new app.api.repositories.course(app);
  console.log(req.params.courseid)
  course
    .getById(req.params.courseid)
    .then(result => res.json(result))
    .catch(rejected => res.status(412).json({ error: rejected }));
};

module.exports.updateCourse = (app, req, res) => {
  let course = new app.api.repositories.course(app);
  let newcourse = req.body;
  newcourse.id = req.params.courseid;

  course
    .update(newcourse)
    .then(result => res.status(200).json(result))
    .catch(rejected =>
      res.status(412).json({
        error: rejected.message
      })
    );
};
