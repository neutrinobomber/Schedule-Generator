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
            otherSchedule = arguments[0];
            setupOnly = arguments[1];

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
            this.classes = [];
        }
    }

    makeCopy(setupOnly) {
        return new Schedule(this, setupOnly);
    }

    makeNewFromPrototype() {
        let size = this.slots.length;
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

        let it1 = this.classes[Symbol.iterator]();
        let it2 = parent2.classes[Symbol.iterator]()
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

    }
}