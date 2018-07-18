const { PubSub } = require('graphql-subscriptions');
const path = require('path');
const shortid = require('shortid');

const mkdirp = require('mkdirp');
const fs = require('fs');
const { lowdb } = require('../database/lowdb');

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
  return lowdb
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
  addBook: (root, args, context) => {
    const { book } = args;
    book.id = shortid.generate();
    return context.lowdb
      .get('books')
      .last()
      .push(book);
  },
  addMessage: (root, { message }, context) => {
    const book = context.lowdb.get('books').find({ id: message.bookId });
    if (!book) throw new Error('book does not exist');
    const messageId = shortid.generate();
    const newMessage = { id: messageId, text: message.text };
    book.messages.push(newMessage);

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
