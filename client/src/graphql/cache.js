import { InMemoryCache } from 'apollo-boost';
import { toIdValue } from 'apollo-utilities';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      book: (_, args) => {
        return toIdValue(cache.config.dataIdFromObject({ __typename: 'Book', id: args.id }));
      }
    }
  }
});

export { cache };
