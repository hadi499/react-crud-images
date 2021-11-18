import React from "react";
import Post from "./Post";
const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((p, k) => (
        <Post post={p} key={k} />
      ))}
    </div>
  );
};

export default Posts;
