import express from "express";
const {
  signUp,
  verifyAccount,
  getProfile,
  signIn,
  editProfile,
  editEmail,
  verifyPassword,
  changePassword,
  sendForgotPasswordEmail,
  forgotPasswordHandler,
} = require("../controller/companyController");
const withSignIn = require("../middlewares/withSignIn");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify-account", verifyAccount);
router.get("/profile", withSignIn, getProfile);
router.put("/edit-profile", withSignIn, editProfile);
router.put("/edit-email", withSignIn, editEmail);
router.post("/verify-password", withSignIn, verifyPassword);
router.put("/change-password", withSignIn, changePassword);
router.post("/forgot-password-email", sendForgotPasswordEmail);
router.put("/forgot-password-handler", forgotPasswordHandler);

module.exports = router;
