class User {
  constructor(app) {
    this.userSchema = app.api.models.user.Schema;
    this.jwt = require("jwt-simple");
    this.moment = require("moment");
    this.cfg = app.api.models.authconfig;
    this.crypto = require("crypto");
  }

  async getAll() {
    try {
      return await this.userSchema.find();
    } catch (error) {
      throw error;
    }
  }

  async save(user) {
    try {
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
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      let account = await this.userSchema.findById(id);
      if (!account) throw new Error("User not exist");
      return account;
    } catch (error) {
      throw error;
    }
  }

  async update(account) {
    try {
      return await this.userSchema.update({ _id: account.id }, account);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(user) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getAuth(user) {
    try {
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

      return this.generateToken(account);
    } catch (error) {
      throw error;
    }
  }

  generateToken(account) {
    let payload = {
      init: this.moment().unix(),
      exp: this.moment()
        .add(24, "hours")
        .unix()
    };

    account.token = this.jwt.encode(payload, this.cfg.jwtSecret);
    return account;
  }
}

module.exports = function() {
  return User;
};
