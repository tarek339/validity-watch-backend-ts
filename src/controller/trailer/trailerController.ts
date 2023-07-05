const Trailer = require("../../model/trailerModel");
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

const getSingletrailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trailer = await Trailer.findById(req.params.id);
    res.json(trailer);
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const signUptrailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trailer = new Trailer({
      companyId: req.body.id,
      indicator: req.body.indicator.replace(/\s+/g, ""),
      name: req.body.name.replace(/\s+/g, ""),
      type: req.body.type.replace(/\s+/g, ""),
      weight: req.body.weight,
      nextHU: req.body.nextHU,
      nextSP: req.body.nextSP,
    });

    await trailer.save();

    res.json({
      message: "trailer successfully added",
      trailer: {
        _id: trailer._id,
        indicator: trailer.indicator,
        name: trailer.name,
        type: trailer.type,
        weight: trailer.weight,
        nextHU: trailer.nextHU,
        nextSP: trailer.nextSP,
      },
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const deleteSingletrailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Trailer.findByIdAndDelete(req.params.id);
    const trailer = await Trailer.find();

    res.json({
      message: "trailer deleted",
      trailer,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

const deleteAlltrailers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Trailer.deleteMany();
  const trailer = await Trailer.find();
  res.json({
    message: "All trailers deleted",
    trailer,
  });
};

const edittrailer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trailer = await Trailer.findById(req.params.id);

    (trailer.indicator = req.body.indicator.replace(/\s+/g, "")),
      (trailer.name = req.body.name.replace(/\s+/g, "")),
      (trailer.type = req.body.type.replace(/\s+/g, "")),
      (trailer.weight = req.body.weight),
      (trailer.nextHU = req.body.nextHU),
      (trailer.nextSP = req.body.nextSP),
      await trailer.save();
    const trailers = await Trailer.find({ companyId: req.body.companyId });
    socket?.emit("TRAILERS", trailers);
    res.json({
      message: "trailer successfully edited",
      trailer,
    });
  } catch (err) {
    res.status(422).json({
      message: mongooseErrorHandler(err as Error),
    });
  }
};

module.exports = {
  signUptrailer,
  getSingletrailer,
  deleteAlltrailers,
  deleteSingletrailer,
  edittrailer,
};
