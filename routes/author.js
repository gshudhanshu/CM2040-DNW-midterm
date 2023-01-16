const express = require('express')
const router = express.Router()
const db = require('../utils/sqlitePromises')
const getBlogSettings = require('../utils/utilFunctions')

/**
 * @api {get} /author Get all Articles
 */
router.get('/', async (req, res) => {
  const blog_settings = await getBlogSettings()
  const published_articles = await db.all(
    "SELECT * FROM articles WHERE article_status='Published' ORDER BY article_updated_at DESC"
  )
  const draft_articles = await db.all(
    "SELECT * FROM articles WHERE article_status='Draft' ORDER BY article_updated_at DESC"
  )
  res.render('author/index', {
    blog_settings,
    published_articles,
    draft_articles,
  })
})

/**
 * @api {get} /author/blog-settings Get Blog Settings
 */
router.get('/blog-settings', async (req, res) => {
  const blog_settings = await getBlogSettings()
  res.render('author/blog-settings', {
    blog_settings,
  })
})

/**
 * @api {post} /author/blog-settings Update Blog Settings
 */
router.post('/blog-settings', async (req, res) => {
  const { blog_title, blog_subtitle, blog_author } = req.body
  const blog_id = 1

  await db.run(
    'UPDATE blog_settings SET (blog_title, blog_subtitle, blog_author) = (?, ?, ?) WHERE blog_id = ?',
    [blog_title, blog_subtitle, blog_author, blog_id]
  )
  res.json({ message: 'Blog settings updated' })
  // res.redirect('/author/blog-settings')
})

/**
 * @api {get} /author/create-new-article Create New Article
 */
router.get('/create-new-article', async (req, res) => {
  const blog_settings = await getBlogSettings()
  res.render('author/create-new-article', {
    blog_settings,
  })
})

/**
 * @api {post} /author/create-new-article Create New Article
 */
router.post('/create-new-article', async (req, res) => {
  const { article_title, article_subtitle, article_content } = req.body
  const blog_settings = await getBlogSettings()
  await db.run(
    'INSERT INTO articles (article_title, article_subtitle, article_content, article_author) VALUES (?, ?, ?, ?)',
    [
      article_title,
      article_subtitle,
      article_content,
      blog_settings.blog_author,
    ]
  )
  res.json({ message: 'Article created' })
  // res.redirect('/author')
})

/**
 * @api {get} /author/edit-article/:article_id Edit Article
 * @apiParam {Number} article_id Article ID
 */
router.get('/edit-article/:article_id', async (req, res) => {
  const article_id = req.params.article_id
  const article = await db.get('SELECT * FROM articles WHERE article_id = ?', [
    article_id,
  ])
  const blog_settings = await getBlogSettings()
  res.render('author/edit-article', {
    blog_settings,
    article,
  })
})

/**
 * @api {put} /author/edit-article/:article_id Edit Article
 * @apiParam {Number} article_id Article ID
 */
router.put('/edit-article/:article_id', async (req, res) => {
  const article_id = req.params.article_id
  const { article_title, article_subtitle, article_content } = req.body
  await db.run(
    'UPDATE articles SET (article_title, article_subtitle, article_content, article_updated_at) = (?, ?, ?, CURRENT_TIMESTAMP) WHERE article_id = ?',
    [article_title, article_subtitle, article_content, article_id]
  )
  res.json({ message: 'Article updated' })
  // res.redirect('/author')
})

/**
 * @api {get} /author/article/:article_id/:action Publish or Draft Article
 * @apiParam {Number} article_id Article ID
 * @apiParam {String} action Action to perform
 */
router.put('/article/:article_id/:action', async (req, res) => {
  const article_id = req.params.article_id
  const actionParam = req.params.action

  if (actionParam === 'publish') {
    await db.run(
      'UPDATE articles SET (article_status, article_published_on) = (?, CURRENT_TIMESTAMP) WHERE article_id = ?',
      ['Published', article_id]
    )
  } else if (actionParam === 'draft') {
    await db.run(
      'UPDATE articles SET (article_status, article_updated_at) = (?, CURRENT_TIMESTAMP) WHERE article_id = ?',
      ['Draft', article_id]
    )
  }
  res.json({ message: 'Article updated' })
  // res.redirect('/author')
})

/**
 * @api {delete} /author/article/:article_id Delete Article
 * @apiParam {Number} article_id Article ID
 */
router.delete('/article/:article_id', async (req, res) => {
  const article_id = req.params.article_id
  await db.run('DELETE FROM article_comments WHERE article_id = ?', [
    article_id,
  ])
  await db.run('DELETE FROM articles WHERE article_id = ?', [article_id])
  res.json({ message: 'Article deleted' })
  // res.redirect('/author')
})

module.exports = router
