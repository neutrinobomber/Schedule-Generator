/* eslint no-console: 0 */

const Timetable = require('./src/timetable');
const GeneticAlgorithm = require('./src/genetic.algorithm');

class TimetableGA {
  static init() {
    const timetable = TimetableGA.initializeTimetable();
    const ga = new GeneticAlgorithm(100, 0.01, 0.9, 2, 5);
    let population = ga.initPopulation(timetable);

    ga.evalPopulation(population, timetable);

    let generation = 1;

    while (
      ga.isTerminationConditionMet(generation, 1000) === false &&
      ga.isTerminationConditionMet(population) === false
    ) {
      console.log(`G${generation} Best fitness: ${population.getFittest(0).getFitness()}`);

      population = ga.crossoverPopulation(population);
      population = ga.mutatePopulation(population, timetable);
      ga.evalPopulation(population, timetable);
      generation += 1;
    }

    timetable.createLessons(population.getFittest(0));
    console.log();
    console.log(`Solution found in ${generation} generations`);
    console.log(`Final solution fitness: ${population.getFittest(0).getFitness()}`);
    console.log(`Clashes: ${timetable.calcClashes()}`);

    console.log();
    const lessons = timetable.getLessons();
    let lessonIndex = 1;
    for (const bestLesson of lessons) {
      console.log(`Lesson ${lessonIndex}:`);
      console.log(`Subject: ${timetable.getSubjectById(bestLesson.getSubjectId()).getSubjectName()}`);
      console.log(`Group: ${timetable.getGroupById(bestLesson.getGroupId()).getGroupId()}`);
      console.log(`Room: ${timetable.getRoomById(bestLesson.getRoomId()).getRoomNumber()}`);
      console.log(`Teacher: ${timetable.getTeacherById(bestLesson.getTeacherId()).getTeacherName()}`);
      console.log(`Time: ${timetable.getTimeslotById(bestLesson.getTimeslotId()).getTimeslot()}`);
      console.log('-----');
      lessonIndex += 1;
    }
  }

  static initializeTimetable() {
    const timetable = new Timetable();

    timetable.addRoom(1, 'A1', 15);
    timetable.addRoom(2, 'B1', 30);
    timetable.addRoom(4, 'D1', 20);
    timetable.addRoom(5, 'F1', 25);

    timetable.addTimeslot(1, 'Mon 9:00 - 11:00');
    timetable.addTimeslot(2, 'Mon 11:00 - 13:00');
    timetable.addTimeslot(3, 'Mon 13:00 - 15:00');
    timetable.addTimeslot(4, 'Tue 9:00 - 11:00');
    timetable.addTimeslot(5, 'Tue 11:00 - 13:00');
    timetable.addTimeslot(6, 'Tue 13:00 - 15:00');
    timetable.addTimeslot(7, 'Wed 9:00 - 11:00');
    timetable.addTimeslot(8, 'Wed 11:00 - 13:00');
    timetable.addTimeslot(9, 'Wed 13:00 - 15:00');
    timetable.addTimeslot(10, 'Thu 9:00 - 11:00');
    timetable.addTimeslot(11, 'Thu 11:00 - 13:00');
    timetable.addTimeslot(12, 'Thu 13:00 - 15:00');
    timetable.addTimeslot(13, 'Fri 9:00 - 11:00');
    timetable.addTimeslot(14, 'Fri 11:00 - 13:00');
    timetable.addTimeslot(15, 'Fri 13:00 - 15:00');

    timetable.addTeacher(1, 'Dr P Smith');
    timetable.addTeacher(2, 'Mrs E Mitchell');
    timetable.addTeacher(3, 'Dr R Williams');
    timetable.addTeacher(4, 'Mr A Thompson');

    timetable.addSubject(1, 'cs1', 'Computer Science', [1, 2]);
    timetable.addSubject(2, 'en1', 'English', [1, 3]);
    timetable.addSubject(3, 'ma1', 'Maths', [1, 2]);
    timetable.addSubject(4, 'ph1', 'Physics', [3, 4]);
    timetable.addSubject(5, 'hi1', 'History', [4]);
    timetable.addSubject(6, 'dr1', 'Drama', [1, 4]);

    timetable.addGroup(1, 10, [1, 3, 4]);
    timetable.addGroup(2, 30, [2, 3, 5, 6]);
    timetable.addGroup(3, 18, [3, 4, 5]);
    timetable.addGroup(4, 25, [1, 4]);
    timetable.addGroup(5, 20, [2, 3, 5]);
    timetable.addGroup(6, 22, [1, 4, 5]);
    timetable.addGroup(7, 16, [1, 3]);
    timetable.addGroup(8, 18, [2, 6]);
    timetable.addGroup(9, 24, [1, 6]);
    timetable.addGroup(10, 25, [3, 4]);

    return timetable;
  }
}

TimetableGA.init();
