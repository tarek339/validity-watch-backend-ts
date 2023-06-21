const Driver = require("../../model/driverModel");
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

const getAllDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const getCompanyDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drivers = await Driver.find({
      companyId: req.params.companyId,
    });
    res.json(drivers);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const getSingleDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.json(driver);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const driver = new Driver({
      companyId: req.body.companyId,
      firstName: req.body.firstName.replace(/\s+/g, ""),
      lastName: req.body.lastName.replace(/\s+/g, ""),
      phoneNumber: req.body.phoneNumber.replace(/\s+/g, ""),
      licenceNumber: req.body.licenceNumber.replace(/\s+/g, ""),
      licenceTyp: req.body.licenceTyp,
      licenceTypExpire: req.body.licenceTypExpire,
      codeNumber: req.body.codeNumber.replace(/\s+/g, ""),
      codeNumberExpire: req.body.codeNumberExpire,
      driverCardNum: req.body.driverCardNum.replace(/\s+/g, ""),
      driverCardNumberExpire: req.body.driverCardNumberExpire,
    });

    await driver.save();

    res.json({
      message: "Fahrerdaten angelegt",
      driver: {
        _id: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        phoneNumber: driver.phoneNumber,
        email: driver.email,
        licenceNumber: driver.licenceNumber,
        licenceTyp: driver.licenceTyp,
        licenceTypExpire: driver.licenceTypExpire,
        codeNumber: driver.codeNumber,
        codeNumberExpire: driver.codeNumberExpire,
        driverCardNum: driver.driverCardNum,
        driverCardNumberExpire: driver.driverCardNumberExpire,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const deleteSingleDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    const driver = await Driver.find();

    res.json({
      message: "Fahrer wurde gelöscht",
      driver,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const deleteAllDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Driver.deleteMany();
  const driver = await Driver.find();
  res.json({
    message: "Alle Fahrer wurden gelöscht",
    driver,
  });
};

const editDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const driver = await Driver.findById(req.params.id);

    (driver.firstName = req.body.firstName.replace(/\s+/g, "")),
      (driver.lastName = req.body.lastName.replace(/\s+/g, "")),
      (driver.phoneNumber = req.body.phoneNumber),
      (driver.licenceNumber = req.body.licenceNumber.replace(/\s+/g, "")),
      (driver.licenceTyp = req.body.licenceTyp),
      (driver.licenceTypExpire = req.body.licenceTypExpire),
      (driver.codeNumber = req.body.codeNumber.replace(/\s+/g, "")),
      (driver.codeNumberExpire = req.body.codeNumberExpire),
      (driver.driverCardNum = req.body.driverCardNum.replace(/\s+/g, "")),
      (driver.driverCardNumberExpire = req.body.driverCardNumberExpire);

    await driver.save();
    res.json({
      message: "Fahrerdaten wurden geändert",
      driver,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = {
  signUp,
  getAllDrivers,
  getSingleDriver,
  deleteAllDrivers,
  deleteSingleDriver,
  editDriver,
  getCompanyDrivers,
};
