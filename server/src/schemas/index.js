const { author } = require('./author');
const { reply } = require('./reply');
const { topic } = require('./topic');
const { book } = require('./book');
const { message } = require('./message');
const { file } = require('./file');

const { query } = require('./query');
const { mutation } = require('./mutation');
const { subscription } = require('./subscription');
const { schemaDef } = require('./schemaDef');

exports.typeDefs = [schemaDef, book, message, author, reply, topic, file, query, mutation, subscription];
