const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  nombre: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  canciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' }],
  publica: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
