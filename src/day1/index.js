import { readFileSync } from 'node:fs';

/** @param {string[]} lines */
function part1(lines) {
    let numbers = [];
    for (let line of lines) {
        if (!line.length) continue;
        let callback = e => !Number.isNaN(Number(e));
        let array = line.split("");
        let left = array.find(callback);
       let right = array.findLast(callback);
       numbers.push(Number(left + right));
    }
    return numbers.reduce((a,e) => a+e, 0)
}

/** @param {string[]} lines */
function part2(lines) {

    let values = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    let processedLines = [];
    let map = {
        'one': 'o1e',
        'two': 't2o',
        'three': 't3ree',
        'four': 'f4ur',
        'five': 'f5ve', 
        'six': 's6x',
        'seven': 's7ven',
        'eight': 'e8ght',
        'nine': 'n9ne'
    }
    for (let line of lines) {
        let replaced = line;
        for (let [i, value] of values.entries()) {
            replaced = replaced.replaceAll(value, map[value]);
        }
        processedLines.push(replaced)
    }
    return part1(processedLines);
}

let f = readFileSync("./input");
let lines = f.toString().split("\n");

console.log(part1(lines));
console.log(part2(lines));
