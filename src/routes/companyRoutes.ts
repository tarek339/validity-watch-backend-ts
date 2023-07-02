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
  deleteAcc,
  getCompanyProperties,
} = require("../controller/company/companyController");
const withSignIn = require("../middlewares/withSignIn");
const companyFormValidation = require("../controller/company/companyFormValidation");

const router = express.Router();

router.post("/sign-up", companyFormValidation, signUp);
router.post("/sign-in", signIn);
router.post("/verify-account", verifyAccount);
router.post("/forgot-password-email", sendForgotPasswordEmail);
router.post("/verify-password", withSignIn, verifyPassword);

router.get("/profile", withSignIn, getProfile);
router.get("/properties", withSignIn, getCompanyProperties);

router.put("/edit-profile", withSignIn, editProfile);
router.put("/edit-email", withSignIn, editEmail);
router.put("/change-password", withSignIn, changePassword);
router.put("/forgot-password-handler", forgotPasswordHandler);

router.delete("/delete-acc", withSignIn, deleteAcc);

module.exports = router;
