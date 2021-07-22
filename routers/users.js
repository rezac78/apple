const { Router } = require('express');
const userController=require('../controllers/userController');
const {authenticated}=require('../middlewares/auth');

const router = new Router();

router.get("/login",userController.Login)
router.post("/login",userController.handleLogin,userController.rememberMe)

router.get("/logout",authenticated,userController.logout)


router.get("/register", userController.Register)

router.post("/register",userController.CreatUser)


module.exports = router;