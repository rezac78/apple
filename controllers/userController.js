const User=require('../models/User');


exports.Login=(req,res)=>{
    res.render("login", { pageTitle: "login", path: "/login" })
}

exports.Register=(req,res)=>{
    res.render("register", { pageTitle: "register", path: "/register" })
}

exports.CreatUser= async(req,res)=>{
    const errors = []
    try {
        await User.userValidation(req.body);
        res.redirect("/users/login")
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("register",{
            pageTitle:"register",
            path:"/register",
            errors,
        })
    }
}