export function waysToWin(time, distanceRecord) {
    
    let optimumHoldingTime = time / 2n;
    let remainingTime = time - optimumHoldingTime;
    let speedAfterOptimumHoldingTime = optimumHoldingTime; 
    let addOne = time % 2n ? 0n : 1n;
    let maximumHoldingTime = optimumHoldingTime;
    let minimumHoldingTime = 0n;
    let minWinningAttempt = optimumHoldingTime;
    while (minimumHoldingTime <= maximumHoldingTime) {
        let attempt = minimumHoldingTime + ((maximumHoldingTime - minimumHoldingTime)/2n);
        let remainingTime = time - attempt;
        let speedAfterOptimumHoldingTime = attempt;
        let totalDistance = remainingTime * speedAfterOptimumHoldingTime;
        if (totalDistance > distanceRecord) {
            // you win, next attempt search should be below
            maximumHoldingTime = attempt - 1n;
            minWinningAttempt = attempt;
        } else {
            minimumHoldingTime = attempt + 1n;
        }
    }
    return (optimumHoldingTime - minWinningAttempt + 1n - addOne) * 2n + addOne;
}
