const {Router} = require('express');
const router = new Router();
const {authenticated}=require('../middlewares/auth');

router.get("/",authenticated, (req,res)=>{
    res.render("dashboard",{pageTitle:"dashboard",path:"/dashboard",layout:"./layout/dashLayout",fullname:req.user.fullname})
})


module.exports = router;