const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const validation = require('./controller/validation');
const cookieParser = require("cookie-parser");
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser("açlskdjfgh"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(flash());
app.use("/", validation);

app.listen(port, () => {
    console.log(`server is running in: http://localhost:${port}`);
});