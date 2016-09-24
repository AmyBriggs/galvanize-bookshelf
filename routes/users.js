'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const knex = require('../knex')
const humps = require('humps')

router.post('/', (req, res, next) => {
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
      req.session.userInfo = users
      res.send(humps.camelizeKeys(user))
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router

// 'use strict';
//
// const express = require('express');
// const router = express.Router();
// const knex = require('../knex');
// const humps = require('humps');
// const bcrypt = require('bcrypt');
//
// router.post('/', (req, res) => {
//   knex('users')
//   .returning(['id','first_name','last_name', 'email'])
//   .insert({
//       'first_name': req.body.firstName,
//       'last_name': req.body.lastName,
//       'email': req.body.email,
//       'hashed_password': bcrypt.hashSync(req.body.password,8)
//   }).then((user) => {
//     res.send(humps.camelizeKeys(user[0]));
//   });
// });
//
// module.exports = router;
