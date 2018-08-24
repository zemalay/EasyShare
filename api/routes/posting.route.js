module.exports = app => {
  var auth = require("../repositories/auth.js")();

  app.get("/api/postings", auth.authenticate(), (req, res) => {
    app.api.controllers.posting.getAllPostings(app, req, res);
  });

  app.post("/api/posting", auth.authenticate(), (req, res) => {
    app.api.controllers.posting.savePosting(app, req, res);
  });
};
