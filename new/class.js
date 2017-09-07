class Class {
    constructor(classId, groupId, moduleId) {
        this._classId = classId;
        this._groupId = groupId;
        this._moduleId = moduleId;
        this._professorId = 0;
        this._timeslotId = 0;
        this._roomId = 0;
    }

    addProfessor(professorId) {
        this._professorId = professorId;
    }

    addTimeslot(timeslotId) {
        this._timeslotId = timeslotId;
    }

    setRoomID(roomId) {
        this._roomId = roomId;
    }

    getClassId() {
        return this._classId;
    }

    getGroupId() {
        return this._groupId;
    }

    getModuleId() {
        return this._moduleId;
    }

    getProfessorId() {
        return this._professorId;
    }

    getTimeslotId() {
        return this._timeslotId;
    }

    getRoomId() {
        return this._roomId;
    }
}

module.exports = Class;