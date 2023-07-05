import express from "express";
const {
  signUpTruck,
  getSingleTruck,
  editTruck,
  deleteSingleTruck,
} = require("../controller/truck/truckController");
const truckFormValidation = require("../controller/truck/truckFormValidation");
const withSignIn = require("../middlewares/withSignIn");
const router = express.Router();

router.post("/sign-up", withSignIn, truckFormValidation, signUpTruck);
router.get("/truck/:id", withSignIn, getSingleTruck);
router.put("/edit-truck/:id", withSignIn, editTruck);
router.delete("/delete/:id", withSignIn, deleteSingleTruck);

module.exports = router;
