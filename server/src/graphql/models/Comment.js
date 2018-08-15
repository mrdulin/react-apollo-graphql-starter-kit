const shortid = require('shortid');

class Comment {
  constructor(opts) {
    this.collectionName = opts.collectionName;
  }
  create(comment, models, conn) {
    comment.id = shortid.generate();
    return conn.lowdb
      .get(this.collectionName)
      .push(comment)
      .last()
      .write();
  }

  getByBookId({ id, limit = 10 }, conn) {
    return conn.lowdb
      .get(this.collectionName)
      .filter({ bookId: id })
      .take(limit)
      .value();
  }

  getByPage({ id, offset, limit = 10 }, { conn }) {
    return conn.lowdb
      .get(this.collectionName)
      .filter({ bookId: id })
      .drop(offset * limit)
      .take(limit)
      .value();
  }
}

exports.Comment = Comment;
