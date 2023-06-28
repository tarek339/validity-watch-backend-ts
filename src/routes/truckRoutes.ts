import express from "express";
const {
  signUpTruck,
  getSingleTruck,
  editTruck,
  deleteSingleTruck,
  getAllTrucks,
} = require("../controller/truck/truckController");
const truckFormValidation = require("../controller/truck/truckFormValidation");
const withSignIn = require("../middlewares/withSignIn");
const router = express.Router();

router.post("/sign-up", truckFormValidation, signUpTruck);
router.get("/trucks", withSignIn, getAllTrucks);
router.get("/truck/:id", getSingleTruck);
router.put("/edit-truck/:id", editTruck);
router.delete("/delete/:id", deleteSingleTruck);

module.exports = router;
