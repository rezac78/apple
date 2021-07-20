const {Router} = require('express');
const router = new Router();

router.get("/login",(req,res)=>{
    res.render("login",{pageTitle:"login",path:"/login"})
})

router.get("/register",(req,res)=>{
    res.render("register",{pageTitle:"register",path:"/register"})
})


module.exports = router;