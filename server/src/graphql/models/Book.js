const shortid = require('shortid');

class Book {
  constructor() {}

  getAll(ctx) {
    return ctx.conn.lowdb.get('books').value();
  }

  getById(id, ctx) {
    return ctx.conn.lowdb
      .get('books')
      .find({ id })
      .value();
  }

  create(book, ctx) {
    if (ctx.models.User.isAuth(ctx)) {
      book.id = shortid.generate();
      book.messages = [];
      return ctx.lowdb
        .get('books')
        .push(book)
        .last()
        .write();
    }
  }
}

exports.Book = Book;
