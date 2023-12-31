const Driver = require("../../model/driverModel");
import { NextFunction, Request, Response } from "express";
import { socket } from "../../socket";

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
      companyId: req.body.id,
      firstName: req.body.firstName.replace(/\s+/g, ""),
      lastName: req.body.lastName.replace(/\s+/g, ""),
      phoneNumber: req.body.phoneNumber.replace(/\s+/g, ""),
      street: req.body.street.replace(/\s+/g, ""),
      houseNumber: req.body.houseNumber,
      zipCode: req.body.zipCode,
      city: req.body.city.replace(/\s+/g, ""),
      birthday: req.body.birthday,
      birthPlace: req.body.birthPlace.replace(/\s+/g, ""),
      licenceNumber: req.body.licenceNumber.replace(/\s+/g, ""),
      licenceTyp: req.body.licenceTyp,
      licenceTypExpire: req.body.licenceTypExpire,
      codeNumber: req.body.codeNumber,
      codeNumberExpire: req.body.codeNumberExpire,
      driverCardNumber: req.body.driverCardNumber.replace(/\s+/g, ""),
      driverCardNumberExpire: req.body.driverCardNumberExpire,
    });

    await driver.save();
    const drivers = await Driver.find({ companyId: req.body.companyId });
    socket?.emit("DRIVERS", drivers);

    res.json({
      message: "Driver successfully created",
      driver: {
        _id: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        phoneNumber: driver.phoneNumber,
        street: driver.street,
        houseNumber: driver.houseNumber,
        zipCode: driver.zipCode,
        city: driver.city,
        birthday: driver.birthday,
        birthPlace: driver.birthPlace,
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
    const drivers = await Driver.find({ companyId: req.body.companyId });
    socket?.emit("DRIVERS", drivers);
    res.json({
      message: "Driver deleted",
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
    message: "All driver deleted",
    driver,
  });
};

const editDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const driver = await Driver.findById(req.params.id);

    (driver.firstName = req.body.firstName.replace(/\s+/g, "")),
      (driver.lastName = req.body.lastName.replace(/\s+/g, "")),
      (driver.phoneNumber = req.body.phoneNumber),
      (driver.street = req.body.street).replace(/\s+/g, ""),
      (driver.houseNumber = req.body.houseNumber),
      (driver.zipCode = req.body.zipCode),
      (driver.city = req.body.city).replace(/\s+/g, ""),
      (driver.birthday = req.body.birthday),
      (driver.birthPlace = req.body.birthPlace).replace(/\s+/g, ""),
      (driver.licenceNumber = req.body.licenceNumber.replace(/\s+/g, "")),
      (driver.licenceTyp = req.body.licenceTyp),
      (driver.licenceTypExpire = req.body.licenceTypExpire),
      (driver.codeNumber = req.body.codeNumber),
      (driver.codeNumberExpire = req.body.codeNumberExpire),
      (driver.driverCardNumber = req.body.driverCardNumber.replace(/\s+/g, "")),
      (driver.driverCardNumberExpire = req.body.driverCardNumberExpire);

    await driver.save();

    const drivers = await Driver.find({ companyId: req.body.companyId });
    socket?.emit("DRIVERS", drivers);

    res.json({
      message: "Driver data changed",
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
  getSingleDriver,
  deleteAllDrivers,
  deleteSingleDriver,
  editDriver,
};
