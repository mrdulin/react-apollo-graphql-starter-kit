const query = `
  type Query {
    topics(qs: TopicsInput): [Topic]
    topic(id: ID!): Topic
  }
`;

exports.query = query;
