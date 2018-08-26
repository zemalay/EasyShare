module.exports = app => {
  var auth = require("../repositories/auth.js")();
  app.post("/api/course", auth.authenticate(), function(req, res) {
    app.api.controllers.course.saveCourse(app, req, res);
  });

  app.get("/api/courses", auth.authenticate(), function(req, res) {
    app.api.controllers.course.getCourses(app, req, res);
  });

  app.get("/api/course/:courseid", auth.authenticate(), (req, res) => {
    app.api.controllers.course.getCourseById(app, req, res);
  });

  app.put("/api/course/:courseid", auth.authenticate(), (req, res) => {
    app.api.controllers.course.updateCourse(app, req, res);
  });
};
