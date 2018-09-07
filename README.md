# react-apollo-graphql

## 坑

- 使用 apollo-boost 中的 ApolloClient 时，link 配置中 authMiddleware 没有在 request headers 中添加自定义字段。使用 apollo-client 中的 ApolloClient 解决了。
  https://stackoverflow.com/questions/49805432/apollo-link-middleware-is-not-adding-custom-headers-to-requests

## 参考

https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b

https://docs.scaphold.io/tutorials/authentication-in-graphql/

https://www.apollographql.com/docs/react/api/react-apollo.html

https://blog.apollographql.com/authorization-in-graphql-452b1c402a9

https://blog.apollographql.com/full-stack-react-graphql-tutorial-582ac8d24e3b

https://github.com/apollographql/react-apollo

https://github.com/apollographql/apollo-link

https://github.com/apollographql/apollo-link-state
