const { fakeDB } = require('../db');
const { PubSub } = require('graphql-subscriptions');
const path = require('path');
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const mkdirp = require('mkdirp');
const fs = require('fs');

const adapter = new FileSync(path.resolve(__dirname, '../database/lowdb.json'));
const db = low(adapter);

db.defaults({ uploads: [] }).write();

const pubsub = new PubSub();
exports.pubsub = pubsub;

const uploadDir = path.resolve(__dirname, '../../uploads');
mkdirp(uploadDir);

function storeFS({ stream, filename }) {
  const id = shortid.generate();
  const filepath = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) => {
    stream.on('error', err => {
      if (stream.truncated) {
        // Delete the truncated file
        fs.unlinkSync(filepath);
      }
      reject(err);
    });

    stream
      .pipe(fs.createWriteStream(filepath))
      .on('error', err => reject(err))
      .on('finish', () => resolve({ id, filepath }));
  });
}

function storeDB(file) {
  return db
    .get('uploads')
    .push(file)
    .last()
    .write();
}

async function processUpload(upload) {
  try {
    const { stream, filename, mimetype, encoding } = await upload;
    const { id, filepath } = await storeFS({ stream, filename });
    return storeDB({ id, filepath, mimetype, encoding, filename });
  } catch (err) {
    console.log('processUpload error');
    throw new Error(err);
  }
}

exports.Mutation = {
  addBook: (root, args) => {
    const newBook = args.book;
    newBook.id = Math.round(Math.random() * 1000000);
    fakeDB.books.push(newBook);
    return newBook;
  },
  addMessage: (root, { message }) => {
    const bookFound = fakeDB.books.find(book => book.id === message.bookId);
    if (!bookFound) throw new Error('book does not exist');
    const messageId = bookFound.messages.length + 1;
    const newMessage = { id: String(messageId), text: message.text };
    bookFound.messages.push(newMessage);

    pubsub.publish('messageAdded', { messageAdded: newMessage, bookId: message.bookId });
    return newMessage;
  },
  singleUpload: (root, args) => {
    const { file } = args;
    return processUpload(file).then(data => {
      console.log(data);
      return data;
    });
  },
  mutipleUpload: (root, args) => {
    console.log(args);
    return 'mutiple upload';
  }
};
