const userController = require("../Controllers/userController");

// Initialiser express router
const router = require("express").Router();

router.get("/:jId", userController.getUser);
router.get("/", userController.getUsers);
router.post("/", userController.addUser);
router.put("/:jId", userController.updateUser);

module.exports = router;
