const Controller = require("../controllers/controller")

const router = require("express").Router() 

//login page (ada tombol untuk register)
router.get("/", Controller.getLogin)
router.post("/", Controller.postLogin)
router.get("/logout", Controller.logout)

//register page
router.get("/register", Controller.getRegister)
router.post("/register", Controller.postRegister)

module.exports = router