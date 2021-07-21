const { Router } = require('express');
const User=require('../models/User');
const router = new Router();

router.get("/login", (req, res) => {
    res.render("login", { pageTitle: "login", path: "/login" })
})

router.get("/register", (req, res) => {
    res.render("register", { pageTitle: "register", path: "/register" })
})

router.post("/register", async (req, res) => {
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
})


module.exports = router;