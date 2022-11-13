/* npm install knowcss */

const knowedcss = require('knowcss');
const { hexColors } = require('knowcss/src/knowcss-colors');
const { shortHand } = require('knowcss/src/knowcss-shorthand');
const ret = knowedcss.compile('<div know="font-size-16px bold full center border-1px/solid/red color-blue">Hello, world!</div>', { shortHand, hexColors });
console.log('css == ' + ret[1]);
console.log('html == ' + ret[0]);