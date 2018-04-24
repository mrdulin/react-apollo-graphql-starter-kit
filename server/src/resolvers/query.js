exports.Query = {
  topics: (_, args, ctx) => {
    return ctx.topics
      .getHomeTopics({})
      .then(res => {
        const { data } = res;
        return data;
      })
      .catch(err => {
        console.error('resolver error catch: ', err);
      });
  }
};
