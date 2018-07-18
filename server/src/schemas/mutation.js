exports.mutation = `
  type Mutation {
    addBook(book: BookInput): Book
    addMessage(message: MessageInput!): Message
    singleUpload(file: Upload!): File!
    mutipleUpload(files: [Upload!]!): [File!]!
  }
`;
