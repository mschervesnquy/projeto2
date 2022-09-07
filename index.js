const express = require("express");
const path = require("path");

const AdminRoute = require("./routes/AdminRoute");
const UsuarioSAController = require("./controller/UsuarioASController");

const upload = require("./config/upload");

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

app.set("view engine", "ejs");

app.use(passport.authenticate("session"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", autenticacao, AdminRoute);

app.get("/cadastrar", UsuarioSAController.abreadicionar);
app.post("/cadastrar", upload.single("foto"), UsuarioSAController.adicionar);

app.get("/", function (req, res) {
  res.redirect("/admin");
});

app.get("/login", function (req, res) {
  res.render("login/login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

app.listen(porta, () => {
  console.log("Servidor funcionando na porta 3000.");
});
