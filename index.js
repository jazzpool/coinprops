var DEFAULT_PRECISION = 8;

var coins = {
    SXC: {
        name: 'sexcoin',
        algorithm: 'scrypt',
        multiplier: Math.pow(2, 16),
        link: {
            tx: 'https://prohashing.com/explorer/Sexcoin/{hash}',
            hash: 'https://prohashing.com/explorer/Sexcoin/{hash}',
        },
    },
    DOGE: {
        name: 'dogecoin',
        algorithm: 'scrypt',
        multiplier: Math.pow(2, 16),
        link: {
            tx: 'https://dogechain.info/tx/{hash}',
            hash: 'https://dogechain.info/block/{hash}',
        },
    },
    BTC: {
        name: 'bitcoin',
        algorithm: 'sha256',
        multiplier: 1,
        link: {
            tx: 'https://blockchain.info/block/{hash}',
            hash: 'https://blockchain.info/tx/{hash}',
        },
    },
    DASH: {
        name: 'dash',
        algorithm: 'x11',
        multiplier: 1,
        link: {
            tx: 'https://chainz.cryptoid.info/dash/tx.dws?{hash}.htm',
            hash: 'https://chainz.cryptoid.info/dash/block.dws?{hash}.htm',
        },
    },
    DRK: {
        name: 'dash',
        algorithm: 'x11',
        multiplier: 1,
        link: {
            tx: 'https://chainz.cryptoid.info/dash/tx.dws?{hash}.htm',
            hash: 'https://chainz.cryptoid.info/dash/block.dws?{hash}.htm',
        },
    },
    LTC: {
        name: 'litecoin',
        algorithm: 'scrypt',
        multiplier: Math.pow(2, 16),
        link: {
            tx: 'https://chainz.cryptoid.info/ltc/tx.dws?{hash}.htm',
            hash: 'https://chainz.cryptoid.info/ltc/block.dws?{hash}.htm',
        },
    },
    B2X: {
        name: 'bitcoin2x',
        algorithm: 'x11',
        multiplier: 1,
        link: {
            tx: 'https://explorer.b2x-segwit.io/tx/{hash}',
            hash: 'https://explorer.b2x-segwit.io/block/{hash}',
        }
    },
};

const algos = {
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


var coinprops = {
    getMultiplier: function (key) {
        if (algos[key]) {
            return algos[key].multiplier;
        }

        if (coins[key]) {
            return coins[key].multiplier;
        }

        for (var code in coins) {
            if (coins[code].name === key) {
                return coins[code].multiplier
            }
        }

        throw new Error('Cant find multiplier: ' + key);
    },
    getName: function (code) {
        return coins[code].name
    },
    getCode: function (name) {
        for (var code in coins) {
            if (coins[code].name === name) {
                return code
            }
        }

        throw new Error('Cant find code by name: ' + name);
    },
    getPrecision: function (key) {
        var coin = coins[key] || coinprops.coins[coinprops.getCode(key)]
        return coin.precision || DEFAULT_PRECISION;
    },
    precise: function (key, value) {
        var precision = coinprops.getPrecision(key);
        return Number(value.toFixed(precision))
    },
    getLink: function (key) {
        var coin = coins[key] || coinprops.coins[coinprops.getCode(key)]
        return coin.link
    },
    algos: algos,
    coins: coins,
    getMapByNames: function (coins) {
        return coins.reduce(function (acc, coinName) {
            acc[coinName] = coinprops.getCode(coinName);
            return acc;
        }, {});
    },
    getMapByCodes: function (coins) {
        return coins.reduce(function (acc, coinCode) {
            acc[coinCode] = coinprops.getName(coinCode);
            return acc;
        }, {});
    },
};

module.exports = coinprops;
