const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    nombre: String,
    descripcion: String,
    duracion_dias: Number,
    precio_usd: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", PlanSchema);
