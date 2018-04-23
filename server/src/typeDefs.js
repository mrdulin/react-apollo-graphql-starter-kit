const typeDefs = `
  type Book {
    id: ID!
    title: String
    author: String
    messages: [Message]
  }

  type Message {
    id: ID!
    text: String
  }

  input BookInput {
    title: String!
    author: String!
  }

  input MessageInput{
    bookId: ID!
    text: String
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(book: BookInput): Book
    addMessage(message: MessageInput!): Message
  }
`;

exports.typeDefs = typeDefs;
