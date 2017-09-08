class Professor {
    constructor(professorId, professorName) {
        this._professorId = professorId;
        this._professorName = professorName;
    }

    getProfessorId() {
        return this._professorId;
    }

    getProfessorName() {
        return this._professorName;
    }
}

module.exports = Professor;