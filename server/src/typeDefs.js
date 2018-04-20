const typeDefs = `
  type Book {
    id: ID!
    title: String
    author: String
  }

  input BookInput {
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(book: BookInput): Book
  }
`;

exports.typeDefs = typeDefs;
