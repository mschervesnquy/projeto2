const express = require("express");
const AlbumController = require("../controller/AlbumController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/adicionar", AlbumController.abreadicionar);
router.post("/adicionar", upload.single("foto"), AlbumController.adicionar);

router.get("/listar", AlbumController.listar);
router.post("/listar", AlbumController.filtro);

router.get("/editar/:id", AlbumController.abreeditar);
router.post("/editar/:id", upload.single("foto"), AlbumController.editar);

router.get("/deletar/:id", AlbumController.deletar);

module.exports = router;
