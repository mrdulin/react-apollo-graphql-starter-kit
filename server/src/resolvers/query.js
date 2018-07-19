exports.Query = {
  topics: (_, args, ctx) => {
    return ctx.topics.getHomeTopics(args.qs);
  },
  topic: (_, { id }, ctx) => {
    return ctx.topic.getTopicById(id);
  },
  books: (root, args, ctx) => {
    return ctx.lowdb.get('books').value();
  },
  book: (root, { id }, ctx) => {
    return ctx.lowdb
      .get('books')
      .find({ id })
      .value();
  },
  uploads: (root, args, ctx) => {
    const files = ctx.lowdb.get('uploads').value();
    return files;
  }
};
