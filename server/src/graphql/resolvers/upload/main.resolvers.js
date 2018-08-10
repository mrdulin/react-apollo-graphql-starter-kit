const { GraphQLUpload } = require('apollo-upload-server');

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    uploads: (root, args, { models, conn }) => {
      return models.Upload.getAll(conn.lowdb);
    }
  },
  Mutation: {
    singleUpload: (root, { file }, { models, conn }) => {
      return models.Upload.singleUpload(file, conn.lowdb);
    },
    multipleUpload: async (root, { files }, { models, conn }) => {
      return models.Upload.multipleUpload(files, conn.lowdb);
    }
  }
};
