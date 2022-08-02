const express = require("express");
const SingleController = require("../controller/SingleController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/adicionar", SingleController.abreadicionar);
router.post("/adicionar", upload.single("foto"), SingleController.adicionar);

router.get("/listar", SingleController.listar);
router.post("/listar", SingleController.filtro);

router.get("/editar/:id", SingleController.abreeditar);
router.post("/editar/:id", upload.single("foto"), SingleController.editar);

router.get("/deletar/:id", SingleController.deletar);

module.exports = router;
