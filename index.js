const express = require("express");
const path = require("path");
const UsuarioRoute = require("./routes/UsuarioRoute");

const app = express();

const porta = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/usuario", UsuarioRoute);

app.listen(porta, () => {
  console.log("Servidor funcionando na porta 3000.");
});
