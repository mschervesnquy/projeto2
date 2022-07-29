const Usuario = require("../model/Usuario");

function abreadicionar(req, res) {
  res.render("usuario/adicionar.ejs");
}
function adicionar(req, res) {
  var usuario = new Usuario();
  usuario.nome = req.body.nome;
  usuario.email = req.body.email;
  usuario.senha = req.body.senha;
  usuario.foto = req.file.filename;
  usuario.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/usuario/listar");
    }
  });
}

function listar(req, res) {}
function filtro(req, res) {}

function abreeditar(req, res) {}
function editar(req, res) {}

function deletar(req, res) {}

module.exports = {
  abreadicionar,
  adicionar,
  listar,
  filtro,
  abreeditar,
  editar,
  deletar,
};
