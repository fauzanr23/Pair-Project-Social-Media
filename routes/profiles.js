const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan Profile
router.get("/", Controller.getProfile)
router.get("/:profileId/edit", Controller.getEditProf)
router.post("/:profileId/edit", Controller.postEditProf)

//Tampilan Post
router.get("/:profileId/post/:postId", Controller.getPost)
router.post("/:profileId/post/:postId/edit", Controller.postEditPost)

module.exports = router