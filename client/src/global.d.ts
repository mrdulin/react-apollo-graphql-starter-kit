declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const value: {
    [key: string]: DocumentNode;
  };
  export = value;
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export = value;
}
