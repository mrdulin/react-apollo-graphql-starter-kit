const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
const typesMerged = mergeTypes(typesArray, { all: true });

module.exports = typesMerged;
