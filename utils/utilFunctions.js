const db = require('../utils/sqlitePromises')

// Get blog settings
const getBlogSettings = async () => {
  const blog_settings = await db.get(
    'SELECT * FROM blog_settings WHERE blog_id = 1'
  )
  return blog_settings
}

module.exports = getBlogSettings
