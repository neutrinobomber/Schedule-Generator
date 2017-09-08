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

    getRandomProfessorId() {
        return this._professorIds[
            Math.floor(Math.random() * this._professorIds.length)];
    }
}

module.exports = Module;