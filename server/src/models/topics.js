class Topics {
  constructor({ Topic, Author }, connector, models) {
    this.Topic = Topic;
    this.Author = Author;
    this.connector = connector;
    this.models = models || [];
    this.models = this.models.map(model => new Topic(model, { Author, Topics }));
  }

  getModels() {
    return this.models;
  }

  getHomeTopics() {
    return this.connector.get('/topics').then(res => {
      const { data = [] } = res;
      return data.map(topic => {
        return new this.Topic(topic, { Author: this.Author, Topics });
      });
    });
  }
}

exports.Topics = Topics;
