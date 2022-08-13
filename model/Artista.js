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
  albuns: [
    {
      type: conexao.Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  singles: [
    {
      type: conexao.Schema.Types.ObjectId,
      ref: "Single",
    },
  ],
});

module.exports = conexao.model("Artista", ArtistaSchema);
