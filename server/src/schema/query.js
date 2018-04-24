const query = `
  type Query {
    topics(qs: TopicsInput): [Topic]
  }
`;

exports.query = query;
