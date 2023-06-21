const Company = require("../../model/companyModel");
import { NextFunction, Request, Response } from "express";

interface ErrorMessage {
  message: string;
}

interface Error {
  errors: Record<any, ErrorMessage>;
  message: string;
}

const mongooseErrorHandler = (error: Error) => {
  var errorMessage = null;
  if (error.errors) errorMessage = Object.values(error.errors)[0].message;
  return errorMessage || error.message;
};

const companyFormValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const NameExists = await Company.findOne({
      compName: req.body.compName,
    });
    if (NameExists) {
      return res.status(422).json({
        message: "Company name allready exists!",
      });
    }

    const emailExist = await Company.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(422).json({
        message: "E-mail allready exists",
      });
    }

    const licenceNumExists = await Company.findOne({
      licenceNum: req.body.licenceNum,
    });
    if (licenceNumExists) {
      return res.status(422).json({
        message: "Social Licence allready exists!",
      });
    }

    next();
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = companyFormValidation;
