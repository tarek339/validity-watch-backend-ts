import express from "express";

const {
  signUp,
  getAllDrivers,
  getSingleDriver,
  deleteSingleDriver,
  editDriver,
  deleteAllDrivers,
} = require("../controller/driver/driverController");
const driverFormValidation = require("../controller/driver/driverFromValidation");

const router = express.Router();

router.post("/sign-up", driverFormValidation, signUp);
router.get("/", getAllDrivers);
router.get("/:id", getSingleDriver);
router.put("/edit/:id", editDriver);
router.delete("/delete/:id", deleteSingleDriver);
router.delete("/", deleteAllDrivers);

module.exports = router;
