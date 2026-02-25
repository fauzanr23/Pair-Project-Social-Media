const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan Explore (bisa untuk bikin post)
router.get("/", Controller.getExplore)
router.post("/:profileId/add", Controller.postExplore)

//Tampilan search
router.get("/search", Controller.getSearch)

module.exports = router