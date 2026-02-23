const router = require("express").Router()
const landingRoutes = require("./landing")
const profileRoutes = require("./profiles")
const exploreRoutes = require("./explore") 

//routes
router.get("/", (req,res) =>{
     res.redirect("/landing")
})

router.use("/landing", landingRoutes)

router.use("/explore", exploreRoutes)

router.use("/:profileId", profileRoutes)

module.exports = router
