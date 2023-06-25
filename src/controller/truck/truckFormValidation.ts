const Truck = require("../../model/truckModel");
//Helper function for getting a valid message from mongoose
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

const truckFormValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const indicatorExists = await Truck.findOne({
      indicator: req.body.indicator,
    });
    if (indicatorExists) {
      return res.status(422).json({
        message: "Indicator allready exists!",
      });
    }

    next();
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = truckFormValidation;
