const mongoose = require('mongoose');

const FavoritaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  cancion: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' }
}, { timestamps: true });

module.exports = mongoose.model('Favorita', FavoritaSchema);
