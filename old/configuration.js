const { Professor } = require('./professor');
const { StudentsGroup } = require('./students.group');
const { Course } = require('./course');
const { Room } = require('./room');
const { CourseClass } = require('./course.class');

const professors = [
    new Professor(1, 'Daskal'),
];

const studentsGroups = [
    new StudentsGroup(1, '9G', 30),
];

const courses = [
    new Course(1, 'german'),
];

const rooms = [
    new Room('kenef', false, 30),
];

const courseClasses = [
    new CourseClass(professors[0], courses[0], studentsGroups, false, 45),
];

class Configuration {
    static getProfessorByID(id) {
        return professors[0];
    }

    static getNumberOfProfessors() {
        return professors.length;
    }

    static getStudentsGroupByID(id) {
        return studentsGroups[0];
    }

    static getNumberOfStudentsGroups() {
        return studentsGroups.length;
    }

    static getCourseByID(id) {
        return courses[0];
    }

    static getNumberOfCourses() {
        return courses.length;
    }

    static getRoomByID(id) {
        return rooms[0];
    }

    static getNumberOfRooms() {
        return rooms.length;
    }

    static getCourseClasses() {
        return courseClasses;
    }

    static getNumberOfCourseClasses() {
        return courseClasses.length;
    }

    static isEmpty() {
        return true;
    }
}

module.exports = { Configuration };