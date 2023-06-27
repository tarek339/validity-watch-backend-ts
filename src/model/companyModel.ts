const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
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

  companyName: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  ceo: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  email: {
    type: String,
    set: (value: string) => {
      return value.toLowerCase();
    },
  },

  phoneNumber: {
    type: String,
  },

  password: {
    type: String,
  },

  confirmPassword: {
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

  communityLicence: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  emailVerificationToken: {
    type: String,
  },
});

const companyModel = model("Company", companySchema);

module.exports = companyModel;
