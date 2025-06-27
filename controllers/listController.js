const Playlist = require("../models/Playlist");

// controllers/listController.js
function createListController(Model) {
  return {
    async addSong(req, res) {
      try {
        const { songId } = req.body;
        const userId = req.user.id;

        if (!songId) {
          return res.status(400).json({ error: "Falta el ID de la canción" });
        }

        let list = await Model.findOne({ user: userId });

        if (!list) {
          list = new Model({ user: userId, canciones: [] });
        }

        // Asegura que 'canciones' sea un array
        list.canciones = list.canciones || [];

        // Verifica si ya existe la canción (conversión segura a string)
        const yaExiste = list.canciones.some(
          (id) => id.toString() === songId.toString()
        );

        if (!yaExiste) {
          list.canciones.push(songId);
          await list.save();
          return res.status(200).json({ mensaje: "Canción agregada", list });
        } else {
          return res
            .status(200)
            .json({ mensaje: "La canción ya está en la lista", list });
        }
      } catch (error) {
        console.error("Error en addSong:", error);
        return res.status(500).json({ error: "Error al agregar la canción" });
      }
    },

    async removeSong(req, res) {
      const { songId } = req.body;
      const userId = req.user.id;
      const list = await Model.findOne({ user: userId });
      if (!list)
        return res.status(404).json({ message: "Lista no encontrada" });

      list.canciones = list.canciones.filter((id) => id.toString() !== songId);
      await list.save();
      res.status(200).json(list);
    },

    async getList(req, res) {
      const userId = req.params.userId;
      const list = await Model.findOne({ user: userId }).populate("canciones");
      res.status(200).json(list || { canciones: [] });
    },

    async clearList(req, res) {
      const userId = req.params.userId;
      const list = await Model.findOne({ user: userId });
      if (list) {
        list.canciones = [];
        await list.save();
      }
      res.status(200).json({ message: "Lista vaciada" });
    },

    //Estos son los del playlist 

    async createPlaylist(req, res) {
      const { nombre } = req.body;
      const userId = req.user.id;
      console.log(nombre);

      if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
      }

      try {
        const existe = await Playlist.findOne({ user: userId, nombre });
        if (existe) {
          return res
            .status(400)
            .json({ error: "Ya existe una playlist con ese nombre" });
        }

        const nueva = new Playlist({ user: userId, nombre, canciones: [] });
        await nueva.save();
        res.status(201).json(nueva);
      } catch (err) {
        console.error("Error en createPlaylist:", err); // 👈 añade esto
        res.status(500).json({ error: "Error al crear la playlist" });
      }
    },

    async getUserPlaylists(req, res) {
    const userId = req.params.userId || req.user.id;

    try {
      const playlists = await Playlist.find({ user: userId }).populate("canciones");
      res.status(200).json(playlists);
    } catch (error) {
      console.error("Error al obtener las playlists del usuario:", error);
      res.status(500).json({ error: "Error al obtener las playlists" });
    }
  },

   async getCancionesDePlaylist(req, res) {
    const { playlistId } = req.params;

    try {
      const playlist = await Playlist.findById(playlistId).populate("canciones");

      if (!playlist) {
        return res.status(404).json({ error: "Playlist no encontrada" });
      }

      res.status(200).json({ canciones: playlist.canciones });
    } catch (error) {
      console.error("Error al obtener canciones del playlist:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }, 
   async addCancionAPlaylist(req, res) {
    const { playlistId } = req.params;
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "Falta el ID de la canción" });
    }

    try {
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: "Playlist no encontrada" });
      }

      // Verificar si la canción ya existe en el playlist
      const yaExiste = playlist.canciones.some(
        (id) => id.toString() === songId.toString()
      );

      if (yaExiste) {
        return res.status(200).json({ mensaje: "La canción ya está en el playlist", playlist });
      }

      playlist.canciones.push(songId);
      await playlist.save();

      res.status(200).json({ mensaje: "Canción agregada", playlist });
    } catch (error) {
      console.error("Error al agregar canción al playlist:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  },
  };
}

module.exports = createListController;
