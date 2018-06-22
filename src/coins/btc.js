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