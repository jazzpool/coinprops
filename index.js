var DEFAULT_PRECISION = 8;
var DEFAULT_CONFIRMATIONS = 6;
var DEFAULT_HASHRATE_TYPE = 'hash';

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
            tx: 'https://chainz.cryptoid.info/btc/tx.dws?{hash}.htm',
            hash: 'https://chainz.cryptoid.info/btc/block.dws?{hash}.htm',
            address: 'https://chainz.cryptoid.info/btc/address.dws?{hash}.htm',
        },
    },
    BCH: {
        name: 'bitcoincash',
        algorithm: 'sha256',
        multiplier: 1,
        link: {
            tx: 'https://blockchair.com/search?q={hash}',
            hash: 'https://blockchair.com/search?q={hash}',
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
    ZEC: {
        name: 'zcash',
        algorithm: 'equihash',
        hashrateType: 'sol',
        link: {
            tx: 'https://explorer.zcha.in/transactions/{hash}',
            hash: 'https://explorer.zcha.in/blocks/{hash}',
        },
        multiplier: 1,
    },
};

var baseDiff = 0x00000000ffff0000000000000000000000000000000000000000000000000000;
var equihashDiff = 0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

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
    'equihash': {
        hashrateType: 'sol',
        multiplier: 1,
        diff: equihashDiff,
        diffModifier: equihashDiff/baseDiff,
    },
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
        var coin = coins[key] || coinprops.coins[coinprops.getCode(key)];
        return coin.precision || DEFAULT_PRECISION;
    },
    getAlgorithm: function (key) {
        var coin = coins[key] || coinprops.coins[coinprops.getCode(key)];
        return coin.algorithm;
    },
    getConfirmations: function (key) {
        var coin = coins[key] || coinprops.coins[coinprops.getCode(key)];
        return coin.confirmations || DEFAULT_CONFIRMATIONS;
    },
    precise: function (key, value) {
        var precision = coinprops.getPrecision(key);
        return Number(value.toFixed(precision))
    },
    toDecimal: function (number) {
        var data = String(number).split(/[eE]/);

        if (data.length === 1) return data[0];
    
        var z = '';
    
        var sign = number < 0 ? '-' : '';
        var str = data[0].replace('.', '');
        var mag = Number(data[1]) + 1;
    
        if (mag < 0) {
            z = sign + '0.';
            while (mag++) {
                z += '0';
            }
            return z + str.replace(/^-/, '');
        }
    
        mag -= str.length;
        while (mag--) {
            z += '0';
        }
        return str + z;
    },
    getLink: function (key) {
        var coin = coins[key] || coinprops.coins[coinprops.getCode(key)];
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
    getHashrateType: function (coin) {
        var coin = coins[coin] || coinprops.coins[coinprops.getCode(coin)];
        return coin.hashrateType || DEFAULT_HASHRATE_TYPE;
    },
    getHashrateTypeByAlgorithm: function (algo) {
        return algos[algo] && algos[algo].hashrateType || 'hash';
    },
    targetToDiff: function(diff, target) {
        var zeroPad = 0;

        for(var i of target) {
            if (i === '0') {
                zeroPad++;
            } else {
                break;
            }
        }

        var adj = target.slice(zeroPad, 64);
        return diff / parseInt('0x' + adj);
    },
    getDiffModifier: function(coin) {
        var algo = this.getAlgorithm(coin);
        return this.algos[algo] && this.algos[algo].diffModifier;
    },
    init: function () {
        global.Number.prototype.precise = global.Number.prototype.precise || function (coin) {
            return coinprops.precise(coin, this);
        };

        global.Number.prototype.toDecimal = global.Number.prototype.toDecimal || function () {
            return coinprops.toDecimal(this);
        };
    },
};

module.exports = coinprops;
