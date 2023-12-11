import { waysToWin } from "./helpers.js"
import { readFileSync } from "node:fs"
const f = readFileSync("./input");

let lines = f.toString().split("\n");
let [, times] = lines[0].split(":")
times = times.split(" ").filter(e => e).map(e => +e);
let [, distances] = lines[1].split(":");
distances = distances.split(" ").filter(e => e).map(e => +e);
let acc = 1n;
for (let [index, time] of times.entries()) {
    acc *= waysToWin(BigInt(time), BigInt(distances[index]))
}
console.log(acc);
// part2
// console.log(times.join(''), distances.join(''))
console.log(waysToWin(BigInt(times.join('')), BigInt(distances.join(''))))