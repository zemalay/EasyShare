module.exports = app => {
  var auth = require("../repositories/auth.js")();
  app.post("/api/course", auth.authenticate(), function(req, res) {
    app.api.controllers.course.saveCourse(app, req, res);
  });

  app.get("/api/courses", auth.authenticate(), function(req, res) {
    app.api.controllers.course.getCourses(app, req, res);
  });
};
