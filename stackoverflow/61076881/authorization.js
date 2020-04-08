let createClient = (req) => {
  if (!(req.user && req.user.access_token)) {
    throw new Error('Not authorized');
  }
  function getUser() {
    return 'real user';
  }
  return { getUser };
};

const getUser = async (client) => {
  return client.getUser();
};

module.exports = (options) => {
  const client = createClient(options.req);
  return () => getUser(client);
};
