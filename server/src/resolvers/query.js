exports.Query = {
  topics: (_, args, ctx) => {
    return ctx.topics.getHomeTopics(args.qs);
  }
};
