var _ = 'https://explorer.b2x-segwit.io/';
coins.B2X = {
    name: 'bitcoin2x',
    title: 'Segwit 2X',
    algorithm: 'x11',
    multiplier: 1,
    link: {
        hash: _ +'block/{hash}',
        tx: _ + 'tx/{hash}',
    }
};
