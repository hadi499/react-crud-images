import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
