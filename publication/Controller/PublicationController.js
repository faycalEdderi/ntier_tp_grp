const Publication = require("../Models/Publication");
const cache = require("../service/cache");

const createPublication = async (req, res) => {
  try {
    const publication = new Publication({
      ...req.body,
      userId: req.user.id,
    });

    await publication.save();

    res.status(201).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPublication = async (req, res) => {
  try {
    const publication = await Publication.find();
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).send({ error: "Publication not found" });
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }

    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }

    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const cachePublication = async (req, res) => {
  try {
    const cachedPublication = await cache.getCache("publication");
    if (cachedPublication) {
      return res.json(JSON.parse(cachedPublication));
    }
    const publications = await Publication.find();
    await cache.setCache("publication", JSON.stringify(publications), {
      EX: 300,
    }); // Expire après 5 min
    res.json(publications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createPublication,
  getPublication,
  getPublicationById,
  updatePublication,
  deletePublication,
  cachePublication,
};
