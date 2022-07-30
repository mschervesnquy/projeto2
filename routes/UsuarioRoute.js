const express = require("express");
const UsuarioController = require("../controller/UsuarioController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/adicionar", UsuarioController.abreadicionar);
router.post("/adicionar", upload.single("foto"), UsuarioController.adicionar);

router.get("/listar", UsuarioController.listar);
router.post("/listar", UsuarioController.filtro);

router.get("/editar/:id", UsuarioController.abreeditar);
router.post("/editar/:id", upload.single("foto"), UsuarioController.editar);

router.get("/deletar", UsuarioController.deletar);

module.exports = router;
