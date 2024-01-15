const Publication = require("../Models/Publication");

// Ajouter une publication
exports.addPublication = async (req, res) => {
  try {
    const newPublication = new Publication(req.body);
    const savedPublication = await newPublication.save();
    res.status(200).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la publication" });
  }
};

exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json(publications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des publications" });
  }
};


exports.getPublication = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const publication = await Publication.findById(publicationId);
    res.status(200).json(publication);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la publication" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const publication = await Publication.findById(publicationId);
    const comments = publication.comments;
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commentaires" });
  }
};

// Récupérer toutes les réponses d'un commentaire
exports.getResponses = async (req, res) => {
  try {
    const { publicationId, commentId } = req.params;
    const publication = await Publication.findById(publicationId);
    const comment = publication.comments.id(commentId);
    const responses = comment.responses;
    res.status(200).json(responses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des réponses" });
  }
};

// Supprimer une publication
exports.deletePublication = async (req, res) => {
  try {
    const { publicationId } = req.params;
    await Publication.findByIdAndDelete(publicationId);
    res.status(200).json({ message: "Publication supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la publication" });
  }
};

// Ajouter un commentaire à une publication
exports.addComment = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const { name, photo, content } = req.body;

    const publication = await Publication.findById(publicationId);
    publication.comments.push({ name, photo, content });
    const savedPublication = await publication.save();

    res.status(200).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
  }
};

// Supprimer un commentaire d'une publication
exports.deleteComment = async (req, res) => {
  try {
    const { publicationId, commentId } = req.params;

    const publication = await Publication.findById(publicationId);

    if (!publication) {
      return res.status(404).json({ error: "Publication introuvable" });
    }

    // Trouver l'index du commentaire dans le tableau comments
    const commentIndex = publication.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Commentaire introuvable" });
    }

    // Supprimer le commentaire du tableau comments en utilisant la méthode pull()
    publication.comments.pull(publication.comments[commentIndex]);

    const savedPublication = await publication.save();

    res.status(200).json(savedPublication);
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du commentaire" });
  }
};

// Ajouter une réponse à un commentaire
exports.addResponse = async (req, res) => {
  try {
    const { publicationId, commentId } = req.params;
    const { name, photo, content } = req.body;

    const publication = await Publication.findById(publicationId);
    const comment = publication.comments.id(commentId);
    comment.responses.push({ name, photo, content });
    const savedPublication = await publication.save();

    res.status(200).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la réponse" });
  }
};

// Supprimer une réponse d'un commentaire
exports.deleteResponse = async (req, res) => {
  try {
    const { publicationId, commentId, responseId } = req.params;

    const publication = await Publication.findById(publicationId);
    const comment = publication.comments.id(commentId);
    comment.responses.id(responseId).remove();
    const savedPublication = await publication.save();

    res.status(200).json(savedPublication);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la réponse" });
  }
};
