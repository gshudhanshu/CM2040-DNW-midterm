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

//set the app to use ejs for rendering
app.set('view engine', 'ejs')

//this adds all the userRoutes to the app under the path /user
// app.use('/user', userRoutes)
app.use('/author', authorRoutes)
app.use('/', readerRoutes)

app.use(express.static('public'))
app.use('public/css', express.static(__dirname + 'public/css'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
