'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const humps = require('humps');
// add require validate and validation
const validate = require('express-validation');
const validation = require('../validations/books')

router.get('/', (_req, res, next) => {
    knex('books')
        .orderBy('title')
        .then((books) => {
            res.send(humps.camelizeKeys(books));
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    knex('books')
        .where('id', req.params.id)
        .first()
        .then((book) => {
            if (!book) {
                return next();
            }

            res.send(humps.camelizeKeys(book));
        })
        .catch((err) => {
            next(err);
        });
});

// add express-validation stuff (validate(validation.books) after path in router.post)
router.post('/', validate(validation.books), (req, res, next) => {
    let insertBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        coverUrl: req.body.coverUrl
    }

    knex(`books`).insert(humps.decamelizeKeys(req.body), `id`).then((num) => {
            const id = num[0];
            knex(`books`).where(`id`, id).first().then((insertBook) => {
                res.json(humps.camelizeKeys(insertBook));
            });
        })
        .catch((err) => {
            next(err);
        });

});

router.patch('/:id', (req, res, next) => {
    let updateBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        cover_url: req.body.coverUrl
    }
    knex('books')
        .where('id', req.params.id)
        .first()
        .update(updateBook, '*')
        .then((newBook) => {
            // .where('id', book[0].id)
            res.json(humps.camelizeKeys(newBook[0]));
        })
        .catch((err) => {
            next(err);
        });
});
//
router.delete('/:id', (req, res) => {
    knex('books')
        .returning(['title', 'author', 'genre', 'description', 'cover_url'])
        .where('id', req.params.id).del().then((book) => {
            res.send(humps.camelizeKeys(book[0]))
        })
})

module.exports = router;
