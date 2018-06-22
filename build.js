#!/usr/bin/env node

const fs = require('fs');
const {resolve} = require('path') ;
const UglifyJS = require("uglify-js");

// const file = fs.readFileSync('./src/entrypoint.js', 'utf-8').replace(/\/\/include\((.+)\)/g, (_, filename) => {
//     return fs.readFileSync(resolve(__dirname, 'src', filename), 'utf-8');
// });

const file = build('entrypoint.js', 'src');

const result = UglifyJS.minify(file);

if (result.error) {
    throw result.error;
}

function build(file, context) {
    return fs.readFileSync(resolve(__dirname, context, file), 'utf-8').replace(/\/\/include\((.+)\)/g, (_, filename) => {
        return build(filename, context);
    });
}

console.log('file', file);

fs.writeFileSync('./dist/index.js', file);
fs.writeFileSync('./dist/index.min.js', result.code);
