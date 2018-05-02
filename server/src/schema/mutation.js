exports.mutation = `
  type Mutation {
    addBook(book: BookInput): Book
    addMessage(message: MessageInput!): Message
  }
`;
