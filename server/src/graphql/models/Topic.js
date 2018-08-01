class Topic {
  constructor() {}

  getHomeTopics(qs, ctx) {
    return ctx.conn.cnode.get('/topics', qs).then(res => res.data || []);
  }

  getById(id, ctx) {
    return ctx.conn.cnode.get(`/topic/${id}`).then(res => res.data || {});
  }
}

module.exports = {
  Topic
};
