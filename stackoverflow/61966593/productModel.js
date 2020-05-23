export class ProductModel {
  constructor(name, brand) {
    this.id = null;
    this.name = name;
    this.brand = brand;
  }

  getAll() {
    const rawData = fs.readFileSync('./products.json');
    const products = JSON.parse(rawData);

    return products;
  }
}
