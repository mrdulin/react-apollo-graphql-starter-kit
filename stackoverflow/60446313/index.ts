class Service {
  private dataSourceService;
  constructor(dataSourceService) {
    this.dataSourceService = dataSourceService;
  }
  public async callDataSourceCommand(dialogData: any, RecipeId: string) {
    const id = '1';
    const collection = [];
    const gridItems = await this.dataSourceService.myPromiseMethod(id, collection);
    this.updateGrid(JSON.parse(gridItems));
  }
  private updateGrid(gridItems: any) {}
}

export { Service };
