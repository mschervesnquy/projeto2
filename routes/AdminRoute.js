const express = require("express");
const UsuarioRoute = require("./UsuarioRoute");

const app = express();

app.get("/", function (req, res) {
  res.render("admin/inicial.ejs");
});

app.use("/usuario", UsuarioRoute);

module.exports = app;
