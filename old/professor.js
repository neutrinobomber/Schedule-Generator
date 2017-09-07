class Professor { // tova e uchitel
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courseClasses = [];
    }

    addCourseClass(courseClass) {
        this.courseClasses.push(courseClass);
    }
}

module.exports = { Professor }