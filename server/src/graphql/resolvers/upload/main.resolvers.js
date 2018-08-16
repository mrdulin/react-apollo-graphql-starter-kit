const { GraphQLUpload } = require('apollo-upload-server');
const { AppError } = require('../../../utils/error');

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    uploads: (root, args, { models, conn, user }) => {
      if (!user) {
        throw new AppError(AppError.Unauthorized);
      }
      return models.Upload.getAll(conn.lowdb);
    }
  },
  Mutation: {
    singleUpload: (root, { file }, { models, conn, user }) => {
      if (!user) {
        throw new AppError(AppError.Unauthorized);
      }
      return models.Upload.singleUpload(file, conn.lowdb);
    },
    multipleUpload: async (root, { files }, { models, conn, user }) => {
      if (!user) {
        throw new AppError(AppError.Unauthorized);
      }
      return models.Upload.multipleUpload(files, conn.lowdb);
    }
  }
};
