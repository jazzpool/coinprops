var levels = ['', 'KH', 'MH', 'GH', 'TH', 'PH'];

coinprops.getRateLevel = function getRateLevel(value) {
    var level = 0;
    
    while (value >= 1000 && level < levels.length) {
        value /= 1000;
        level++;
    }

    return level;
};

coinprops.hashrateToString = function hashrateToString(hashrate) {
    return hashrate.toFixed(2) + coinprops.getRateLevel(hashrate);
};

coinprops.getHashrateFromShares = function getHashrateFromShares(coin, shares, durationSecs) {
    var shareMultiplier = Math.pow(2, 32) / coinprops.getMultiplier(coin);
    var hashrate = shareMultiplier * shares / durationSecs;
    return hashrate;
};

coinprops.getEstimatedMinigTime = function getEstimatedMinigTime(difficulty, hashrate) {
    return difficulty * Math.pow(2, 32) / hashrate;
};
