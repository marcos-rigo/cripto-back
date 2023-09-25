const Country = require("../models/Country");

const addCountry = async (req, res) => {
  try {
    const { name } = req.body;

    const newCountry = new Country({ name });
    await newCountry.save();
    res.status(200).json({ message: "Se agregó el nuevo país con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message || "Algo falló en los controladores de países",
    });
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(201).json({ countries });
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message || "Algo falló en los controladores de paises",
    });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.body;
    const countryRemoved = await Country.findByIdAndDelete(id);
    if (!countryRemoved) {
      throw new CustomError("No existe el país", 404);
    }
    res.status(201).json({ message: "País borrado con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message: error.message || "Algo falló en los controladores de países",
    });
  }
};

module.exports = { addCountry, getCountries, deleteCountry };
