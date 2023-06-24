import { Schema, model } from "mongoose";

const truckSchema = new Schema({
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
    required: [true, "Kennzeichen eingeben"],
    set: (value: string) => {
      return value.toUpperCase();
    },
  },

  name: {
    type: String,
    required: [true, "Fahrzeugmarke eingeben"],
    validate: {
      validator: (value: string) => {
        if (value.length < 3) return false;
        if (
          value.match(/[&\/\\#,+()$~%.'":*?<>{}]/g) ||
          value.match(/^\d*(\.\d+)?$/)
        )
          return false;
        else return true;
      },
      message: "Name aus min. 3 Buchstaben",
    },
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  type: {
    type: String,
    required: [true, "Fahrzeugtyp eingeben"],
    validate: {
      validator: (value: string) => {
        if (value.length < 3) return false;
        if (
          value.match(/[&\/\\#,+()$~%.'":*?<>{}]/g) ||
          value.match(/^\d*(\.\d+)?$/)
        )
          return false;
        else return true;
      },
      message: "Typ aus min. 3 Buchstaben",
    },
    set: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  weight: {
    type: Number,
    required: [true, "Gesamtgewicht Fahrzeug eingeben"],
  },

  nextHU: {
    type: Date,
    required: [true, "HU-Termin eingeben"],
  },

  nextSP: {
    type: Date,
    required: [true, "SP-Termin eingeben"],
  },
});

const truckModel = model("Truck", truckSchema);

module.exports = truckModel;
