import { readFileSync } from 'node:fs';

/**
 * https://adventofcode.com/2023/day/3
 */

function part1(lines) {
    console.log(lines);
    for (let line of lines) {
        let numbers = line.split(/[^\d]/).filter(e => e)
        console.log(line, numbers);
    }
}


let testF = readFileSync("./test-input");
let testLines = testF.toString().split("\n");

let f = readFileSync("./input");
let lines = f.toString().split("\n");

console.log(part1(testLines));
// console.log(part2(testLines));
// console.log(part1(lines));
// console.log(part2(lines));