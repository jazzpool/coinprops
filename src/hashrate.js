coinprops.hashrateToString = function hashrateToString(hashrate) {
    var i = -1;
    var byteUnits = ['KH', 'MH', 'GH', 'TH', 'PH'];

    do {
        hashrate = hashrate / 1000;
        i++;
    } while (hashrate > 1000);

    return hashrate.toFixed(2) + byteUnits[i];
};

coinprops.getHashrateFromShares = function getHashrateFromShares(coin, shares, durationSecs) {
    var shareMultiplier = Math.pow(2, 32) / coinprops.getMultiplier(coin);
    var hashrate = shareMultiplier * shares / durationSecs;
    return hashrate;
};

coinprops.getEstimatedMinigTime = function getEstimatedMinigTime(difficulty, hashrate) {
    return difficulty * Math.pow(2, 32) / hashrate;
};
