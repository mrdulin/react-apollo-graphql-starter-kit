class Topics {
  constructor(Model, connector, models) {
    this.Model = Model;
    this.connector = connector;
    this.models = models || [];
  }

  getHomeTopics() {
    return this.connector.get('/topics');
  }
}

exports.Topics = Topics;
