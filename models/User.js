const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // encriptada
  rol: {
    type: String,
    enum: ['admin', 'cantante'],
    default: 'cantante'
  },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);