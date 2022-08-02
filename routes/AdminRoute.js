const express = require("express");
const AlbumRoute = require("./AlbumRoute");
const ArtistaRoute = require("./ArtistaRoute");
const SingleRoute = require("./SingleRoute");
const UsuarioRoute = require("./UsuarioRoute");

const app = express();

app.get("/", function (req, res) {
  res.render("admin/inicial.ejs");
});

app.use("/album", AlbumRoute);
app.use("/artista", ArtistaRoute);
app.use("/single", SingleRoute);
app.use("/usuario", UsuarioRoute);

module.exports = app;
