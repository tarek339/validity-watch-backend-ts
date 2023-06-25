import { Schema, model } from "mongoose";

const trailerSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },

  indicator: {
    type: String,
    set: (value: string) => {
      return value.toUpperCase();
    },
  },

  name: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  type: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  weight: {
    type: Number,
  },

  nextHU: {
    type: String,
  },

  nextSP: {
    type: String,
  },
});

const trailerModel = model("Trailer", trailerSchema);

module.exports = trailerModel;
