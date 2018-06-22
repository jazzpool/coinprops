coinprops.getMultiplier = function getMultiplier (key) {
    if (algos[key]) {
        return algos[key].multiplier;
    }

    if (coins[key]) {
        return coins[key].multiplier;
    }

    for (var code in coins) {
        if (coins[code].name === key) {
            return coins[code].multiplier;
        }
    }

    throw new Error('Cant find multiplier: ' + key);
};

coinprops.getName = function getName (code) {
    if (coins[code]) {
        return coins[code].name;
    }

    throw new Error('Cant find name by code: ' + code);
};

coinprops.getCode = function (name) {
    for (var code in coins) {
        if (coins[code].name === name) {
            return code
        }
    }

    throw new Error('Cant find code by name: ' + name);
};

coinprops.getPrecision = function getPrecision (key) {
    var coin = coins[key] || coinprops.coins[coinprops.getCode(key)]
    return coin.precision || DEFAULT_PRECISION;
};

coinprops.getConfirmations = function getConfirmations (key) {
    var coin = coins[key] || coinprops.coins[coinprops.getCode(key)]
    return coin.confirmations || DEFAULT_CONFIRMATIONS;
};

coinprops.precise = function precise (key, value) {
    var precision = coinprops.getPrecision(key);
    return Number(value.toFixed(precision))
};

coinprops.getLink = function getLink (key) {
    var coin = coins[key] || coinprops.coins[coinprops.getCode(key)]
    return coin.link
};

coinprops.getTxLink = function getTxLink (coin, hash) {
    return coinprops.getLink(coin).tx.replace('{hash}', hash);
};

coinprops.getBlockLink = function getLink (coin, hash) {
    return coinprops.getLink(coin).hash.replace('{hash}', hash);
};

coinprops.getAddressLink = function getLink (coin) {
    var links = coinprops.getLink(coin);
    return links.address && links.address.replace('{hash}', hash);
};

coinprops.getMapByNames = function getMapByNames (coins) {
    return coins.reduce(function (acc, coinName) {
        acc[coinName] = coinprops.getCode(coinName);
        return acc;
    }, {});
};

coinprops.getMapByCodes = function getMapByCodes (coins) {
    return coins.reduce(function (acc, coinCode) {
        acc[coinCode] = coinprops.getName(coinCode);
        return acc;
    }, {});
};

coinprops.init = function init () {
    global.Number.prototype.precise = global.Number.prototype.precise || function (coin) {
        return coinprops.precise(coin, this);
    };
};
