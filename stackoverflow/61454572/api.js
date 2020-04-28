import { of } from 'rxjs';

export const API = {
  graphql(operation) {
    const response = { value: { data: { addedProduct: { name: 'jest' } } } };
    return of(response);
  },
};
