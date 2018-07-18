exports.book = `
  type Book {
    id: ID!
    title: String
    author: String
    messages: [Message]
  }

  input BookInput {
    title: String!
    author: String!
  }
`;
