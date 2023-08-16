var express = require("express");
var router = express.Router();
const GameController = require("../controllers/game");


router.post("/genre", GameController.StartGame);
router.post("/action", GameController.MakeAction);


module.exports = router;
