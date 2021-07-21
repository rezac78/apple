const { Router } = require('express');
const userController=require('../controllers/userController');
const router = new Router();

router.get("/login",userController.Login)

router.get("/register", userController.Register)

router.post("/register",userController.CreatUser)


module.exports = router;