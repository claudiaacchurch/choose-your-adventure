var express = require("express");
var router = express.Router();
const GameController = require("../controllers/game");

/* GET home page. */
router.get("/", GameController.startGame);

module.exports = router;
