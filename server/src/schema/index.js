const { author } = require('./author');
const { reply } = require('./reply');
const { topic } = require('./topic');
const { book } = require('./book');
const { message } = require('./message');

const { query } = require('./query');
const { mutation } = require('./mutation');
const { schemaDef } = require('./schemaDef');

exports.typeDefs = [schemaDef, book, message, author, reply, topic, query, mutation];
