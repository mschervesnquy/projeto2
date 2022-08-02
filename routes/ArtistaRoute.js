const express = require("express");
const ArtistaController = require("../controller/ArtistaController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/adicionar", ArtistaController.abreadicionar);
router.post("/adicionar", upload.single("foto"), ArtistaController.adicionar);

router.get("/listar", ArtistaController.listar);
router.post("/listar", ArtistaController.filtro);

router.get("/editar/:id", ArtistaController.abreeditar);
router.post("/editar/:id", upload.single("foto"), ArtistaController.editar);

router.get("/deletar/:id", ArtistaController.deletar);

module.exports = router;
