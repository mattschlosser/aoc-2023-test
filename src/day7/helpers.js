export function sortRank(a, b) {
    return 
}

/**
 * @param {string&{length: 5}} hand
 */
export function isFiveOfAKind(hand) {
    return new Set(hand.split('')).size == 1
}


export function isFourOfAKind(hand) {

    let set = new Set(hand.split(''));
    let counts = hand.split('').reduce((acc, e) => {
        acc[e] ??= 0;
        acc[e]++;
        return acc;
    }, {})
    return set.size == 2 && Object.values(counts).includes(4);
    // return new Map(hand.split('')).size == 2 && 
}

export function isFullHouse(hand) {

    let set = new Set(hand.split(''));
    let counts = hand.split('').reduce((acc, e) => {
        acc[e] ??= 0;
        acc[e]++;
        return acc;
    }, {})
    return set.size == 2 && Object.values(counts).includes(3);
}

export function isThreeOfAKind(hand) {
    let set = new Set(hand.split(''));
    let counts = hand.split('').reduce((acc, e) => {
        acc[e] ??= 0;
        acc[e]++;
        return acc;
    }, {})
    return Object.values(counts).includes(3);

}



export function isTwoPair(hand) {
    let set = new Set(hand.split(''));
    let counts = hand.split('').reduce((acc, e) => {
        acc[e] ??= 0;
        acc[e]++;
        return acc;
    }, {})
    return set.size == 3 && Object.values(counts).includes(2);
}


export function isOnePair(hand) {
    let set = new Set(hand.split(''));
    let counts = hand.split('').reduce((acc, e) => {
        acc[e] ??= 0;
        acc[e]++;
        return acc;
    }, {})
    return set.size == 4 && Object.values(counts).includes(2);    
}

export function isHighCard() {
    return true;
}


export function getHandRank(hand) {
    if (isFiveOfAKind(hand)) return 6;
    if (isFourOfAKind(hand)) return 5;
    if (isFullHouse(hand)) return 4;
    if (isThreeOfAKind(hand)) return 3;
    if (isTwoPair(hand)) return 2;
    if (isOnePair(hand)) return 1;
    if (isHighCard(hand)) return 0;
}

/**
 * 
 * @param {"A"|"K"|"Q"|"J"|"T"|"9"|"8"|"7"|"6"|"5"|"4"|"3"|"2"} a 
 */
function getCardRank(a) {
    switch (a) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        case "T":
            return 10;
        case "9":
            return 9;
        case "8":
            return 8;
        case "7":
            return 7;
        case "6":
            return 6;
        case "5":
            return 5;
        case "4":
            return 4;
        case "3":
            return 3;
        case "2":
            return 2;

        }
}

/**
 *  
 * @param {string} a 
 * @param {string} b 
 */
function getHandOrderRank(a, b)
{
    for (let i = 0; i < a.length; i++) {
        let aCardRank = getCardRank(a[i]);
        let bCardRank = getCardRank(b[i]);
        if (aCardRank != bCardRank) {
            return aCardRank < bCardRank ? 1 : -1;
        }
    }
    return 0;
}


/**
 * 
 * @param {{hand: string, bid: number}[]} hands 
 * @return {{hand: string, bid: number}[]}
 */
export function sortCards(hands) {
    return hands.toSorted((a, b) => {
        let aRank = getHandRank(a.hand);
        let bRank = getHandRank(b.hand);
        if (aRank != bRank) {
            return aRank < bRank ? 1 : -1;
        }
        return getHandOrderRank(a.hand, b.hand);
    })
}

/**
 * 
 * @param {{hand: string, bid: BigInt}[]} hands
 * @return {number} 
 */
export function getAnswer(hands) {
    let sortedHands = sortCards(hands);
    let sum = sortedHands.length;
    let a = 0n;
    for (let hand of sortedHands) {
        a += hand.bid * BigInt(sum);
        sum--
    }
    return a;
}