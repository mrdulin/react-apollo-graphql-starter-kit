export class ComponentsService {
  public async listComponentsDiffer(lastTag: string, workDir: string): Promise<any[]> {
    return [{ components: 'toto', newVersion: '2', oldVersion: '1' }];
  }
}
