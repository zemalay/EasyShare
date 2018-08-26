class Course {
  constructor(app) {
    this.courseSchema = app.api.models.course.Schema;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.courseSchema
        .find()
        .then(course => resolve(course))
        .catch(reject);
    });
  }

  async save(newCourse) {
    let course = await this.courseSchema.findOne({ name: newCourse.name });
    
    if (course) throw new Error("Course already exist");

    let objCourse = new this.courseSchema(newCourse);

    return new Promise((resolve, reject) => {
      objCourse
        .save()
        .then(user => resolve(user))
        .catch(reject);
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.courseSchema
        .findById(id)
        .then(course => resolve(course))
        .catch(reject);
    });
  }

  update(course) {
    return new Promise((resolve, reject) => {
      this.courseSchema
        .update({ _id: course.id }, course)
        .then(course => resolve(course))
        .catch(reject);
    });
  }
}

module.exports = function() {
  return Course;
};
