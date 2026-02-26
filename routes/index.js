const router = require("express").Router()
const loginRoutes = require("./login")
const profileRoutes = require("./profiles")
const exploreRoutes = require("./explore")
const user = require("../models/user")
const Controller = require("../controllers/controller")

//routes
router.get("/", (req, res) => {
     res.redirect("/start")
})

router.use("/start", loginRoutes)

router.use((req, res, next) => {
     if (!req.session.user) {
          res.redirect("/start")
     } else {
          next()
     }
})

router.use("/explore", exploreRoutes)

router.use("/profile", profileRoutes)

//logout
router.get("/logout", Controller.getLogout)

module.exports = router
