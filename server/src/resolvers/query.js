exports.Query = {
  topics: (_, args, ctx) => {
    return ctx.topics.getHomeTopics(args.qs);
  },
  topic: (_, { id }, ctx) => {
    return ctx.topic.getTopicById(id);
  }
};
