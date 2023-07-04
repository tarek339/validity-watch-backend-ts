import express from "express";

const {
  signUp,
  getCompanyDrivers,
  getSingleDriver,
  deleteSingleDriver,
  editDriver,
} = require("../controller/driver/driverController");
const driverFormValidation = require("../controller/driver/driverFromValidation");
const withSignIn = require("../middlewares/withSignIn");

const router = express.Router();

router.post("/sign-up", driverFormValidation, signUp);
router.get("/drivers", withSignIn, getCompanyDrivers);
router.get("/driver/:id", getSingleDriver);
router.put("/edit/:id", withSignIn, editDriver);
router.delete("/delete/:id", deleteSingleDriver);

module.exports = router;
