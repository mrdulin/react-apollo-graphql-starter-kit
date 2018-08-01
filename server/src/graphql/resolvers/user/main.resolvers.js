module.exports = {
  Mutation: {
    login: async (_, { email, password }, ctx) => {
      return ctx.models.User.login(email, password, ctx);
    },
    register: async (_, { email, name, password }, ctx) => {
      return ctx.models.User.register(email, name, password, ctx);
    }
  }
};
