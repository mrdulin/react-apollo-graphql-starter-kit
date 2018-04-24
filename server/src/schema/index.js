const { author } = require('./author');
const { reply } = require('./reply');
const { topic } = require('./topic');
const { query } = require('./query');
const { schemaDef } = require('./schemaDef');

exports.typeDefs = [schemaDef, author, reply, topic, query];
