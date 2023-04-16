const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
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

//READ
router.get("/getFeedPosts", getFeedPosts);
router.get("/getUserPosts/:id", getUserPosts);

//UPDATE
router.patch("/likePost", likePost);

module.exports = router;
