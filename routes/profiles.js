const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan Profile
router.get("/", Controller.getProfile)
router.get("/edit", Controller.getEditProf)
router.post("/edit", Controller.postEditProf)

//Tampilan Post
router.get("/:postId", Controller.getPost)
router.post("/:postId/edit", Controller.postEditPost)

module.exports = router