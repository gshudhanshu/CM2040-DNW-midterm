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

router.get('/blog-settings', async (req, res) => {
  const blog_settings = await getBlogSettings()
  res.render('author/blog-settings', {
    blog_settings,
  })
})

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

router.get('/create-new-article', async (req, res) => {
  const blog_settings = await getBlogSettings()
  res.render('author/create-new-article', {
    blog_settings,
  })
})

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

router.put('/edit-article/:article_id', async (req, res) => {
  const article_id = req.params.article_id
  const { article_title, article_subtitle, article_content } = req.body
  await db.run(
    'UPDATE articles SET (article_title, article_subtitle, article_content, article_author) = (?, ?, ?, ?) WHERE article_id = ?',
    [article_title, article_subtitle, article_content, article_id]
  )
  res.json({ message: 'Article updated' })
  // res.redirect('/author')
})

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
      'UPDATE articles SET (article_status, article_updated_at, article_published_on) = (?, CURRENT_TIMESTAMP, NULL) WHERE article_id = ?',
      ['Draft', article_id]
    )
  }
  res.json({ message: 'Article updated' })
  // res.redirect('/author')
})

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
