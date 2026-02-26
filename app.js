const express = require('express')
const session = require('express-session')
const app = express()
const routes = require('./routes/index')
const session = require('express-session')
const path = require("path")

const port = 3000 


app.set ("view engine", "ejs")

app.use (express.urlencoded({ extended: false }));

app.use(session({
  secret: 'rahasia dong',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use("/", routes)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})