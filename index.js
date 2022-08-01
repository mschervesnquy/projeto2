const express = require("express");
const path = require("path");
const AdminRoute = require("./routes/AdminRoute");
const passport = require("./config/passport");

var session = require("express-session");
var autenticacao = require("./config/autenticacao");

const app = express();

const porta = 3000;

app.use(
  session({
    secret: "5info",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/admin", autenticacao, AdminRoute);

app.get("/", function (req, res) {
  res.render("login/login.ejs");
});

app.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/",
  })
);

app.listen(porta, () => {
  console.log("Servidor funcionando na porta 3000.");
});
