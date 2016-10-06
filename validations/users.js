'use strict'

const Joi = require('joi')

module.exports = {
  users: {
    body: {
      id: Joi.number().integer().min(1).max(4).required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      hashed_password: Joi.string().required()
    },

  },
}
