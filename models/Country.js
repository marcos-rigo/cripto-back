const { Schema, model } = require("mongoose");

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      default: "País desconocido",
      trim: true,
      minLength: [2, "Debe ser de al menos dos carácteres"],
      maxLength: [30, "Debe ser como maximo treinta carácteres"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Country", CountrySchema);
