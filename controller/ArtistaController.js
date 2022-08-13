const Artista = require("../model/Artista");

function abreadicionar(req, res) {
  res.render("artista/adicionar.ejs", { Login: req.user });
}
function adicionar(req, res) {
  var artista = new Artista();
  artista.nome = req.body.nome;
  artista.nascimento = req.body.nascimento;
  artista.foto = req.file.filename;
  artista.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/admin/artista/listar");
    }
  });
}

function listar(req, res) {
  Artista.find({}).then(function (artistas) {
    res.render("artista/listar.ejs", { Artistas: artistas, Login: req.user });
  });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Artista.find({ nome: new RegExp(pesquisa, "i") }).then(function (artistas) {
    res.render("artista/listar.ejs", { Artistas: artistas, Login: req.user });
  });
}

function abreeditar(req, res) {
  Artista.findById(req.params.id).then(function (artista) {
    res.render("artista/editar.ejs", { Artista: artista, Login: req.user });
  });
}
function editar(req, res) {
  Artista.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      nascimento: req.body.nascimento,
      foto: req.file.filename,
    },
    function (err, result) {
      if (err) {
        res.send("Aconteceu o seguinte errro: " + err);
      } else {
        res.redirect("/admin/artista/listar");
      }
    }
  );
}

function deletar(req, res) {
  Artista.findByIdAndDelete(req.params.id).then(function (valor) {
    res.redirect("/admin/artista/listar");
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
