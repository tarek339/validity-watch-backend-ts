import { Schema, model } from "mongoose";

const propertySchema = new Schema({
  drivers: {
    type: Number,
    default: 0,
  },
  trucks: {
    type: Number,
    default: 0,
  },
  trailers: {
    type: Number,
    default: 0,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});
const propertyModel = model("Property", propertySchema);
module.exports = propertyModel;
