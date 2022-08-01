const Album = require("../model/Album");

function abreadicionar(req, res) {
  res.render("album/adicionar.ejs", { Login: req.user });
}
function adicionar(req, res) {
  var album = new Album();
  album.nome = req.body.nome;
  album.numerofaixa = req.body.numerofaixa;
  album.lancamento = req.body.lancamento;
  album.foto = req.file.filename;
  album.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/admin/album/listar");
    }
  });
}

function listar(req, res) {
  console.log(req.user);
  Album.find({}).then(function (albuns) {
    res.render("album/listar.ejs", { Albuns: albuns, Login: req.user });
  });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Album.find({ nome: new RegExp(pesquisa, "i") }).then(function (albuns) {
    res.render("album/listar.ejs", { Albuns: albuns, Login: req.user });
  });
}

function abreeditar(req, res) {
  Album.findById(req.params.id).then(function (album) {
    res.render("album/editar.ejs", { Album: album, Login: req.user });
  });
}
function editar(req, res) {
  Album.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      numerofaixa: req.body.numerofaixa,
      lancamento: req.body.lancamento,
      foto: req.file.filename,
    },
    function (err, result) {
      if (err) {
        res.send("Aconteceu o seguinte errro: " + err);
      } else {
        res.redirect("/admin/album/listar");
      }
    }
  );
}

function deletar(req, res) {
  Album.findByIdAndDelete(req.params.id).then(function (valor) {
    res.redirect("/admin/album/listar");
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
