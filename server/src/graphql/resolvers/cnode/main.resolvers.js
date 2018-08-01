module.exports = {
  Query: {
    topics: (_, { qs }, ctx) => {
      return ctx.models.Topic.getHomeTopics(qs, ctx);
    },
    topic: (_, { id }, ctx) => {
      return ctx.Topic.getTopicById(id, ctx);
    }
  }
};
