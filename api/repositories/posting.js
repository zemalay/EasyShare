class Posting {
    constructor(application) {
        this.postingSchema = application.api.models.posting.Schema

    }

    async save(posting) {
        try {
            let newPosting = new this.postingSchema(posting)
            return await newPosting.save(posting)
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        try {
            return await this.postingSchema.find()
        } catch (error) {
            throw error
        }
    }

}

module.exports = function () {
    return Posting;
}