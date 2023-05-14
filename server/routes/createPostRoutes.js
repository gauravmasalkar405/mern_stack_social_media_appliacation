const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  makeComment,
} = require("../controllers/postControllers");

const multer = require("multer");

const router = require("express").Router();

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/createpost", upload.single("postPic"), createPost);

router.post("/getfeedposts", getFeedPosts);
router.post("/getuserposts", getUserPosts);

//UPDATE
router.patch("/likepost/:id", likePost);

//delete post
router.post("/deletepost", deletePost);

// make comment
router.post("/makecomment", makeComment);

module.exports = router;
