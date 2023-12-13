import { getAnswer } from "./helpers.js"
import { readFileSync } from "node:fs"
const f = readFileSync("./input");

let lines = f.toString().split("\n");
let processedLines = lines.map(line => {
    let [hand, bid] = line.split(' ');
    return { hand, bid: BigInt(bid) }
})

console.log(getAnswer(processedLines));