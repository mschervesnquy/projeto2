const express = require("express");
const UsuarioController = require("../controller/UsuarioController");

const router = express.Router();

router.get("/adicionar", UsuarioController.abreadicionar);
router.post("/adicionar", UsuarioController.adicionar);

router.get("/listar", UsuarioController.listar);
router.post("/listar", UsuarioController.filtro);

router.get("/editar", UsuarioController.abreeditar);
router.post("/editar", UsuarioController.editar);

router.get("/deletar", UsuarioController.deletar);

module.exports = router;
