exports.subscription = `
  type Subscription {
    messageAdded(bookId: ID!): Message
  }
`;
