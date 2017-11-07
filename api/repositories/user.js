/**
 * @author Geovannio Vinhas
 * @param {user} application 
 * 
 */

function user(application) {

    let userSchema = application.api.models.user.Schema
    const jwt = require('jwt-simple'),
        moment = require('moment'),
        cfg = application.api.models.authconfig,
        crypto = require('crypto')
    /**
     * Get all users in database
     * @method getALL
     * 
     */
    user.prototype.getAll = async () => {
        try {
            return await userSchema.find()
        } catch (error) {
            throw error
        }

    }
    user.prototype.save = async (user) => {
        try {
            let account = await userSchema.findOne({ email: user.email })
            if (account) throw new Error('Email exist')
            
            let username = await userSchema.findOne({ username: user.username })
            if (username) throw new Error('Username exist')

            const hash = crypto.createHmac('sha256', cfg.passSecret)
                .update(user.password)
                .digest('hex')

            user.password = hash

            let newUser = new userSchema(user)
            return await newUser.save()
        } catch (error) {
            throw error
        }
    }

    user.prototype.get = async (id) => {
        try {
            return await userSchema.findById(id)
        } catch (error) {
            throw error
        }
    }

    user.prototype.update = (id) => {

    }

    user.prototype.getAuth = async (user) => {

        try {
            const hash = crypto.createHmac('sha256', cfg.passSecret)
                .update(user.password)
                .digest('hex')
            user.password = hash

            let account = await userSchema.findOne({ email: user.email })
            if (!account) throw new Error('Account not found')

            if (account.password !== user.password) throw new Error('Password not match')

            return generateToken(account)
        } catch (error) {
            return error
        }
    }

    // function isEmail(email) {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(email);
    // }

    function generateToken(account) {
        let payload = {
            iat: moment().unix(),
            exp: moment().add(24, 'hours').unix()
        }
        account.token = jwt.encode(payload, cfg.jwtSecret)
        return account
    }
}

module.exports = function () {
    return user;
}