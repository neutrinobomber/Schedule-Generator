// const items = [1, 2, 3];
// const item = items[Math.floor(Math.random() * items.length)];

// console.log(item);

// var myMap = new Map();
// myMap.set('0', 'foo');
// myMap.set(1, 'bar');
// myMap.set({}, 'baz');

// var vals = Array.from(myMap.values());

// console.log(vals[0]); // "foo"

// const testArr = [];
// testArr[0] = { 'deez': 'nutz' };
// console.log(testArr);

// let objs = [
//     { first_nom: 'Lazslo', last_nom: 'Jamf' },
//     { first_nom: 'Pig', last_nom: 'Bodine' },
//     { first_nom: 'Pirate', last_nom: 'Prentice' },
// ];

// objs.sort((a, b) => {
//     if (a.last_nom < b.last_nom) {
//         return -1;
//     }
//     if (a.last_nom > b.last_nom) {
//         return 1;
//     }
//     return 0;
// });

// console.log(objs);
class Test {
    constructor(...rest) {
        console.log(rest);
    }
}

const shit = new Test(1, 2, 3, 4)