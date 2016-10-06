'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const knex = require('../knex')
const humps = require('humps')
const cookieSession = require('cookie-session')
// add validate, validation
const validate = require('express-validation');
const validation = require('../validations/users');


// add express-validation stuff (validate(validation.users) after path)
router.post('/', validate(validation.users), (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          hashed_password: hashed_password,
        }, '*')
    })
    .then((users) => {
      const user = users[0]
      delete user.hashed_password
      req.session.userID = user
      res.send(humps.camelizeKeys(user))
// add code to check for all things (try string().min() for username)
// handle duplicate email addresses
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
