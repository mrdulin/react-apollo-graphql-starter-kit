export enum EntityType {
  User = 'User',
}
export const userModel = {
  async findOne(opts) {
    return 'real user document';
  },
};
export const vendorModel = {
  async findOne(opts) {
    return 'real vendor document';
  },
};
