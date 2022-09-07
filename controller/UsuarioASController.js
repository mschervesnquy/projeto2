const Usuario = require("../model/Usuario");

function abreadicionar(req, res) {
  res.render("usuariosa/adicionar.ejs", { Login: req.user });
}
function adicionar(req, res) {
  var usuario = new Usuario();
  usuario.nome = req.body.nome;
  usuario.username = req.body.username;
  usuario.email = req.body.email;
  usuario.senha = req.body.senha;
  usuario.foto = req.file.filename;
  usuario.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/login");
    }
  });
}

module.exports = { abreadicionar, adicionar };
