class Topic {
  constructor(model, { Author, Topics }) {
    this.id = '';
    this.author_id = '';
    this.tab = '';
    this.content = '';
    this.title = '';
    this.reply_count = 0;
    this.visit_count = 0;
    this.create_at = new Date().toString();
    this.author = new Author({}, { Topics, Topic });

    if (model) {
      Object.assign(this, model);

      if (model.author) {
        this.author = new Author(model.author, { Topic, Topics });
      }
    }
  }
}

exports.Topic = Topic;
