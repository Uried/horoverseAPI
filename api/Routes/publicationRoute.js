const publicationController = require("../Controllers/publicationController");

const router = require("express").Router();

// Ajouter une publication
router.post("/", publicationController.addPublication);

// Supprimer une publication
router.delete("/:publicationId", publicationController.deletePublication);

router.get("/", publicationController.getAllPublications);
router.get(
  "/:publicationId",
  publicationController.getPublication
);

// Ajouter un commentaire à une publication
router.post("/:publicationId/comments", publicationController.addComment);

router.get("/:publicationId/comments", publicationController.getComments);

// Supprimer un commentaire d'une publication
router.delete(
  "/:publicationId/comments/:commentId",
  publicationController.deleteComment
);

// Ajouter une réponse à un commentaire
router.post(
  "/:publicationId/comments/:commentId/responses",
  publicationController.addResponse
);

router.get(
  "/:publicationId/comments/:commentId/responses",
  publicationController.getResponses
);

// Supprimer une réponse d'un commentaire
router.delete(
  "/:publicationId/comments/:commentId/responses/:responseId",
  publicationController.deleteResponse
);

module.exports = router;
