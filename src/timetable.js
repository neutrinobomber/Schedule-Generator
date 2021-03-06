/* eslint no-console: 0 */

const Room = require('./room');
const Teacher = require('./teacher');
const Subject = require('./subject');
const Group = require('./group');
const Timeslot = require('./timeslot');
const Lesson = require('./lesson');

class Timetable {
  constructor(cloneable) {
    this._lessons = [];
    this._numLessons = 0;

    if (cloneable) {
      this._rooms = cloneable.getRooms();
      this._teachers = cloneable.getTeachers();
      this._subjects = cloneable.getSubjects();
      this._groups = cloneable.getGroups();
      this._timeslots = cloneable.getTimeslots();
    } else {
      this._rooms = new Map();
      this._teachers = new Map();
      this._subjects = new Map();
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

  getSubjects() {
    return this._subjects;
  }

  getTeachers() {
    return this._teachers;
  }

  addRoom(roomId, roomNumber, capacity) {
    this._rooms.set(roomId, new Room(roomId, roomNumber, capacity));
  }

  addTeacher(teacherId, teacherName) {
    this._teachers.set(teacherId, new Teacher(teacherId, teacherName));
  }

  addSubject(subjectId, subjectCode, someSubject, teacherIds) {
    this._subjects.set(subjectId, new Subject(subjectId, subjectCode, someSubject, teacherIds));
  }

  addGroup(groupId, groupSize, subjectIds) {
    this._groups.set(groupId, new Group(groupId, groupSize, subjectIds));
    this._numLessons = 0;
  }

  addTimeslot(timeslotId, timeslot) {
    this._timeslots.set(timeslotId, new Timeslot(timeslotId, timeslot));
  }

  createLessons(individual) {
    const lessons = [];
    const chromosome = individual.getChromosome();
    let chromosomePos = 0;
    let lessonIndex = 0;

    for (const group of this.getGroupsAsArray()) {
      const subjectIds = group.getSubjectIds();

      for (const subjectId of subjectIds) {
        lessons[lessonIndex] = new Lesson(lessonIndex, group.getGroupId(), subjectId);

        lessons[lessonIndex].addTimeslot(chromosome[chromosomePos]);
        chromosomePos += 1;

        lessons[lessonIndex].setRoomId(chromosome[chromosomePos]);
        chromosomePos += 1;

        lessons[lessonIndex].addTeacher(chromosome[chromosomePos]);
        chromosomePos += 1;

        lessonIndex += 1;
      }
    }

    this._lessons = lessons;
  }

  getRoomById(roomId) {
    return this._rooms.get(roomId);
  }

  getRooms() {
    return this._rooms;
  }

  getRandomRoom() {
    const roomsArray = Array.from(this._rooms.values());
    return roomsArray[Math.floor(Math.random() * roomsArray.length)];
  }

  getTeacherById(teacherId) {
    return this._teachers.get(teacherId);
  }

  getSubjectById(subjectId) {
    return this._subjects.get(subjectId);
  }

  getGroupSubjectsById(groupId) {
    return this._groups.get(groupId).getSubjects();
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
    return timeslotArray[Math.floor(Math.random() * timeslotArray.length)];
  }

  getLessons() {
    return this._lessons;
  }

  getNumLessons() {
    if (this._numLessons > 0) {
      return this._numLessons;
    }

    let numLessons = 0;
    const groups = Array.from(this._groups.values());
    for (const group of groups) {
      numLessons += group.getSubjectIds().length;
    }
    this._numLessons = numLessons;

    return this._numLessons;
  }

  calcClashes() {
    let clashes = 0;

    for (const lessonA of this._lessons) {
      const roomCapacity = this.getRoomById(lessonA.getRoomId()).getRoomCapacity();
      const groupSize = this.getGroupById(lessonA.getGroupId()).getGroupSize();

      if (roomCapacity < groupSize) {
        clashes += 1;
      }

      for (const lessonB of this._lessons) {
        if (
          lessonA.getRoomId() === lessonB.getRoomId() &&
          lessonA.getTimeslotId() === lessonB.getTimeslotId() &&
          lessonA.getLessonId() !== lessonB.getLessonId()
        ) {
          clashes += 1;
          break;
        }
      }

      for (const lessonB of this._lessons) {
        if (
          lessonA.getTeacherId() === lessonB.getTeacherId() &&
          lessonA.getTimeslotId() === lessonB.getTimeslotId() &&
          lessonA.getLessonId() !== lessonB.getLessonId()
        ) {
          clashes += 1;
          break;
        }
      }
    }

    return clashes;
  }
}

module.exports = Timetable;
