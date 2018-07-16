module.exports = app => {
  var auth = require("../repositories/auth.js")();

  app.get("/api/users", auth.authenticate(), (req, res) => {
    app.api.controllers.user.getUsers(app, req, res);
  });
  app.post("/api/user", (req, res) => {
    app.api.controllers.user.saveUser(app, req, res);
  });

  app.put("/api/user/:id", auth.authenticate(), (req, res) => {
    app.api.controllers.user.updateUser(app, req, res);
  });

  app.put("/api/user", auth.authenticate(), (req, res) => {
    app.api.controllers.user.updateUserPassword(app, req, res);
  });

  app.get("/api/user/:userid", auth.authenticate(), (req, res) => {
    app.api.controllers.user.getUserById(app, req, res);
  });
};
