import { Schema, model } from "mongoose";

const driverSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },

  firstName: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  lastName: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  phoneNumber: {
    type: String,
  },

  street: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  houseNumber: {
    type: Number,
  },

  zipCode: {
    type: Number,
  },

  city: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  birthday: {
    type: Date,
  },

  birthPlace: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  licenceNumber: {
    type: String,
    set: (value: string) => {
      return value.toUpperCase();
    },
  },

  licenceTyp: {
    type: String,
  },

  licenceTypExpire: {
    type: Date,
  },

  codeNumber: {
    type: String,
  },

  codeNumberExpire: {
    type: Date,
  },

  driverCardNumber: {
    type: String,
    set: (value: string) => {
      return value.toUpperCase();
    },
  },

  driverCardNumberExpire: {
    type: Date,
  },
});

const driverModel = model("Driver", driverSchema);

module.exports = driverModel;
