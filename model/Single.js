const conexao = require("../config/database");

const SingleSchema = conexao.Schema({
  nome: {
    type: "String",
  },
  lancamento: {
    type: "Date",
  },
  foto: {
    type: "String",
  },
  artistas: [
    {
      type: conexao.Schema.Types.ObjectId,
      ref: "Artista",
    },
  ],
});

module.exports = conexao.model("Single", SingleSchema);
