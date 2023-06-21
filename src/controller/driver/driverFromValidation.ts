const Driver = require("../../models/driverModel");
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

const driverFormValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const NameExists = await Driver.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    if (NameExists) {
      return res.status(422).json({
        message: "Name allready exists!",
      });
    }

    const numberExists = await Driver.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (numberExists) {
      return res.status(422).json({
        message: "Phonenumber allready exists!",
      });
    }

    const licenceNumberExists = await Driver.findOne({
      licenceNumber: req.body.licenceNumber,
    });
    if (licenceNumberExists) {
      return res.status(422).json({
        message: "Licence number allready exists!",
      });
    }

    const driverCardNumExists = await Driver.findOne({
      driverCardNum: req.body.driverCardNum,
    });
    if (driverCardNumExists) {
      return res.status(422).json({
        message: "Driver card number allready exists!",
      });
    }

    next();
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = driverFormValidation;
