const shortid = require('shortid');
const { auth } = require('../../utils/auth');
class Book {
  constructor() {}

  getAll(ctx) {
    if (auth(ctx)) {
      return ctx.conn.lowdb.get('books').value();
    }
  }

  getById(id, ctx) {
    if (auth(ctx)) {
      return ctx.conn.lowdb
        .get('books')
        .find({ id })
        .value();
    }
  }

  create(book, ctx) {
    if (auth(ctx)) {
      book.id = shortid.generate();
      book.messages = [];
      return ctx.conn.lowdb
        .get('books')
        .push(book)
        .last()
        .write();
    }
  }
}

exports.Book = Book;
