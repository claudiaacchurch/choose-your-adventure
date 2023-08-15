var express = require("express");
var router = express.Router();
const GameController = require("../controllers/game");

router.post("/", GameController.StartGame);

module.exports = router;
