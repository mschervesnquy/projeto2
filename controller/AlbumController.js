const Album = require("../model/Album");
const Artista = require("../model/Artista");

function abreadicionar(req, res) {
  Artista.find({}).then(function (artistas) {
    res.render("album/adicionar.ejs", { Login: req.user, Artistas: artistas });
  });
}
function adicionar(req, res) {
  var album = new Album();
  album.nome = req.body.nome;
  album.numerofaixa = req.body.numerofaixa;
  album.lancamento = req.body.lancamento;
  album.foto = req.file.filename;
  album.artista = req.body.artista;
  album.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      Artista.findById(req.body.artista).then(function (artista) {
        artista.albuns.push(result._id);
        artista.save();
      });
      res.redirect("/admin/album/listar");
    }
  });
}

function listar(req, res) {
  Album.find({})
    .populate("artista")
    .then(function (albuns) {
      res.render("album/listar.ejs", { Albuns: albuns, Login: req.user });
    });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Album.find({ nome: new RegExp(pesquisa, "i") })
    .populate("artista")
    .then(function (albuns) {
      res.render("album/listar.ejs", { Albuns: albuns, Login: req.user });
    });
}

function abreeditar(req, res) {
  Artista.find({}).then(function (artistas) {
    Album.findById(req.params.id).then(function (album) {
      res.render("album/editar.ejs", {
        Album: album,
        Login: req.user,
        Artistas: artistas,
      });
    });
  });
}
function editar(req, res) {
  Album.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      numerofaixa: req.body.numerofaixa,
      lancamento: req.body.lancamento,
      artista: req.body.artista,
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
  Album.findByIdAndDelete(req.params.id)
    .populate("artista")
    .then(function (valor) {
      Artista.findById(valor.artista).then(function (artista) {
        artista.albuns.splice(artista.albuns.indexOf(valor._id), 1);
        artista.save();
      });
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
