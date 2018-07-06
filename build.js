#!/usr/bin/env node

const fs = require('fs');
const {resolve} = require('path') ;
const UglifyJS = require("uglify-js");

const file = build('entrypoint.js', 'src');
const result = UglifyJS.minify(file);

if (result.error) {
    throw result.error;
}

function build(file, context) {
    const rx = /\/\/\s*include\(['"](.+)['"]\)/g
    return fs.readFileSync(resolve(__dirname, context, file), 'utf-8').replace(rx, (_, filename) => {
        return build(filename, context);
    });
}

fs.writeFileSync('./dist/index.js', file);
fs.writeFileSync('./dist/index.min.js', result.code);
