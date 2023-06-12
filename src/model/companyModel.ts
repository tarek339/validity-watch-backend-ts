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
    required: [true, "Password is required"],
  },

  confirmPassword: {
    type: String,
    required: [true, "Confirm password name is required"],
  },

  street: {
    type: String,
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  houseNumber: {
    type: Number,
    required: [true, "House number is required"],
  },

  zipCode: {
    type: Number,
    required: [true, "Zip code is required"],
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
