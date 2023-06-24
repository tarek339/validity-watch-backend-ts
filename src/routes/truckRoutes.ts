import express from "express";
const {
  signUpTruck,
  getSingleTruck,
  editTruck,
  deleteSingleTruck,
  deleteAllTrucks,
} = require("../controller/truck/truckController");

const router = express.Router();

router.post("/sign-up", signUpTruck);
router.get("/:id", getSingleTruck);
router.put("/edit/:id", editTruck);
router.delete("/delete/:id", deleteSingleTruck);
router.delete("/", deleteAllTrucks);

module.exports = router;
