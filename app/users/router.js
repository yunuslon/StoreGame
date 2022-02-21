var express = require("express");
var router = express.Router();
const { viewLogin, actLogin, actLogout } = require("./controller");

/* GET home page. */
router.get("/", viewLogin);
router.post("/", actLogin);
router.get("/logout", actLogout);

module.exports = router;
