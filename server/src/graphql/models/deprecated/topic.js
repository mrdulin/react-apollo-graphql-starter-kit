class Topic {
  constructor(model, { Author, Topics }, connector) {
    this.id = '';
    this.author_id = '';
    this.tab = '';
    this.content = '';
    this.title = '';
    this.reply_count = 0;
    this.visit_count = 0;
    this.create_at = new Date().toString();
    this.author = new Author({}, { Topics, Topic });

    this.connector = connector;
    this.Author = Author;
    this.Topics = Topics;

    if (model) {
      Object.assign(this, model);

      if (model.author) {
        this.author = new Author(model.author, { Topic, Topics });
      }
    }
  }

  getTopicById(id) {
    return this.connector.get(`/topic/${id}`).then(res => {
      const { data } = res;
      return new Topic(data, { Author: this.Author, Topics: this.Topics });
    });
  }
}

exports.Topic = Topic;
