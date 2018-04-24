const reply = `
  type Reply {
    id: ID!
    author: Author!
    content: String!
    create_at: String
    reply_id: ID!
  }
`;

exports.reply = reply;
