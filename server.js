const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');


dotEnv.config({ path: "./config/config.env" })
connectDB()
require('./config/passport');
const app = express();

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"))
}
app.use(expressLayouts)
app.set("view engine", "ejs");
app.set("layout", "./layout/MainLayout");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({
    secret: process.env.SERIAL_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());


app.use(express.static(path.join(__dirname, "public")))

app.use("/", require('./routers/app'))
app.use("/users", require('./routers/users'))
app.use("/dashboard", require('./routers/dashboard'))

app.use(require('./controllers/errorsController').get404)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running ${process.env.NODE_ENV} port ${PORT}`))