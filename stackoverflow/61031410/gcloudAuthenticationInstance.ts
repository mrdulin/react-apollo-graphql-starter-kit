const GcloudAuthenticationInstance = {
  createGcloudAuthenticationBucket: () => {
    const storage = {
      bucket(name) {
        return this;
      },
      file(filename) {
        return this;
      },
      createWriteStream(options) {
        return 'write stream';
      },
    };
    return storage;
  },
};

export { GcloudAuthenticationInstance };
