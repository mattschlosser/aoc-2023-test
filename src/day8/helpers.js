


/** 
 * 
 * @param {Record<string,{l: keyof map, r: keyof map}>} map
 * @param {keyof map} node
 * @param {"l"|"r"} direction
 *  */
export function getNextStep(map, node, direction) {
    return map[node][direction];
}

/**
 * 
 * @param {Record<string,{l: keyof map, r: keyof map}>} map 
 * @param {`${string} = (${string}, ${string})`} line 
 */
export function addToMap(map, line) {
    let [node, others] = line.split(' = ');
    let [l, r] = others.split(', ').map(e => e.replaceAll('(', '').replaceAll(')', ''));
    map[node] = { l , r }
}
