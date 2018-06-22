var _ = 'https://chainz.cryptoid.info/ltc/'
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