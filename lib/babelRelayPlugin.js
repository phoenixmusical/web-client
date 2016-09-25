/* eslint-disable no-var, func-names, prefer-arrow-callback, global-require */
const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, 'schema.json');

// Read the schema.json file only if it exists, this fixed
// the problem of using babelRelayPlugin, defined in .babelrc,
// and running npm run update when the file doesn't exist
fs.access(jsonFile, fs.F_OK, function (err) {
    if (!err) {
        module.exports = require('babel-relay-plugin')(require(jsonFile).data);
    }
});
