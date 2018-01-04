class Posting {
    constructor(app) {
        this.postingSchema = app.api.models.posting.Schema

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

    async getByCourse(course) {
        try {
            return await this.postingSchema.find({ course: course })
        } catch (error) {
            throw error
        }
    }

    async getBySubjects(subjects) {
        try {
            return await this.postingSchema.find({ subjects: subjects })
        } catch (error) {
            throw error
        }
    }

}

module.exports = function () {
    return Posting;
}