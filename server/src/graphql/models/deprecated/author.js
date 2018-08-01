class Author {
  constructor(model, { Topic, Topics }) {
    this.id = '';
    this.loginname = '';
    this.avatar_url = '';
    this.topic_collect = [];

    if (model) {
      Object.assign(this, model);

      if (this.topic_collect) {
        this.topic_collect = new Topics({ Topic, Author }, null, this.topic_collect);
      }
    }
  }
}

exports.Author = Author;
