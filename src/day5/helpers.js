

/** @typedef {{from: number, to: number, range: number}} RangeMap */


/** @typedef {{seed: RangeMap[], soil: RangeMap[], fertilizer: RangeMap[], water: RangeMap[], light: RangeMap[], temperature: RangeMap[], humidity: RangeMap[]}} Almanac  */

/**
 * 
 * @param {Almanac} map 
 * @param {keyof Almanac} option 
 * @param {number} seed 
 * @param {number} range 
 */
export function findMinLocation(map, option, seed, range) {
    /** @type {(keyof Almanac)[]} */
    let options = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity']
    let minSeed = seed;
    let minOffset = 0;
    let start = seed;
    let lowestValueNotSeen = 1;
    let maxOffset = 1;

    while (seed < start + range) {
        console.log(seed);
        seed ++;
        
        if (option == 'humidity') {
            let min = 239429348239489;
            for (let locationRange of map[option]) {
                // [1, 2, 3] => [8, 9, 10]
                // given range 1 ---- 1_000
                // ew need to return 4, since 4 maps to 4
                let locationStart = locationRange.from
                let offset = seed - locationStart;
                // case 1, the current range 
                if (offset >= 0 && offset < locationRange.range) {
                    minSeed = seed;
                    minValue = locationRange
                }
                // else we need to check if
                if (offset < 0 && range - offset >= 0) {
    
                }
            }
        }
    }
}


/**
 * 
 * @param {Almanac} map 
 * @param {number} seed 
 */
export function mapSeedToLocation(map, seed) {
    /** @type {(keyof Almanac)[]} */
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

/**
 * 
 * @param {Almanac} map 
 * @param {number} seed 
 * @param {number} originalRange
 */
export function mapHumidityToLocationRange(map, seed, range) {
    console.log(`Checking min value for range of seeds ${seed} - ${seed + range - 1}`)
    let minValue = setInitalMinValue(map, seed, range, 'humidity');
    for (let humidityRange of map.humidity) {
        if (humidityRange.from + humidityRange.range >= seed && humidityRange.from <= seed + range - 1) {
            console.log(humidityRange, seed, "overlap");
            // in order to get the minimum value where they overlap
            let offset = humidityRange.to - humidityRange.from;
            let min = Math.max(seed, humidityRange.from);
            minValue = Math.min(min + offset, minValue);
        }
    }
    return minValue;
}

function getMinValue(rangeMap, seed, range, option) {
    if (option == 'humidity') {
        return offset;
    }
}

function setInitalMinValue(map, seed, range, option) {
    // do an inital check
    let minValue = seed;
    for (let optionRange of map[option]) {
        // if the intial min value is included in the range
        if (optionRange.from + optionRange.range >= minValue && optionRange.from <= minValue + range - 1) {
            // and the range increases in value
            let offset = optionRange.to - optionRange.from;
            if (offset > 0) {
                // set the min value to the value of the offset
                minValue += offset;
                break;
            }
        }
    }
    return minValue;
}

function getNextOption(option) {

}

/**
 * 
 * @param {Almanac} map 
 * @param {number} seed 
 * @param {number} range
 * @param {keyof Almanac} option
 */
function mapTemperatureToHumidity(map, seed, range, option) {
    if (option == 'humidity') {
        return mapHumidityToLocationRange(map, seed, range);
    }
    let minValue = seed;
    let isInitalValue = true;
    for (let temperatureRange of map[option]) {
        if (temperatureRange.from + temperatureRange.range >= seed && temperatureRange.from <= seed + range - 1) {
            // they overlap
            let offset = temperatureRange.to - temperatureRange.from;
            let min = Math.max(seed, temperatureRange.from);
            let max = Math.min(range, temperatureRange.range);
            let newPotenialMinValue = mapHumidityToLocationRange(map, min + offset, max);
            if (offset > 0 && isInitalValue == true) {
                minValue = newPotenialMinValue;
            } 
            if (minValue >= newPotenialMinValue) {
                isInitalValue = false;
            }
            minValue = Math.min(minValue, newPotenialMinValue)
        }
    }
    return minValue;
}

mapLightToTemperature(map, seed, range) {

}

console.log(mapHumidityToLocationRange({
    humidity: [{from: 4, to: 6, range: 2}, {from: 6, to: 9, range: 1}],
}, 5, 8))

console.log(mapTemperatureToHumidity({
    temperature: [{from: 4, to: 2, range: 2}],
    humidity: [{from: 2, to: 3, range: 1}, {from: 3, to: 1, range: 1}]
}, 4, 2))

/**
 * 
 * @param {Almanac} map 
 * @param {number} seed 
 * @param {number} originalRange
 */
export function mapSeedToLocationRanges(map, seed, originalRange) {

    let remainingRange;
    /** @type {(keyof Almanac)[]} */
    let options = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity']
    for (let option of options) {
        for (let range of map[option]) {
            let offset = seed - range.from;
            if (offset >= 0 && offset < range.range) {
                seed = range.to + offset;
                remainingRange = range.range - offset
                if (remainingRange >= 0) {
                    mapSeedToLocation(map, seed + remainingRange, originalRange - remainingRange + 1)
                }
                // console.log(`seed ${seed} is between ${range.from} and ${range.from + range.range -1}`)
                break;
            }
        }
    }
    return {
        seed,
        remainingRange
    }
}