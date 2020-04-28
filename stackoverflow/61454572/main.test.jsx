import { MyComponent } from './main';
import { API } from './api';
import { of } from 'rxjs';

describe('61454572', () => {
  it('should pass', async () => {
    const mockResponse = { value: { data: { addedProduct: 'fake product' } } };
    const graphqlSpy = jest.spyOn(API, 'graphql').mockImplementation(() => {
      return of(mockResponse);
    });
    const wrapper = shallow(<MyComponent></MyComponent>);
    expect(wrapper.state('products')).toEqual(['fake product']);
    expect(graphqlSpy).toBeCalledWith('graphqlOperation(subscriptions.addedProduct)');
    graphqlSpy.mockRestore();
  });
});
