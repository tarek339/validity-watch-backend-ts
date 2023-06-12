import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const withSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get("Authorization");
    console.log(token);
    const tokenData = jwt.verify(token, "secret123");
    req.body.companyId = tokenData.companyId;
    console.log(req.body.companyId);
    next();
  } catch (err) {
    res.status(422).json({
      message: "Please sign in!",
    });
  }
};

module.exports = withSignIn;
