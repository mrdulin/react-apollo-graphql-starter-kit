const path = require('path');
const { mergeResolvers, fileLoader } = require('merge-graphql-schemas');

const resolverArray = fileLoader(path.resolve(__dirname, './**/*.resolvers.*'));
const resolversMerged = mergeResolvers(resolverArray);

module.exports = resolversMerged;
