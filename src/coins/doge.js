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
