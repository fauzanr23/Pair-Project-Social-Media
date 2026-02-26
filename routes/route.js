const express = require("express")
const router = express.Router()
const Controller = require("../controllers/controller")

function isAuthenticated(req, res, next) {
    if (req.session.UserId) {
        return next()
    }

    res.redirect("/login")
}

router.get("/", (req, res) => res.redirect("/login"))

router.get("/login", Controller.getLogin)
router.post("/login", Controller.postLogin)
router.get("/register", Controller.getRegister)
router.post("/register", Controller.postRegister)
router.get("/logout", Controller.logout)

router.get("/explore", isAuthenticated, Controller.getExplore)
router.post("/explore", isAuthenticated, Controller.postExplore)

router.get("/search", isAuthenticated, Controller.getSearch)

router.get("/profile/:id", isAuthenticated, Controller.getProfile)
router.get("/profile/edit", isAuthenticated, Controller.getEditProf)
router.post("/profile/edit", isAuthenticated, Controller.postEditProf)

router.get("/post/:id", isAuthenticated, Controller.getPost)
router.post("/post/:id/edit", isAuthenticated, Controller.postEditPost)

module.exports = router