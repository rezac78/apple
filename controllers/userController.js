const bcrypt = require('bcryptjs');
const passport = require("passport")

const User = require('../models/User');

exports.Login = (req, res) => {
    res.render("login", { pageTitle: "login", path: "/login", message: req.flash("success_msg"), error: req.flash("error") })
}

exports.handleLogin = (req, res, next) => {
    if(!req.body["g-recaptcha-response"]){
        req.flash("error","اعتبار سنجی captcha  الزامی است");
        return res.redirect("/users/login")
    }
    passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next);
};
exports.rememberMe = (req, res) => {
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000
    } else {
        req.session.cookie.expire = null;
    }
    res.redirect("/dashboard")
}


exports.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "lagout is success")
    res.redirect("/users/login")
}
exports.Register = (req, res) => {
    res.render("register", { pageTitle: "register", path: "/register" })
}

exports.CreatUser = async (req, res) => {
    const errors = []
    try {
        await User.userValidation(req.body);
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            errors.push({ message: "کاربری با این ایمیل موجود است" });
            return res.render("register", { pageTitle: "ثبت نام کاربر", path: "/register", errors })
        }
        const hash = await bcrypt.hash(password, 14)
        await User.create({ fullname, email, password: hash });
        req.flash('success_msg', 'success Login')
        res.redirect("/users/login")
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("register", {
            pageTitle: "register",
            path: "/register",
            errors,
        })
    }
}