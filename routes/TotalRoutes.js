const express = require("express");
const createListController = require("../controllers/listController");

const Favorito = require("../models/Favorito");
const Playlist = require("../models/Playlist");
const Cola = require("../models/Cola");

const favoritoController = createListController(Favorito);
const playlistController = createListController(Playlist);
const colaController = createListController(Cola);

// ejemplo: favoritoRoutes.js
router.post("/add", favoritoController.addSong);
router.delete("/remove", favoritoController.removeSong);
router.get("/:userId", favoritoController.getList);
router.delete("/clear/:userId", favoritoController.clearList);
