const Blog = require('../Models/Blog')

exports.addBlog = async (req, res) => {
  try {
    const { title, content, image, date} = req.body;

    const newBlog = new Blog({
      title: title,
      content: content,
      image: image,
      date: date,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Création réussie",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du blog.",
    });
    console.log(error.message);
  }
};

exports.getBlogs = (req, res) => {
  Blog.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Blogs",
        count: result.length,
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.getBlog = async (req, res) => {
  try {
    const { _id } = req.params;

    const blog = await Blog.findOne({ _id }); // Recherche par le champ jId

    if (!blog) {
      throw Error("blog non trouvé");
    }

    const { title, content,image, date } = blog;

    res.status(200).json({
      title: title,
      content: content,
      image: image,
      date: date,
      message: "OK",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
