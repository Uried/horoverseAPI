const blogController = require("../Controllers/blogController");

// Initialiser express router
const router = require("express").Router();

router.get("/:_id", blogController.getBlog);
router.get("/", blogController.getBlogs);
router.post("/", blogController.addBlog);
//router.put("/:jId", blogController.updateUser);

module.exports = router;
