const mongoose = require('mongoose');

const ColaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  canciones: [{
    cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' },
    orden: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cola', ColaSchema);
