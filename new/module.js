class Module {
    constructor(moduleId, moduleCode, someModule, professorIds) {
        this._moduleId = moduleId;
        this._moduleCode = moduleCode;
        this._module = someModule;
        this._professorIds = professorIds;
    }

    getModuleId() {
        return this._moduleId;
    }

    getModuleCode() {
        return this._moduleCode;
    }

    getModuleName() {
        return this._module;
    }

    getRandomProfessorID() {
        const result = this.professorIds[
                Math.floor(Math.random() * this.professorIds.length)];
        return result;
    }
}

module.exports = Module;