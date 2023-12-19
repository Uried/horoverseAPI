const userController = require("../Controllers/userController");

// Initialiser express router
const router = require("express").Router();

router.get("/:jId", userController.getUser);
router.post("/", userController.addUser);
//router.post("/login", usersController.login);

module.exports = router;
