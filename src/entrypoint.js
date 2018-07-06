(function (root, init) {
    if (root.module && root.module.exports) {
        init(module.exports);
    }

    if (root.window) {
        init(window);
    }
})(this, function (root) {
    root.coinprops = {};

    // include('./descriptions.js')
    // include('./gets.js')
    // include('./hashrate.js')
});