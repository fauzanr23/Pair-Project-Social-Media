const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan Profile
router.get("/", Controller.getProfile)
router.get("/:ProfileId/edit", Controller.getEditProf)
router.post("/:ProfileId/edit", Controller.postEditProf)

router.get("/:ProfileId/post/:PostId/delete", Controller.getDelete)
router.get("/:ProfileId", Controller.getProfileById)

module.exports = router
