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
    "SELECT * FROM articles WHERE article_status='Published' ORDER BY article_published_on DESC"
  )
  const blog_settings = await getBlogSettings()
  res.render('reader/index', { blog_settings, articles })
})

/**
 * @api {get} /:article_id Get Article by ID
 */
router.get('/article/:article_id', async (req, res) => {
  const article_id = await req.params.article_id
  const article = await db.get('SELECT * FROM articles WHERE article_id = ?', [
    article_id,
  ])
  const blog_settings = await getBlogSettings()
  const comments = await db.all(
    'SELECT * FROM article_comments WHERE article_id = ? ORDER BY comment_created_at DESC',
    [article_id]
  )
  res.render('reader/article', { blog_settings, article, comments })
})

/**
 * @api {put} /article/:article_id/like Like Article
 */
router.put('/article/:article_id/like', async (req, res) => {
  const article_id = req.params.article_id
  const article = await db.get('SELECT * FROM articles WHERE article_id = ?', [
    article_id,
  ])
  const likes = article.article_likes + 1
  await db.run('UPDATE articles SET article_likes = ? WHERE article_id = ?', [
    likes,
    article_id,
  ])
  res.redirect(`/article/${article_id}`)
})

/**
 * @api {post} /article/:article_id/comment Add Comment to Article
 */
router.post('/article/:article_id/comment', async (req, res) => {
  const article_id = req.params.article_id
  const { comment_name, comment_text } = req.body
  await db.run(
    'INSERT INTO article_comments (comment_name, comment_text, article_id) VALUES (?, ?, ?)',
    [comment_name, comment_text, article_id]
  )
  res.redirect(`/article/${article_id}`)
})

router.put(
  '/article/:article_id/comment/:comment_id/like',
  async (req, res) => {
    const comment_id = req.params.comment_id
    const article_id = req.params.article_id
    const comment = await db.get(
      'SELECT * FROM article_comments WHERE comment_id = ?',
      [comment_id]
    )
    const likes = comment.comment_likes + 1
    await db.run(
      'UPDATE article_comments SET comment_likes = ? WHERE comment_id = ?',
      [likes, comment_id]
    )
    res.redirect(`/article/${article_id}`)
  }
)

router.delete(
  '/article/:article_id/comment/:comment_id/delete',
  async (req, res) => {
    const comment_id = req.params.comment_id
    const article_id = req.params.article_id
    await db.run('DELETE FROM article_comments WHERE comment_id = ?', [
      comment_id,
    ])
    res.redirect(`/article/${article_id}`)
  }
)

module.exports = router
