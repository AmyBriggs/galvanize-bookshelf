'use strict'

const Joi = require('joi')

module.exports = {
  sessions: {
    body: {
      id: Joi.number().integer().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3, 30}$/).required()
    },

  },
}
