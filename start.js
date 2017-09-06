class Test {
    constructor(otherThings) {
        this.things = otherThings;

        for (let element of this.things) {
            element.name = 'shit'
        }
    }
}

class TestOther {
    constructor(name) {
        this.name = name;
    }
}

const others = [
    new TestOther('other1'),
    new TestOther('other2')
]

// const test = new Test(others);
// console.log(others);

// const { Room } = require('./room');

// const testRoom1 = new Room('shit', false, 10);
// const testRoom2 = new Room('shit', false, 10);
// console.log(testRoom1);
// console.log(testRoom2);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log(getRandomInt(0, 15));