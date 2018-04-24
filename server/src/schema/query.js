const query = `
  type Query {
    topics(page: Int, tab: String, limit: Int, mdrender: String): [Topic]
  }
`;

exports.query = query;
