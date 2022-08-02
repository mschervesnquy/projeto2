const conexao = require("../config/database");

const ArtistaSchema = conexao.Schema({
  nome: {
    type: "String",
  },
  nascimento: {
    type: "Date",
  },
  foto: {
    type: "String",
  },
});

module.exports = conexao.model("Artista", ArtistaSchema);
