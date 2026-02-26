const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000 
const routes = require('./routes/index')

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