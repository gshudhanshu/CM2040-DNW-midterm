const express = require('express')
const router = express.Router()
const { query, param, body, validationResult } = require('express-validator')

const db = require('../utils/sqlitePromises')

const getBlogSettings = async () => {
  const blog_settings = await db.get(
    'SELECT * FROM blog_settings WHERE blog_id = 1'
  )
  return blog_settings
}

/**
 * @api {get} / Get all Articles
 */
router.get('/', async (req, res) => {
  const articles = await db.all(
    "SELECT * FROM articles WHERE article_status='Published'"
  )
  const blog_settings = await getBlogSettings()
  res.render('reader/index', { blog_settings, articles })
})

/**
 * @api {get} /:article_id Get Article by ID
 */
router.get('/:article_id', async (req, res) => {
  const article_id = req.params.article_id
  const blog_settings = await getBlogSettings()
  const article = await db.get('SELECT * FROM articles WHERE article_id = ?', [
    article_id,
  ])
  res.render('reader/article', { article, blog_settings })
})

router.post('/:id/comment', async (req, res) => {
  const article_id = Number(req.params.id)
  const { comment_name, comment_text } = req.body
  await db.run(
    'INSERT INTO article_comments (comment_name, comment_text, article_id) VALUES (?, ?, ?)',
    [comment_name, comment_text, article_id]
  )
  res.redirect(`/${article_id}`)
})

module.exports = router
