const express = require('express')
const app = express()
const routes = require('./routes/index')
const session = require('express-session')
const path = require("path")

const port = 3000 


app.set ("view engine", "ejs")

app.use (express.urlencoded({ extended: false }));

app.use (express.json())

app.use (session ({
  secret: "rahasia",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.set ("views", path.join(__dirname, "views"))

app.use (express.static(path.join(__dirname, "public")))

app.use("/", routes)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})