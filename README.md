# react-apollo-graphql

## 坑

- 使用 apollo-boost 中的 ApolloClient 时，link 配置中 authMiddleware 没有在 request headers 中添加自定义字段。使用 apollo-client 中的 ApolloClient 解决了。
  https://stackoverflow.com/questions/49805432/apollo-link-middleware-is-not-adding-custom-headers-to-requests

## 参考

- https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b

- https://docs.scaphold.io/tutorials/authentication-in-graphql/
