const axios = require('axios');
const { host, token } = require('./config');
const { errorHandler } = require('./errorHandler');

export const getData = async (req, mainRes) => {
  try {
    let tk = await token();
    let { data } = await axios({
      method: 'GET',
      url: `${host}/api/books`,
      headers: {
        Authorization: `${tk}`,
      },
    });
    mainRes.status(200).json(data);
  } catch (error) {
    errorHandler(error.message, mainRes);
  }
};
