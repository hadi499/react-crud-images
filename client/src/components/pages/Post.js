import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [article, setArticle] = useState([]);

  const deleteArticle = async (id) => {
    await axios.delete(`/posts/${id}`);
    setArticle(article.filter((elem) => elem._id !== id));
    window.location.replace("/");
  };
  return (
    <div className="container m-4 ">
      <div className="card" style={{ width: "30rem" }}>
        <img
          src={`/uploads/${post.articleImage}`}
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.article}</p>
          <p className="card-text">{post.authorname}</p>
          <button
            onClick={() => deleteArticle(post._id)}
            className="badge  bg-danger"
          >
            delete
          </button>
          <Link to={`/update/${post._id}`}>
            <button className="badge bg-warning ms-3">edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
