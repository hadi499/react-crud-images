import React, { useState, useEffect } from "react";
import axios from "axios";

function EditPost(props) {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const changeOnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("article", article);
    formData.append("authorname", authorname);
    formData.append("articleImage", fileName);
    axios
      .put(`/posts/${props.match.params.id}`, formData)
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
    window.location.replace("/");
  };
  useEffect(() => {
    axios
      .get(`/posts/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setArticle(res.data.article),
        setAuthorname(res.data.authorname),
        setFileName(res.data.articleImage),
      ])
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <h3>Update Article</h3>
            <form onSubmit={changeOnClick} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="authorname" className="form-label">
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorname"
                  value={authorname}
                  className="form-control"
                  id="authorname"
                  onChange={(e) => setAuthorname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="article" className="form-label">
                  Article
                </label>
                <textarea
                  className="form-control"
                  value={article}
                  id="article"
                  name="article"
                  onChange={(e) => setArticle(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  filename="articleImage"
                  className="form-control"
                  id="file"
                  onChange={onChangeFile}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
