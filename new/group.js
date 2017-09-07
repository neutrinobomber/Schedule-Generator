class Group {
    constructor(groupId, groupSize, moduleIds) {
        this._groupId = groupId;
        this._groupSize = groupSize;
        this._moduleIds = moduleIds;
    }

    getGroupId() {
        return this._groupId;
    }

    getGroupSize() {
        return this._groupSize;
    }

    getModuleIds() {
        return this._moduleIds;
    }
}

module.exports = Group;