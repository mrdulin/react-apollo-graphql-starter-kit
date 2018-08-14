const shortid = require('shortid');
const { auth } = require('../../utils/auth');
class Book {
  constructor(opts) {
    this.collectionName = opts.collectionName;
  }

  getAll({ models, conn }) {
    return conn.lowdb
      .get(this.collectionName)
      .value()
      .map(book => {
        book.comments = models.Comment.getByBookId({ id: book.id, pageSize: 10, page: 0 }, conn);
        return book;
      });
  }

  getById(id, ctx) {
    if (auth(ctx)) {
      return ctx.conn.lowdb
        .get(this.collectionName)
        .find({ id })
        .value();
    }
  }

  create(book, ctx) {
    if (auth(ctx)) {
      book.id = shortid.generate();
      book.messages = [];
      return ctx.conn.lowdb
        .get(this.collectionName)
        .push(book)
        .last()
        .write();
    }
  }
}

exports.Book = Book;
