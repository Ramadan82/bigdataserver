const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  loginUser,
  registerUser,
  getAuser,
  updateAuser,
  deleteAuser,
} = require("../controllers/authcontroller");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.use(requireAuth);
router.get("/:id", getAuser);
router.patch("/:id", updateAuser);
router.delete("/:id", deleteAuser);

module.exports = router;
