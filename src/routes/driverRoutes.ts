import express from "express";

const {
  signUp,
  getSingleDriver,
  deleteSingleDriver,
  editDriver,
} = require("../controller/driver/driverController");
const driverFormValidation = require("../controller/driver/driverFromValidation");
const withSignIn = require("../middlewares/withSignIn");

const router = express.Router();

router.post("/sign-up", withSignIn, driverFormValidation, signUp);
router.get("/driver/:id", withSignIn, getSingleDriver);
router.put("/edit/:id", withSignIn, editDriver);
router.delete("/delete/:id", withSignIn, deleteSingleDriver);

module.exports = router;
