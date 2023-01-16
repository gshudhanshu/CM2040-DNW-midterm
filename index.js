const express = require('express')
const app = express()

const port = 3000
const sqlite3 = require('sqlite3').verbose()

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db', function (err) {
  if (err) {
    console.error(err)
    process.exit(1) //Bail out we can't connect to the DB
  } else {
    console.log('Database connected')
    global.db.run('PRAGMA foreign_keys=ON') //This tells SQLite to pay attention to foreign key constraints
  }
})

// parse application/json and application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authorRoutes = require('./routes/author')
const readerRoutes = require('./routes/reader')
const error404Routes = require('./routes/error404')

//set the app to use ejs for rendering
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('public/css', express.static(__dirname + 'public/css'))

//setting the author, reader and error404 routes
app.use('/author', authorRoutes)
app.use('/', readerRoutes)
app.use('/', error404Routes)

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`)
})
