var DEFAULT_PRECISION = 8;
var DEFAULT_CONFIRMATIONS = 6;

var coins = {}

// include('./coins/btc.js')
// include('./coins/sxc.js')
// include('./coins/doge.js')
// include('./coins/tlt.js')
// include('./coins/bch.js')
// include('./coins/dash.js')
// include('./coins/b2x.js')

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
