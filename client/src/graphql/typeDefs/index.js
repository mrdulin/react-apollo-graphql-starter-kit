const typeDefs = `
  type Book {
    id: ID!
    title: string!
    author: string!
    count: Int
  }

  input BookInput {
    id: ID!
    title: string!
    author: string!
  }

  type Cart {
    books: [Book]
  }

  type Mutation {
    addToCart(book: BookInput!): Book!
  }

  type Query {
    cart: Cart
  }
`;
export { typeDefs };
