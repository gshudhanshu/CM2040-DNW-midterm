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

router.get('/blog_settings', async (req, res) => {
  const blog_settings = await getBlogSettings()
  res.render('author/blog_settings', {
    blog_settings,
  })
})

module.exports = router
