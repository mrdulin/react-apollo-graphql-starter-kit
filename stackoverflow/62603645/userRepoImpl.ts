interface User {}
interface UserRepo {
  getUser(id: string): Promise<User>;
}
interface ElasticsearchClient {
  request(method: string, endpoint: string): Promise<{ _source: any }>;
}
export default class UserRepoImpl implements UserRepo {
  constructor(private readonly esClient: ElasticsearchClient) {}

  public async getUser(id: string): Promise<User> {
    const response = await this.esClient.request('GET', `/users/_doc/${id}`);

    return response._source;
  }
}
