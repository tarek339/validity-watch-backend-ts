import express from "express";
const {
  signUp,
  verifyAccount,
  getProfile,
  signIn,
  editProfile,
} = require("../controller/companyController");
const withSignIn = require("../middlewares/withSignIn");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify-account", verifyAccount);
router.get("/profile", withSignIn, getProfile);
router.put("/edit-profile", withSignIn, editProfile);

module.exports = router;
