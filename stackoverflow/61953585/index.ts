export const obj = {
  getData() {
    const data = [
      { id: 1, productName: 'github' },
      { id: 2, productName: 'reddit' },
    ];
    return data.map((subscription) => ({
      id: subscription.id,
      productName: {
        toString: () => subscription.productName,
        name: subscription.productName,
      },
    }));
  },
};
