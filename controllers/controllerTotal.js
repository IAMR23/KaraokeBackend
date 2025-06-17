// controllers/listController.js
function createListController(Model) {
  return {
    async addSong(req, res) {
      const { userId, songId } = req.body;
      let list = await Model.findOne({ user: userId });
      if (!list) list = new Model({ user: userId, canciones: [] });

      if (!list.canciones.includes(songId)) {
        list.canciones.push(songId);
      }

      await list.save();
      res.status(200).json(list);
    },

    async removeSong(req, res) {
      const { userId, songId } = req.body;
      const list = await Model.findOne({ user: userId });
      if (!list) return res.status(404).json({ message: "Lista no encontrada" });

      list.canciones = list.canciones.filter(id => id.toString() !== songId);
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
