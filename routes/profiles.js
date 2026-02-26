const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan Profile
router.get("/", Controller.getProfile)
router.get("/:ProfileId/edit", Controller.getEditProf)
router.post("/:ProfileId/edit", Controller.postEditProf)

//Tampilan Post
router.get("/:ProfileId/post/:PostId", Controller.getPost)
router.post("/:ProfileId/post/:PostId/edit", Controller.postEditPost)

module.exports = router