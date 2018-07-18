const query = `
  type Query {
    topics(qs: TopicsInput): [Topic]
    topic(id: ID!): Topic
    books: [Book]
    book(id: ID!): Book
    uploads: [File!]!
  }
`;

exports.query = query;
