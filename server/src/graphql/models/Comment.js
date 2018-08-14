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

  getByBookId({ id, pageSize = 10 }, conn) {
    return conn.lowdb
      .get(this.collectionName)
      .filter({ bookId: id })
      .take(pageSize)
      .value();
  }
}

exports.Comment = Comment;
