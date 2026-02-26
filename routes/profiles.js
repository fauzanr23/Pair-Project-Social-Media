const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan Profile
router.get("/profile/:id", isAuthenticated, Controller.getProfile)
router.get("/profile/edit", isAuthenticated, Controller.getEditProf)
router.post("/profile/edit", isAuthenticated, Controller.postEditProf)

//Tampilan Post
router.get("/post/:id", isAuthenticated, Controller.getPost)
router.post("/post/:id/edit", isAuthenticated, Controller.postEditPost)

module.exports = router