const Controller = require("../controllers/controller")

const router = require("express").Router() 

//login page (ada tombol untuk register)
router.get("/", Controller.landing)
router.post("/", Controller.login)

//register page
router.get("/register", Controller.getRegister)
router.post("/register", Controller.postRegister)

module.exports = router