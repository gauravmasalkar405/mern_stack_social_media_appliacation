const Post = require("../models/postModels");
const User = require("../models/userModels");

module.exports.createPost = async (req, res, next) => {
  try {
    const { userId, description, postPicPath } = req.body;

    const user = await User.findById(userId);
    const newPost = await Post.create({
      userId,
      username: user.username,
      location: user.location,
      description,
      userProfilePic: user.profilePicPath,
      postPicPath,
      likes: {},
      comments: [],
    });

    //sending all posts to the user
    const post = await Post.find();
    return res.json({ post, status: true });
  } catch (error) {
    next(error);
    return res.status(409).json({ error: error.message });
  }
};

//READ
module.exports.getFeedPosts = async (req, res, next) => {
  try {
    const post = await Post.find();
    return res.json({ status: true, post });
  } catch (error) {
    next(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const post = await Post.find({ userId });
    return res.json({ status: true, post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    // Map has stored the those userId's which liked the post (likes is a type of map)
    const isliked = post.likes.get(userId);

    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    return res.json({ status: true, updatedPost });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error.message });
  }
};

//delete post

module.exports.deletePost = async (req, res) => {
  try {
    const { _id } = req.body;

    console.log(_id);

    const deletePost = await Post.findOneAndDelete({ _id });

    if (!deletePost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const remainingPosts = await Post.find();

    return res.json({
      status: true,
      message: "Post deleted successfully",
      posts: remainingPosts,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error.message });
  }
};

// comments
module.exports.makeComment = async (req, res) => {
  try {
    const { loggedUserName, commentText, postId } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { username: loggedUserName, text: commentText } } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { comments } = post;
    return res.json({
      status: true,
      message: "Comment added successfully",
      comments,
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error.message });
  }
};
