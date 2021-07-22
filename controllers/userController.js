const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.Login = (req, res) => {
    res.render("login", { pageTitle: "login", path: "/login",message:req.flash("success_msg") })
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