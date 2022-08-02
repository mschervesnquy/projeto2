const Single = require("../model/Single");

function abreadicionar(req, res) {
  res.render("single/adicionar.ejs", { Login: req.user });
}
function adicionar(req, res) {
  var single = new Single();
  single.nome = req.body.nome;
  single.lancamento = req.body.lancamento;
  single.foto = req.file.filename;
  single.save(function (err, result) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/admin/single/listar");
    }
  });
}

function listar(req, res) {
  console.log(req.user);
  Single.find({}).then(function (singles) {
    res.render("single/listar.ejs", { Singles: singles, Login: req.user });
  });
}
function filtro(req, res) {
  var pesquisa = req.body.pesquisa;
  Single.find({ nome: new RegExp(pesquisa, "i") }).then(function (singles) {
    res.render("single/listar.ejs", { Singles: singles, Login: req.user });
  });
}

function abreeditar(req, res) {
  Single.findById(req.params.id).then(function (single) {
    res.render("single/editar.ejs", { Single: single, Login: req.user });
  });
}
function editar(req, res) {
  Single.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      lancamento: req.body.lancamento,
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
  Single.findByIdAndDelete(req.params.id).then(function (valor) {
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
