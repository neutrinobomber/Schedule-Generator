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
        const result = this._professorIds[
                Math.floor(Math.random() * this._professorIds.length)];
        return result;
    }
}

module.exports = Module;