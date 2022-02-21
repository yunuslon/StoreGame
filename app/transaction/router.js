var express = require("express");
var router = express.Router();
const { index, actStatus } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");

/* middelware. */
router.use(isLoginAdmin);
/* GET home page. */
router.get("/", index);
router.put("/status/:id", actStatus);

module.exports = router;
