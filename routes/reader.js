const express = require('express')
const router = express.Router()
const assert = require('assert')
const { body, validationResult } = require('express-validator')

/**
 * @api {get} / Get Articles List
 */

const articles = [
  {
    title: 'title',
    content: 'content',
    author: 'author',
    datetime: 'datetime',
    url: '#',
  },
  {
    title: 'title',
    content: 'content',
    author: 'author',
    datetime: 'datetime',
    url: '#',
  },
  {
    title: 'title',
    content: 'content',
    author: 'author',
    datetime: 'datetime',
    url: '#',
  },
  {
    title: 'title',
    content: 'content',
    author: 'author',
    datetime: 'datetime',
    url: '#',
  },
]
router.get('/', (req, res) => {
  res.render('reader/index', { articles })
})

module.exports = router
