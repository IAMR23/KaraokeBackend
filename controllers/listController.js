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
      return res.status(200).json({ mensaje: "La canción ya está en la lista", list });
    }
  } catch (error) {
    console.error("Error en addSong:", error);
    return res.status(500).json({ error: "Error al agregar la canción" });
  }
} , 

    async removeSong(req, res) {
      const {songId}  = req.body;
      const userId = req.user.id ; 
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
  };
}

module.exports = createListController;
