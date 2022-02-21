var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actCreate,
  viewEdit,
  actEdit,
  actDelete,
} = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");

/* middelware. */
router.use(isLoginAdmin);
/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actEdit);
router.delete("/delete/:id", actDelete);

module.exports = router;
