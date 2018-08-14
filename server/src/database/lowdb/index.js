const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.resolve(__dirname, './lowdb.json'));
const lowdb = low(adapter);

const collections = {
  uploads: {
    name: 'uploads',
    default: []
  },
  books: {
    name: 'books',
    default: []
  },
  users: {
    name: 'users',
    default: []
  },
  comments: {
    name: 'comments',
    default: []
  }
};

const source = Object.keys(collections).reduce((pre, cur) => {
  pre[cur] = collections[cur].default;
  return pre;
}, {});

lowdb.defaults(source).write();

exports.lowdb = lowdb;
exports.collections = collections;
