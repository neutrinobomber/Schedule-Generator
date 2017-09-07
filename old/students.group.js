class StudentsGroup { // tova e klas
    constructor(id, name, numberOfStudents) {
        this.id = id;
        this.name = name;
        this.numberOfStudents = numberOfStudents;
        this.courseClasses = [];
    }

    addClass(someClass) {
        this.courseClasses.push(someClass);
    }
}

module.exports = { StudentsGroup }