const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/postControllers");

const router = require("express").Router();

router.post("/createpost", createPost);

//READ
router.get("/getFeedPosts", getFeedPosts);
router.get("/getUserPosts/:id", getUserPosts);

//UPDATE
router.patch("/likePost", likePost);

module.exports = router;
