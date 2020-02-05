const typeDefs = `

  type Book {
    id: ID!
    title: String!
    author: String!
    count: Int
  }

  input BookInput {
    id: ID!
    title: String!
    author: String!
  }

  type BookDetail {
    comment: String
  }

  type Comment {
    id: ID
    text: String
  }

  type Cart {
    books: [Book]
  }

  type Mutation {
    addToCart(book: BookInput!): Book!
  }

  type Query {
    cart: Cart!
    bookDetail: BookDetail
  }
`;
export { typeDefs };
