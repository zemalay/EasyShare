class Course {
    constructor(app) {
        this.courseSchema = app.api.models.course.Schema
    }

    async getAll() {
        try {
            return await this.courseSchema.find()
        } catch (error) {
            throw error
        }
    }

    async save(newCourse) {
        try {
            let objCourse = new this.courseSchema(newCourse)
            return await objCourse.save(newCourse)
        } catch (error) {
            throw error
        }
    }
}

module.exports = function () {
    return Course;
}