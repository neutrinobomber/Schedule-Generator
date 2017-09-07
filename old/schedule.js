const { Configuration } = require('./configuration');

const DAY_HOURS = 12;
const DAYS_NUM = 5;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class Schedule {
    constructor(
        numberOfCrossoverPoints,
        mutationSize,
        crossoverProbability,
        mutationProbability) {
        if (arguments.length === 2) {
            let otherSchedule = arguments[0];
            let setupOnly = arguments[1];

            if (!setupOnly) {
                this.slots = otherSchedule.slots;
                this.classes = otherSchedule.classes;
                this.criteria = otherSchedule.criteria;
                this.fitness = otherSchedule.fitness;
            }

            this.numberOfCrossoverPoints = otherSchedule.numberOfCrossoverPoints;
            this.mutationSize = otherSchedule.mutationSize;
            this.crossoverProbability = otherSchedule.crossoverProbability;
            this.mutationProbability = otherSchedule.mutationProbability;
        } else {
            this.numberOfCrossoverPoints = numberOfCrossoverPoints;
            this.mutationSize = mutationSize;
            this.crossoverProbability = crossoverProbability;
            this.mutationProbability = mutationProbability;
            this.fitness = 0;
            this.criteria = [];
            this.slots = [[]];
            this.classes = new Map();
        }
    }

    makeCopy(setupOnly) {
        return new Schedule(this, setupOnly);
    }

    makeNewFromPrototype() {
        let newChromozome = new Schedule(this, true);
        let c = Configuration.getCourseClasses();

        for (let courseClass of c) {
            let nr = Configuration.getNumberOfRooms();
            let dur = courseClass.duration;
            let day = getRandomInt(0, DAYS_NUM);
            let room = getRandomInt(0, nr);
            let time = getRandomInt(0, DAY_HOURS + 1 - dur);
            let pos = day * nr * DAY_HOURS + room * DAY_HOURS + time;

            let i;
            for (i = dur - 1; i >= 0; i++) {
                newChromozome.slots[pos + i].push(courseClass);
            }

            newChromozome.classes.push(courseClass, pos);
        }

        newChromozome.calculateFitness();
        return newChromozome;
    }

    crossover(parent2) {
        if(getRandomInt(0, 100) > this.crossoverProbability) {
            return new Schedule(this, false);
        }

        let n = new Schedule(this, true);
        let size = this.classes.size;
        let cp = [];

        for(let i = this.numberOfCrossoverPoints; i > 0; i--) {
            while(1) {
                let p = getRandomInt(0, size);
                if(!cp[p]) {
                    cp[p] = true;
                    break;
                }
            }
        }

        let it1 = this.classes.entries();
        let it2 = parent2.classes.entries();
        let val1 = it1.next().value;
        let val2 = it2.next().value;

        let first = getRandomInt(0, 2) === 0;
        for(let i = 0; i < size; i++) {
            if (first) {
                n.classes.set(val1[0], val1[1]);

                for(let j = val1[0].duration - 1; j >= 0; j--) {
                    n.slots[val1[1] + j].push(val1[0]);
                }
            } else {
                n.classes.set(val2[0], val2[1]);

                for(let j = val2[0].duration - 1; j >= 0; j--) {
                    n.slots[val2[1] + j].push(val2[0]);
                }
            }

            if(cp[i]) {
                first = !first;
            }

            val1 = it1.next().value;
            val2 = it2.next().value;
        }

        n.calculateFitness();
        return n;
    }

    mutation() {
        if(getRandomInt(0, 100) > this.mutationProbability) {
            return;
        }

        let numberOfClasses = this.classes.length;

        for(let i = this.mutationSize; i > 0; i--) {
            let mpos = getRandomInt(0, numberOfClasses);
            let pos1 = 0;
            let it = this.classes.entries();
            let val = it.next().value;

            for(; mpos > 0; val = it.next().value, mpos--) { }

            pos1 = val[1];
            let cc1 = val[0];
            let nr = Configuration.getNumberOfRooms();
            let dur = cc1.duration;
            let day = getRandomInt(0, DAYS_NUM);
            let room = getRandomInt(0, nr);
            let time = getRandomInt(0, DAY_HOURS + 1 - dur);
            let pos2 = day * nr * DAY_HOURS + room * DAY_HOURS + time;

            for(let j = dur - 1; j >= 0; j--) {
                let cl = this.slots[pos1 + j];

                for(let courseClass of cl) {
                    if(courseClass === cc1) {
                        let index = cl.indexOf(courseClass);
                        if (index > -1) {
                            cl.splice(index, 1);
                        }
                        break;
                    }
                }

                this.slots[pos2 + i].push(cc1);
            }

            // needs checking
            this.classes[cc1] = pos2;
        }

        this.calculateFitness();
    }

    calculateFitness() {
        let score = 0;
        let numberOfRooms = Configuration.getNumberOfRooms();
        let daySize = DAY_HOURS * numberOfRooms;
        let ci = 0;

        for(let [key, value] of this.classes.entries()) {
            let p = value;
            let day = p / daySize;
            let time = p % daySize;
            let room = time / DAY_HOURS;
            time = time % DAY_HOURS;
            let dur = key.duration;

            let ro = false;
            for(let i = dur - 1; i >= 0; i--) {
                if(this.slots[p + 1].length > 1) {
                    ro = true;
                    break;
                }
            }

            if(!ro) {
                score = score + 1;
            }

            this.criteria[ci] = !ro;

            let cc = key;
            let r = Configuration.getRoomByID(room);

            this.criteria[ci + 1] = r.numberOfSeats >= cc.numberOfSeats;
            if(this.criteria[ci + 1]) {
                score = score + 1;
            }

            this.criteria[ci + 2] = !cc.requiresLab || (cc.requiresLab && r.isLab);
            if(this.criteria[ci + 2]) {
                score = score + 1
            }

            let po = false;
            let go = false;
            for(let i = numberOfRooms, t = day * daySize + time; i > 0; i--, t += DAY_HOURS) {
                for(let j = dur - 1; j >= 0; j--) {
                    let cl = this.slots[t + j];

                    for(let courseClass of cl) {
                        if(cc !== courseClass) {
                            if(!po && cc.professorOverlaps(courseClass)) {
                                po = true;
                            }

                            if(!go && cc.groupsOverlap(courseClass)) {
                                go = true;
                            }

                            if(po && go) {
                                if(!po) {
                                    score = score + 1;
                                }
                                this.criteria[ci + 3] = !po;

                                if(!go) {
                                    score = score + 1;
                                }
                                this.criteria[ci + 4] = !go;
                            }

                            this.fitness = score / (Configuration.getNumberOfCourseClasses() * DAYS_NUM);
                        }
                    }
                }
            }

            ci += 5;
        }

    }
}