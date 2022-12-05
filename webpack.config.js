/* npx webpack build --config ./webpack.config.js --stats verbose */

const path = require('path');
const fs = require('fs');
const MinifyPlugin = require("babel-minify-webpack-plugin");

var js = 'js';
var privateDir = path.resolve('./src/' + js);
var publicDir = path.resolve('./dist/' + js);

var walk = function (dir) {
    var ret = [];
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = dir + '/' + file;
        var stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) { ret = ret.concat(walk(filePath)); }
        else { ret.push([dir, file]); }
    });
    return ret;
}

function getFiles(dir, ext) {
    var ret = {};
    var files = walk(dir);
    if (files) {
        files.forEach(function (file) {
            var fileIndex = file[1].indexOf('.' + ext);
            if (fileIndex > -1) {
                var filePrefix = file[0].replace(dir, '').replace(/^\//, '');
                if (filePrefix.length > 0) { filePrefix += '/'; }
                var fileRoot = file[1].substr(0, fileIndex).replace('.' + ext);
                ret[filePrefix + fileRoot] = file[0] + '/' + file[1];
            }
        });
    }
    return ret;
}

module.exports = [
    {
        entry: getFiles(privateDir, js),
        mode: 'production',
        name: 'js',
        output: {
            filename: '[name].min.' + js,
            path: publicDir
        },
        plugins: [new MinifyPlugin({
            mangle: { topLevel: true }
        })]
    }
];