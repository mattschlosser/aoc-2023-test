import { readFileSync } from 'node:fs';


let testF = readFileSync("./test-input");
let testLines = testF.toString().split("\n");

let f = readFileSync("./input");
let lines = f.toString().split("\n");

let map = {};

function generateMap(lines) {
    let map = {};
    let pieces = lines.slice(3);
    let current = 0;
    let options = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity']
    for (let line of pieces) {
        if (line.match(/^\d/)) {
            map[options[current]] ??= [];
            let [to, from, range] = line.split(' ').map(e => +e);
            map[options[current]].push({from, to, range})
        } else if (line !== '') {
            current += 1;
        }
    }
    return map;
}

function *whatever() {
    let i = 0;
    while (i < 100_000) {
        yield i;
        i++;
    }
}

/**
 * 
 * @param {string[]} lines 
 */
function part1(lines) {
    // generate a map of each seed -> fert -> etc
    let map = generateMap(lines);
    let [,seeds] = lines[0].split(':')
    seeds = seeds.split(' ').filter(e => e).map(e => +e);
    let min = null;
    // for each seed
    for (let seed of seeds) {
        // get its location
        let location = mapSeedToLocation(map, seed);
        if (min === null) {
            min = location;
        } else {
            // update minimum
            min = Math.min(min, location);
        }
    }
    return min;

}

function part2(lines) {
    
    let map = generateMap(lines);
    let [,seeds] = lines[0].split(':')
    seeds = seeds.split(' ').filter(e => e).map(e => +e);
    for (let i = 0; i < seeds.length; i += 2) {
        console.log(seeds[i], seeds[i+1]);
    }
    return Number.NaN;
}

/** @typedef {{from: number, to: number, range: number}} RangeMap */

/**
 * 
 * @param {{seed: RangeMap[], soil: RangeMap[], fertilizer: RangeMap[], water: RangeMap[], light: RangeMap[], temperature: RangeMap[], humidity: RangeMap[]}} map 
 * @param {number} seed 
 */
function mapSeedToLocation(map, seed) {
    let options = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity']
    for (let option of options) {
        for (let range of map[option]) {
            let offset = seed - range.from;
            if (offset >= 0 && offset < range.range) {
                seed = range.to + offset;
                // console.log(`seed ${seed} is between ${range.from} and ${range.from + range.range -1}`)
                break;
            }
        }
    }
    return seed;
}

function findMinSeedRangeLocation(map, seed, range) {
    let options = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity']
    for (let option of options) {
        for (let range of map[option]) {
            let offset = seed - range.from;
            if (offset >= 0 && offset < range.range) {
                seed = range.to + offset;
                // console.log(`seed ${seed} is between ${range.from} and ${range.from + range.range -1}`)
                break;
            }
        }
    }
    return seed;
}

// part1(testLines);
console.log(part1(lines));
console.log(part2(testLines));