class User {
  constructor(app) {
    this.userSchema = app.api.models.user.Schema;
    this.jwt = require("jwt-simple");
    this.moment = require("moment");
    this.cfg = app.api.models.authconfig;
    this.crypto = require("crypto");
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.userSchema
        .find()
        .then(user => resolve(user))
        .catch(reject);
    });
  }

  async save(user) {
    let account = await this.userSchema.findOne({ email: user.email });

    if (account) throw new Error("Email already exist");

    let username = await this.userSchema.findOne({
      username: user.username
    });

    if (username) throw new Error("Username already exist");

    const hash = this.crypto
      .createHmac("sha256", this.cfg.passSecret)
      .update(user.password)
      .digest("hex");

    user.password = hash;

    let newUser = new this.userSchema(user);

    return new Promise((resolve, reject) => {
      newUser
        .save()
        .then(user => resolve(user))
        .catch(reject);
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.userSchema
        .findById(id)
        .then(user => resolve(user))
        .catch(reject);
    });
  }

  update(account) {
    return new Promise((resolve, reject) => {
      this.userSchema
        .update({ _id: account.id }, account)
        .then(user => resolve(user))
        .catch(reject);
    });
  }

  async updatePassword(user) {
    let account = await this.userSchema.findOne({ _id: user.id });

    if (!account) throw new Error("User not exist");

    const hash = this.crypto
      .createHmac("sha256", this.cfg.passSecret)
      .update(user.password)
      .digest("hex");

    user.password = hash;

    if (user.password !== account.password)
      throw new Error("Password did not match");

    const newHash = this.crypto
      .createHmac("sha256", this.cfg.passSecret)
      .update(user.newPassword)
      .digest("hex");

    user.newPassword = newHash;
    return await this.userSchema.findOneAndUpdate(
      { _id: user.id },
      { $set: { password: user.newPassword } },
      { new: true }
    );
  }

  async getAuth(user) {
    const hash = this.crypto
      .createHmac("sha256", this.cfg.passSecret)
      .update(user.password)
      .digest("hex");
    user.password = hash;

    let account = await this.userSchema.findOne({
      email: user.email
    });
    if (!account) throw new Error("Account not found");

    if (account.password !== user.password)
      throw new Error("Password not match");
    account.token = this.generateToken(account);

    return account;
  }

  generateToken(account) {
    let payload = {
      init: this.moment().unix(),
      exp: this.moment()
        .add(24, "hours")
        .unix()
    };

    return this.jwt.encode(payload, this.cfg.jwtSecret);
  }
}

module.exports = function() {
  return User;
};
