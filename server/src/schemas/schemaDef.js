const schemaDef = `
  scalar Upload
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

exports.schemaDef = schemaDef;
