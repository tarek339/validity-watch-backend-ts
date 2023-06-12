import express from "express";
const {
  signUp,
  verifyAccount,
  getProfile,
  signIn,
} = require("../controller/companyController");
const withSignIn = require("../middlewares/withSignIn");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify-account", verifyAccount);
router.get("/profile", withSignIn, getProfile);

module.exports = router;
