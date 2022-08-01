const express = require("express");
const AlbumRoute = require("./AlbumRoute");
const UsuarioRoute = require("./UsuarioRoute");

const app = express();

app.get("/", function (req, res) {
  res.render("admin/inicial.ejs");
});

app.use("/album", AlbumRoute);
app.use("/usuario", UsuarioRoute);

module.exports = app;
