const {Router} = require('express');
const router = new Router();

router.get("/",(req,res)=>{
    res.render("index",{pageTitle:"Home",path:"/"})
})


module.exports = router;