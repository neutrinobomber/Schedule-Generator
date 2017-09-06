class CourseClass { // tova e chas/urok
    constructor(professor, course, groups, requiresLab, duration) {
        this.professor = otherProfessor;
        this.course = course;
        this.groups = groups;
        this.requiresLab = requiresLab;
        this.duration = duration;
        this.numberOfSeats = 0;

        this.professor.addCourseClass(this);

        for (let group of this.groups) {
            group.addClass(this);
            this.numberOfSeats = this.numberOfSeats + group.numberOfStudents;
        }
    }

    groupsOverlaps(otherCourseClass) {
        for (let group of this.groups) {
            for (let otherGroup of otherCourseClass.groups) {
                if (group === otherGroup) {
                    return true;
                }
            }
        }

        return false;
    }

    professorOverlaps(otherCourseClass) {
        if (this.professor === otherCourseClass.professor) {
            return true;
        }

        return false;
    }
}

module.exports = { CourseClass }