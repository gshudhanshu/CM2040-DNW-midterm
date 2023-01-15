const express = require('express')
const router = express.Router()
const { query, param, body, validationResult } = require('express-validator')
const db = require('../utils/sqlitePromises')

router.get('/', async (req, res) => {
  res.render('author/index')
})

module.exports = router
