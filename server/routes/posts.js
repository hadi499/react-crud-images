const router = require("express").Router();
const multer = require("multer");
const Posts = require("../models/Posts");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//create post
router.post("/", upload.single("articleImage"), async (req, res) => {
  const newPost = new Posts({
    title: req.body.title,
    article: req.body.article,
    authorname: req.body.authorname,
    articleImage: req.file.originalname,
  });
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all post
router.get("/", async (req, res) => {
  const getPosts = await Posts.find();
  try {
    res.status(200).json(getPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  const getPost = await Posts.findById(req.params.id);
  try {
    res.status(200).json(getPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const post = await Posts.findById(req.params.id);
  try {
    post.delete();
    res.status(200).json("delete sucsess");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", upload.single("articleImage"), async (req, res) => {
  await Posts.findById(req.params.id)
    .then((post) => {
      post.title = req.body.title;
      post.article = req.body.article;
      post.authorname = req.body.authorname;
      post.articleImage = req.file.originalname;
      post
        .save()
        .then(() => res.json("updated is sucsess"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
