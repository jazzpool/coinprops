(function (root, init) {
    if (root.module && root.module.exports) {
        init(module.exports);
    }

    if (root.window) {
        init(window);
    }
})(this, function (root) {
    root.coinprops = {};

    var DEFAULT_PRECISION = 8;
var DEFAULT_CONFIRMATIONS = 6;

var coins = {}

var  _ = 'https://blockchain.info/';
coins.BTC = {
    title: 'Bitcoin',
    name: 'bitcoin',
    algorithm: 'sha256',
    multiplier: 1,
    link: {
        tx: _ + 'block/{hash}',
        hash: _ + '/tx/{hash}',
        address: _ + '/address/{hash}',
    },
};
var _ = 'https://prohashing.com/explorer/Sexcoin/{hash}';
coins.SXC = {
    name: 'sexcoin',
    algorithm: 'scrypt',
    multiplier: Math.pow(2, 16),
    title: 'Sexcoin',
    link: {tx: _, hash: _, address: _},
};
var _ = 'https://dogechain.info/';
coins.DOGE = {
    name: 'dogecoin',
    algorithm: 'scrypt',
    multiplier: Math.pow(2, 16),
    title: 'Dogecoin',
    link: {
        tx: _ + 'tx/{hash}',
        hash: _ + 'block/{hash}',
        address: _ + 'address/{hash}',
    },
};


coins.TLT = {
    name: 'talantcoin',
    algorithm: 'sha256',
    title: 'Talant Coin',
    multiplier: 1,
    link: {},
};

_ = 'https://blockchair.com/search?q={hash}'
coins.BCH = {
    name: 'bitcoincash',
    algorithm: 'sha256',
    title: 'Bitcoin Cash',
    multiplier: 1,
    link: {
        tx: _,
        hash: _,
        address: _,
    },
};

_ = 'https://chainz.cryptoid.info/dash/'
coins.DASH = {
    name: 'dash',
    algorithm: 'x11',
    title: 'Dash',
    multiplier: 1,
    link: {
        tx: _ + 'tx.dws?{hash}.htm',
        hash: _ + 'block.dws?{hash}.htm',
    },
};

_ = 'https://chainz.cryptoid.info/ltc/'
coins.LTC = {
    name: 'litecoin',
    algorithm: 'scrypt',
    title: 'Litecoin',
    multiplier: Math.pow(2, 16),
    link: {
        tx: _ + 'tx.dws?{hash}.htm',
        hash: _ + 'block.dws?{hash}.htm',
    },
};

_ = 'https://explorer.b2x-segwit.io/';
coins.B2X = {
    name: 'bitcoin2x',
    title: 'Segwit 2X',
    algorithm: 'x11',
    multiplier: 1,
    link: {
        tx: _ + 'tx/{hash}',
        hash: _ +'block/{hash}',
    }
};

var algos = {
    'sha256': {},
    'sha256d': {},
    'sha1': {},
    'x11': {},
    'x13': {},
    'x15': {},
    'nist5': {},
    'quark': {},
    'skein': {},
    'shavite3': {},
    'hefty1': {},
    'qubit': {},
    'scrypt': {
        multiplier: Math.pow(2, 16),
    },
    'scrypt-og': {
        multiplier: Math.pow(2, 16),
    },
    'scrypt-jane': {
        multiplier: Math.pow(2, 16),
    },
    'scrypt-n': {
        multiplier: Math.pow(2, 16),
    },
    'keccak': {
        multiplier: Math.pow(2, 8),
    },
    'blake': {
        multiplier: Math.pow(2, 8),
    },
    'groestl': {
        multiplier: Math.pow(2, 8),
    },
    'fugue': {
        multiplier: Math.pow(2, 8),
    },
};


for (var algo in algos){
    if (!algos[algo].multiplier) {
        algos[algo].multiplier = 1;
    }
}

coinprops.algos = algos;
coinprops.coins = coins;

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

});