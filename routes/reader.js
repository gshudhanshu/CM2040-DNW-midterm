const express = require('express')
const router = express.Router()
const db = require('../utils/sqlitePromises')
const getBlogSettings = require('../utils/utilFunctions')

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
  const blog_settings = await getBlogSettings()
  try {
    const article = await db.get(
      'SELECT * FROM articles WHERE article_id = ?',
      [article_id]
    )

    // If article is not found, throw an error
    if (article.length === 0) {
      throw new Error('Article not found')
    }

    const comments = await db.all(
      'SELECT * FROM article_comments WHERE article_id = ? ORDER BY comment_created_at DESC',
      [article_id]
    )
    res.render('reader/article', { blog_settings, article, comments })
  } catch (error) {
    res.render('error-pages/404.ejs', { blog_settings })
  }
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
  res.json({ message: 'Article liked successfully' })
  // res.redirect(`/article/${article_id}`)
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
  res.json({ message: 'Comment added successfully' })
  // res.redirect(`/article/${article_id}`)
})

/**
 * @api {put} /article/:article_id/comment/:comment_id/like Like Comment
 * @apiParam {Number} article_id Article ID
 * @apiParam {Number} comment_id Comment ID
 */
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
    res.json({ message: 'Comment liked successfully' })
    // res.redirect(`/article/${article_id}`)
  }
)

/**
 * @api {delete} /article/:article_id/comment/:comment_id/delete Delete Comment
 * @apiParam {Number} article_id Article ID
 * @apiParam {Number} comment_id Comment ID
 */
router.delete(
  '/article/:article_id/comment/:comment_id/delete',
  async (req, res) => {
    const comment_id = req.params.comment_id
    const article_id = req.params.article_id
    await db.run('DELETE FROM article_comments WHERE comment_id = ?', [
      comment_id,
    ])

    res.json({ message: 'Comment deleted successfully' })
    // res.redirect(`/article/${article_id}`)
  }
)

module.exports = router
