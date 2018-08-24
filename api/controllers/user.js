module.exports.getUsers = (app, req, res) => {
  let user = new app.api.repositories.user(app);
  user
    .getAll()
    .then(result => res.json(result))
    .catch(rejected =>
      res.status(412).json({
        error: rejected.message
      })
    );
};

module.exports.saveUser = (app, req, res) => {
  let user = new app.api.repositories.user(app);
  user
    .save(req.body)
    .then(result => res.status(201).json(result))
    .catch(rejected =>
      res.status(409).json({
        error: rejected.message
      })
    );
};

module.exports.getUserById = (app, req, res) => {
  let user = new app.api.repositories.user(app);
  user
    .getById(req.params.userid)
    .then(result => res.json(result))
    .catch(rejected =>
      res.status(412).json({
        error: rejected
      })
    );
};

module.exports.updateUser = (app, req, res) => {
  let user = new app.api.repositories.user(app);
  let account = req.body;
  account.id = req.params.id;
  user
    .update(account)
    .then(result => res.status(200).json(result))
    .catch(rejected =>
      res.status(412).json({
        error: rejected.message
      })
    );
};

module.exports.updateUserPassword = (app, req, res) => {
  let user = new app.api.repositories.user(app);
  user
    .updatePassword(req.body)
    .then(result => res.status(201).json(result))
    .catch(rejected =>
      res.status(412).json({
        error: rejected.message
      })
    );
};
module.exports.authUser = (app, req, res) => {
  let user = new app.api.repositories.user(app);
  user
    .getAuth(req.body)
    .then(result => res.json(result))
    .catch(rejected =>
      res.status(401).json({
        error: rejected.message
      })
    );
};
