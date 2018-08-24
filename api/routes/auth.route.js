module.exports = app => {
  app.post("/api/authenticate", (req, res) => {
    app.api.controllers.user.authUser(app, req, res);
  });
};
