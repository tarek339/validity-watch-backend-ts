const Truck = require("../../model/truckModel");
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

const getAllTrucks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trucks = await Truck.find({ companyId: req.body.companyId });
    res.json(trucks);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const getSingleTruck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const truck = await Truck.findById(req.params.id);
    res.json(truck);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const signUpTruck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const truck = new Truck({
      companyId: req.body.id,
      indicator: req.body.indicator.replace(/\s+/g, ""),
      name: req.body.name.replace(/\s+/g, ""),
      type: req.body.type.replace(/\s+/g, ""),
      weight: req.body.weight,
      nextHU: req.body.nextHU,
      nextSP: req.body.nextSP,
    });

    await truck.save();

    res.json({
      message: "Truck successfully added",
      truck: {
        _id: truck._id,
        indicator: truck.indicator,
        name: truck.name,
        type: truck.type,
        weight: truck.weight,
        nextHU: truck.nextHU,
        nextSP: truck.nextSP,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const deleteSingleTruck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Truck.findByIdAndDelete(req.params.id);
    const truck = await Truck.find();

    res.json({
      message: "Truck deleted",
      truck,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const deleteAllTrucks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Truck.deleteMany();
  const truck = await Truck.find();
  res.json({
    message: "All trucks deleted",
    truck,
  });
};

const editTruck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const truck = await Truck.findById(req.params.id);

    (truck.indicator = req.body.indicator.replace(/\s+/g, "")),
      (truck.name = req.body.name.replace(/\s+/g, "")),
      (truck.type = req.body.type.replace(/\s+/g, "")),
      (truck.weight = req.body.weight),
      (truck.nextHU = req.body.nextHU),
      (truck.nextSP = req.body.nextSP),
      await truck.save();

    const trucks = await Truck.find({ companyId: req.body.companyId });
    socket?.emit("TRUCKS", trucks);

    res.json({
      message: "Truck successfully edited",
      truck,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = {
  signUpTruck,
  getAllTrucks,
  getSingleTruck,
  deleteAllTrucks,
  deleteSingleTruck,
  editTruck,
};
