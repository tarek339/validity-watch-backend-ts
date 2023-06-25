import express from "express";
const {
  signUptrailer,
  getAlltrailers,
  getSingletrailer,
  deleteSingletrailer,
  edittrailer,
} = require("../controller/trailer/trailerController");
const trailerFormValidation = require("../controller/trailer/trailerFormValidation");

const router = express.Router();

router.post("/sign-up", trailerFormValidation, signUptrailer);
router.get("/trailers", getAlltrailers);
router.get("/trailer/:id", getSingletrailer);
router.put("/edit-trailer/:id", edittrailer);
router.delete("/delete/:id", deleteSingletrailer);

module.exports = router;
