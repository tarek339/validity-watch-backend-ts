import express from "express";
const {
  signUptrailer,
  getSingletrailer,
  deleteSingletrailer,
  edittrailer,
} = require("../controller/trailer/trailerController");
const trailerFormValidation = require("../controller/trailer/trailerFormValidation");
const withSignIn = require("../middlewares/withSignIn");
const router = express.Router();

router.post("/sign-up", withSignIn, trailerFormValidation, signUptrailer);
router.get("/trailer/:id", getSingletrailer);
router.put("/edit-trailer/:id", withSignIn, edittrailer);
router.delete("/delete/:id", deleteSingletrailer);

module.exports = router;
