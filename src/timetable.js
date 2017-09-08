/* global Map */
/* eslint no-console: 0 */

const Room = require('./room');
const Professor = require('./professor');
const Module = require('./module');
const Group = require('./group');
const Timeslot = require('./timeslot');
const Class = require('./class');

class Timetable {
    constructor(cloneable) {
        this._classes = [];
        this._numClasses = 0;

        if (cloneable) {
            this._rooms = cloneable.getRooms();
            this._professors = cloneable.getProfessors();
            this._modules = cloneable.getModules();
            this._groups = cloneable.getGroups();
            this._timeslots = cloneable.getTimeslots();
        } else {
            this._rooms = new Map();
            this._professors = new Map();
            this._modules = new Map();
            this._groups = new Map();
            this._timeslots = new Map();
        }
    }

    getGroups() {
        return this._groups;
    }

    getTimeslots() {
        return this._timeslots;
    }

    getModules() {
        return this._modules;
    }

    getProfessors() {
        return this._professors;
    }

    addRoom(roomId, roomNumber, capacity) {
        this._rooms.set(
            roomId,
            new Room(roomId, roomNumber, capacity));
    }

    addProfessor(professorId, professorName) {
        this._professors.set(
            professorId,
            new Professor(professorId, professorName));
    }

    addModule(moduleId, moduleCode, someModule, professorIds) {
        this._modules.set(
            moduleId,
            new Module(moduleId, moduleCode, someModule, professorIds));
    }

    addGroup(groupId, groupSize, moduleIds) {
        this._groups.set(
            groupId,
            new Group(groupId, groupSize, moduleIds));
        this._numClasses = 0;
    }

    addTimeslot(timeslotId, timeslot) {
        this._timeslots.set(
            timeslotId,
            new Timeslot(timeslotId, timeslot));
    }

    createClasses(individual) {
        const classes = [];
        const chromosome = individual.getChromosome();
        let chromosomePos = 0;
        let classIndex = 0;

        for (const group of this.getGroupsAsArray()) {
            const moduleIds = group.getModuleIds();

            for (const moduleId of moduleIds) {
                classes[classIndex] = new Class(
                    classIndex,
                    group.getGroupId(),
                    moduleId);

                classes[classIndex].addTimeslot(chromosome[chromosomePos]);
                chromosomePos++;

                classes[classIndex].setRoomId(chromosome[chromosomePos]);
                chromosomePos++;

                classes[classIndex].addProfessor(chromosome[chromosomePos]);
                chromosomePos++;

                classIndex++;
            }
        }

        this._classes = classes;
    }

    getRoomById(roomId) {
        return this._rooms.get(roomId);
    }

    getRooms() {
        return this._rooms;
    }

    getRandomRoom() {
        const roomsArray = Array.from(this._rooms.values());
        return roomsArray[
            Math.floor(Math.random() * roomsArray.length)];
    }

    getProfessorById(professorId) {
        return this._professors.get(professorId);
    }

    getModuleById(moduleId) {
        return this._modules.get(moduleId);
    }

    getGroupModulesById(groupId) {
        return this._groups.get(groupId).getModules();
    }

    getGroupById(groupId) {
        return this._groups.get(groupId);
    }

    getGroupsAsArray() {
        return Array.from(this._groups.values());
    }

    getTimeslotById(timeslotId) {
        return this._timeslots.get(timeslotId);
    }

    getRandomTimeslot() {
        const timeslotArray = Array.from(this._timeslots.values());
        return timeslotArray[
            Math.floor(Math.random() * timeslotArray.length)];
    }

    getClasses() {
        return this._classes;
    }

    getNumClasses() {
        if (this._numClasses > 0) {
            return this._numClasses;
        }

        let numClasses = 0;
        const groups = Array.from(this._groups.values());
        for (const group of groups) {
            numClasses += group.getModuleIds().length;
        }
        this._numClasses = numClasses;

        return this._numClasses;
    }

    calcClashes() {
        let clashes = 0;

        for (const classA of this._classes) {
            const roomCapacity =
                this.getRoomById(classA.getRoomId()).getRoomCapacity();
            const groupSize =
                this.getGroupById(classA.getGroupId()).getGroupSize();

            if (roomCapacity < groupSize) {
                clashes++;
            }

            for (const classB of this._classes) {
                if (classA.getRoomId() === classB.getRoomId() &&
                    classA.getTimeslotId() === classB.getTimeslotId() &&
                    classA.getClassId() !== classB.getClassId()) {
                    clashes++;
                    break;
                }
            }

            for (const classB of this._classes) {
                if (classA.getProfessorId() === classB.getProfessorId() &&
                    classA.getTimeslotId() === classB.getTimeslotId() &&
                    classA.getClassId() !== classB.getClassId()) {
                    clashes++;
                    break;
                }
            }
        }

        return clashes;
    }
}

module.exports = Timetable;