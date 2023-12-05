import { readFileSync } from 'node:fs';

/**
 * https://adventofcode.com/2023/day/2
 */

/**
 * @param {string[]} lines
 */
function part1(lines, red = 12, green = 13, blue = 14) {
    let sum = 0;
    for (let [index, line] of lines.entries()) {
        let maxes = processLine(line);
        if (maxes.red > red) continue;
        if (maxes.green > green) continue;
        if (maxes.blue > blue) continue;
        sum += index+1;
    }
    return sum;
}

/**
 * Given a line, which represents a game, returns the minimum
 * number of cubes needed for a game
 * 
 * @param {string} line 
 * 
 * @return {{
 *   green?: number,
 *   red?: number,
 *   blue?: number
 * }}
 */
function processLine(line) {
    let maxes = {};
    let [,parts] = line.split(":")
    let grabs = parts.split(";")
    /**
     * @type {{
     *  red?: number,
     *  green?: number,
     *  blue?: number
     * }[]}
     */
    let piecesSummary = grabs.map(grab => {
        let pieces = grab.split(",");
        let map = {};
        pieces.forEach(piece => {
            piece = piece.trim();
            let [number, color] = piece.split(" ");
            map[color] = Number(number);
        })
        return map;
    })
    piecesSummary.forEach(pieces => {
        for (let key in pieces) {
            if (!(key in maxes)) {
                maxes[key] = pieces[key]
            } else {
                maxes[key] = Math.max(pieces[key], maxes[key]);
            }
        }
    })
    return maxes;
}

/**
 *  in each game you played, what is the fewest number of cubes of each color 
 * that could have been in the bag to make the game possible?
 * 
 * The power of a set of cubes is equal to the 
 * numbers of red, green, and blue cubes multiplied 
 * together.
 * 
 * For each game, find the minimum set of cubes 
 * that must have been present. 
 * 
 * What is the sum of the power of these sets?
 * 
 * @param {string[]} lines 
 * 
 * @return {number} The sum of powers for each game
 */
function part2(lines) {
    return lines.map(processLine).reduce((acc, game) => {
        acc+= (game.red || 0) * (game.blue || 0) * (game.green || 0)
        return acc;
    }, 0)
}

let testF = readFileSync("./test-input");
let testLines = testF.toString().split("\n");

let f = readFileSync("./input");
let lines = f.toString().split("\n");

console.log(part1(testLines));
console.log(part2(testLines));
console.log(part1(lines));
console.log(part2(lines));