import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../features/authSlice";
import { getFeedPosts, getUserPosts } from "../../routes/postRoutes";
import PostWidget from "./PostWidget";
import axios from "axios";

const AllPostsWidget = ({ user, isProfile = false }) => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);

  const getAllFeedPosts = async () => {
    try {
      const response = await axios.post(getFeedPosts);
      if (response.data.status) {
        dispatch(setPosts({ posts: response.data.post }));
        setIsDataFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this will also and only store user posts in redux store
  const getAllUserPosts = async () => {
    const { _id } = user;
    try {
      const response = await axios.post(getUserPosts, {
        userId: _id,
      });
      if (response.data.status) {
        dispatch(setPosts({ posts: response.data.post }));
        setIsDataFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if we are on profile page then we are going to access only user posts
  useEffect(() => {
    if (isProfile) {
      getAllUserPosts();
    } else {
      getAllFeedPosts();
    }
  }, []);

  return (
    isDataFetched && (
      <>
        {posts.map(
          ({
            _id,
            userId,
            username,
            userProfilePic,
            postPicPath,
            location,
            likes,
            description,
            comments,
          }) => (
            <PostWidget
              key={_id}
              _id={_id}
              userId={userId}
              username={username}
              userProfilePic={userProfilePic}
              postPicPath={postPicPath}
              location={location}
              likes={likes}
              description={description}
              comments={comments}
            />
          )
        )}
      </>
    )
  );
};

export default AllPostsWidget;
