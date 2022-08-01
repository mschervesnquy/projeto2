const conexao = require("../config/database");

const AlbumSchema = conexao.Schema({
  nome: {
    type: "String",
  },
  numerofaixa: {
    type: "Number",
  },
  lancamento: {
    type: "Date",
  },
  foto: {
    type: "String",
  },
});

module.exports = conexao.model("Album", AlbumSchema);
