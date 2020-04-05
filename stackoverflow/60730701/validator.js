const Joi = require('joi');

module.exports = {
  validateExternalId: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req.params[name] }, schema);
      if (result.error) {
        return res.status(400).send(result.error.details[0].message);
      }
      next();
    };
  },
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[a-zA-Z0-9]{20}$/)
        .required(),
    }),
  },
};
