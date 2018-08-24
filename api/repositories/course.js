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

  save(newCourse) {
    let objCourse = new this.courseSchema(newCourse);
    return objCourse.save();
  }
}

module.exports = function() {
  return Course;
};
