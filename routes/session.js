'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../knex')
const cookieSession = require('cookie-session')
    // const humps = require('humps')


router.get('/', (req, res) => {
    if (req.session.userID !== undefined) {
        res.send(true)
    } else {
        res.send(false)
    }
})

router.post('/', function(req, res) {
    knex('users').where('email', req.body.email)
        .then(function(user) {
            if(user.length === 0) {
              res.type('text/plain')
              res.status(400)
              res.send('Bad email or password')
            } else {
                var check = bcrypt.compareSync(req.body.password, user[0].hashed_password)
                if (check === true) {
                    let userObj = {
                        id: user[0].id,
                        firstName: user[0].first_name,
                        lastName: user[0].last_name,
                        email: user[0].email,
                    }
                    delete user[0].hashed_password
                    req.session.userID = user[0]
                    res.json(userObj)
                } else {
                  res.type('text/plain')
                  res.status(400)
                  res.send('Bad email or password')

                }
            }
        })
})

router.delete('/', function(req, res) {
  req.session = null
  res.send(true)
})




module.exports = router
