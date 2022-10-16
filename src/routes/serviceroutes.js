const express = require("express");
const {
  getAllServices,
  getAservice,
  createAservice,
  updateAservice,
  deleteAservice,
  deleteAllServices,
} = require("../controllers/servicecontroller");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllServices);
router.get("/:id", getAservice);
router.post("/", createAservice);
router.patch("/:id", updateAservice);
router.delete("/:id", deleteAservice);
router.delete("/", deleteAllServices);

module.exports = router;
