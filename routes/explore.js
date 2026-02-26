const Controller = require("../controllers/controller")

const router = require("express").Router()

//Tampilan search
router.get("/search", Controller.getSearch)

//Tampilan Explore (bisa untuk bikin post)
router.get("/", Controller.getExplore)
router.post("/:ProfileId/add", Controller.postExplore)

module.exports = router