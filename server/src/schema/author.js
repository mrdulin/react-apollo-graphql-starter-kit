const author = `
  type Author {
    id: ID!
    loginname: String!
    avatar_url: String
    topic_collect: [Topic]
  }
`;

exports.author = author;
