const Cancion = require("../models/Cancion");

const crearCancion = async (req, res) => {
  try {
    const { titulo, artista, generos, videoUrl } = req.body;
    const nuevaCancion = new Cancion({ titulo, artista, generos, videoUrl });
    await nuevaCancion.save();
    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.find().populate("generos");
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCancion = async (req, res) => {
  try {
    const cancion = await Cancion.findById(req.params.id).populate("generos");
    if (!cancion) return res.status(404).json({ error: "Canción no encontrada" });
    res.json(cancion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarCancion = async (req, res) => {
  try {
    const { titulo, artista, generos, videoUrl } = req.body;
    const cancionActualizada = await Cancion.findByIdAndUpdate(
      req.params.id,
      { titulo, artista, generos, videoUrl },
      { new: true }
    );
    if (!cancionActualizada) return res.status(404).json({ error: "Canción no encontrada" });
    res.json(cancionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarCancion = async (req, res) => {
  try {
    const cancionEliminada = await Cancion.findByIdAndDelete(req.params.id);
    if (!cancionEliminada) return res.status(404).json({ error: "Canción no encontrada" });
    res.json({ message: "Canción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filtrarCanciones = async (req, res) => {
  try {
    const { titulo, artista, genero, ordenFecha } = req.query;

    const filtro = {};

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: "i" }; // búsqueda parcial, sin importar mayúsculas
    }

    if (artista) {
      filtro.artista = { $regex: artista, $options: "i" };
    }

    if (genero) {
      filtro.generos = genero; // espera el _id del género
    }

    const canciones = await Cancion.find(filtro)
      .populate("generos")
      .sort({ createdAt: ordenFecha === "asc" ? 1 : -1 });

    res.status(200).json({ canciones });
  } catch (error) {
    res.status(500).json({ message: "Error al filtrar canciones", error });
  }
};


module.exports = {
  crearCancion,
  listarCanciones,
  obtenerCancion,
  actualizarCancion,
  eliminarCancion,
  filtrarCanciones
};
