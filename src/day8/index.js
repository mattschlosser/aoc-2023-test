import { addToMap, getNextStep } from "./helpers.js"
import { readFileSync } from "node:fs"
import lcm from "compute-lcm";

const f = readFileSync("./input");
let lines = f.toString().split("\n");

function part1() {
    let map = {};
    for (let line of lines.slice(2)) {r
        addToMap(map, line);
    }
    
    let directions = lines[0].split('').map(e => e.toLowerCase());
    let steps = 0;
    let start = "AAA";
    while (true) {
        let direction = directions[steps % directions.length];
        start = getNextStep(map, start, direction);
        steps++;
        if (start === "ZZZ") break;
        if (steps > 30000) break;
    }
    return steps;
}

function part2() {

    let map = {};
    for (let line of lines.slice(2)) {
        addToMap(map, line);
    }
    
    let directions = lines[0].split('').map(e => e.toLowerCase());
    let steps = 0;
    let starts = Object.keys(map).filter(e => e.endsWith('A'));

    let ends = Array(starts.length).fill(0);
    while (true) {
        let direction = directions[steps % directions.length];
        starts = starts.map(start => getNextStep(map, start, direction));
        steps++;
        for (let [index, start] of starts.entries()) {
            if (start.endsWith('Z')) {
                ends[index] = steps;
            }
        }
        if (ends.every(end => end)) {
            break;
        }
    }
    return lcm(ends);
}

console.log(part1());
console.log(part2());