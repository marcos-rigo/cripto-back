const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      default: "Usuario sin nombre",
      lowercase: true,
      trim: true,
      minLength: [2, "Debe ser de al menos dos carácteres"],
      maxLength: [30, "Debe ser como maximo treinta carácteres"],
    },
    lastname: {
      type: String,
      required: [true, "El nombre es requerido"],
      default: "Usuario sin nombre",
      lowercase: true,
      trim: true,
      minLength: [2, "Debe ser de al menos dos carácteres"],
      maxLength: [30, "Debe ser como maximo treinta carácteres"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "El email ya ha sido registrado"],
      lowercase: true,
      trim: true,
      minLength: [11, "Debe ser de al menos once carácteres"],
      maxLength: [30, "Debe ser como maximo treinta carácteres"],
    },
    age: {
      type: Number,
      required: true,
    },
    admin: {
      type: Boolean,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "La contraseña es obligatoria"],
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
