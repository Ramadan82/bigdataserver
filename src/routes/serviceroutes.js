const express = require("express");
const {
  getAllServices,
  getAservice,
  createAservice,
  updateAservice,
  deleteAservice,
} = require("../controllers/servicecontroller");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllServices);
router.get("/:id", getAservice);
router.post("/", createAservice);
router.patch("/:id", updateAservice);
router.delete("/:id", deleteAservice);

module.exports = router;
