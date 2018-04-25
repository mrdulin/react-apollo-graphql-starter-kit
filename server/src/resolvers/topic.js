exports.Topic = {
  author(topic) {
    // console.log('topic: ', topic);
    topic.author.id = topic.author_id;
    return topic.author;
  },
  replies(topic) {
    console.log('topic: ', topic);
    return topic.replies;
  }
};
