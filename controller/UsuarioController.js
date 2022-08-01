const Usuario = require("../model/Usuario");

function abreadicionar(req, res) {
  res.render("usuario/adicionar.ejs", { Login: req.user });
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
      res.redirect("/admin/usuario/listar");
    }
  });
}

function listar(req, res) {
  console.log(req.user);
  Usuario.find({}).then(function (usuarios) {
    res.render("usuario/listar.ejs", { Usuarios: usuarios, Login: req.user });
  });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Usuario.find({ nome: new RegExp(pesquisa, "i") }).then(function (usuarios) {
    res.render("usuario/listar.ejs", { Usuarios: usuarios, Login: req.user });
  });
}

function abreeditar(req, res) {
  Usuario.findById(req.params.id).then(function (usuario) {
    res.render("usuario/editar.ejs", { Usuario: usuario, Login: req.user });
  });
}
function editar(req, res) {
  Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.file.filename,
    },
    function (err, result) {
      if (err) {
        res.send("Aconteceu o seguinte errro: " + err);
      } else {
        res.redirect("/admin/usuario/listar");
      }
    }
  );
}

function deletar(req, res) {
  Usuario.findByIdAndDelete(req.params.id).then(function (valor) {
    res.redirect("/admin/usuario/listar");
  });
}

module.exports = {
  abreadicionar,
  adicionar,
  listar,
  filtro,
  abreeditar,
  editar,
  deletar,
};
