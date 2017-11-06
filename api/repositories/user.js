/**
 * @author Geovannio Vinhas
 * @param {user} application 
 * 
 */

function user(application) {

    let userSchema = application.api.models.user.Schema
    /**
     * Get all users in database
     * @method getALL
     * 
     */
    user.prototype.getAll = (callback) => {
        userSchema.find(callback)
    }
    user.prototype.save = (user, callback) => {
        let newUser = new userSchema(user)
        newUser.save(callback)

    }

    user.prototype.get = (id, callback) => {
        userSchema.findById(id, callback)
    }

    user.prototype.update = (id) => {

    }

    user.prototype.getAuth = (user, callback) => {
        userSchema.find({ 'email': user.email, 'password': user.password }, callback)
    }
}

module.exports = function () {
    return user;
}