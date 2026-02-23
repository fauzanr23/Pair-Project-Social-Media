const router = require("express").Router()
const loginRoutes = require("./login")
const profileRoutes = require("./profiles")
const exploreRoutes = require("./explore") 

//routes
router.get("/", (req,res) =>{
     res.redirect("/start")
})

router.use("/start", loginRoutes)

router.use("/explore", exploreRoutes)

router.use("/:profileId", profileRoutes)

module.exports = router
