'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const knex = require('../knex')
// const humps = require('humps')


router.get('/', (req, res) => {
    if (req.session.userID) {
        res.send(true)
    }
    res.send(false)
})

router.post('/', function(req, res) {
  knex('users').where('email', req.body.email).then(function(results) {
    console.log(results)
    if (!results) {
      res.send('Username is already being used.')
    } else {
      var user = req.body
      var hash = bcrypt.hash(req.body.password, 12)
      knex('users')
        .returning('*')
        .insert({
          email: user.email,
          password: hash,
        })
        .then(function(results) {
          console.log(results)
          // delete results.password;
          req.session.userInfo = results
          res.send(user)
        })
    }
  })
})




// router.post('/', (req, res) => {
//     let user
//     knex('users')
//         .where('email', req.body.email)
//         .first()
//         .then(function(results) {
//             if (!results) {
//                 res.send('Please enter an email.')
//             }
//           user = humps.camelizeKeys(results)
//         })
//     var passwordMatch = bcrypt.compare(req.body.password, user.hashed_password)
//     delete user.hashed_password
//     if (passwordMatch === false) {
//         res.send('Username or password incorrect.')
//     } else {
//         res.send(user)
//     }
// })



module.exports = router
