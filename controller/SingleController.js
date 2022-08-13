const Artista = require("../model/Artista");
const Single = require("../model/Single");

function abreadicionar(req, res) {
  Artista.find({}).then(function (artistas) {
    res.render("single/adicionar.ejs", { Login: req.user, Artistas: artistas });
  });
}
function adicionar(req, res) {
  var single = new Single();
  single.nome = req.body.nome;
  single.lancamento = req.body.lancamento;
  single.foto = req.file.filename;
  single.artistas = req.body.artistas;
  single.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      for (let i = 0; i < req.body.length; i++) {
        Artista.findById(req.body.artistas[i]).then(function (artista) {
          artista.singles.push(result._id);
          artista.save();
        });
      }
      res.redirect("/admin/single/listar");
    }
  });
}

function listar(req, res) {
  Single.find({})
    .populate("artistas")
    .then(function (singles) {
      res.render("single/listar.ejs", { Singles: singles, Login: req.user });
    });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Single.find({ nome: new RegExp(pesquisa, "i") })
    .populate("artistas")
    .then(function (singles) {
      res.render("single/listar.ejs", { Singles: singles, Login: req.user });
    });
}

function abreeditar(req, res) {
  Artista.find({}).then(function (artistas) {
    Single.findById(req.params.id).then(function (single) {
      res.render("single/editar.ejs", {
        Single: single,
        Login: req.user,
        Artistas: artistas,
      });
    });
  });
}
function editar(req, res) {
  Single.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      lancamento: req.body.lancamento,
      artistas: req.body.artistas,
      foto: req.file.filename,
    },
    function (err, result) {
      if (err) {
        res.send("Aconteceu o seguinte errro: " + err);
      } else {
        res.redirect("/admin/single/listar");
      }
    }
  );
}

function deletar(req, res) {
  Single.findByIdAndDelete(req.params.id)
    .populate("artistas")
    .then(function (valor) {
      for (let i = 0; i < valor.artistas.length; i++) {
        Artista.findById(valor.artistas[i]).then(function (artista) {
          artista.singles.splice(artista.singles.indexOf(valor._id), 1);
          artista.save();
        });
      }
      res.redirect("/admin/single/listar");
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
