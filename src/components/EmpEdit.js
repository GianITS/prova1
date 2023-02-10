import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EmpEdit() {
  const { taskid } = useParams();
  // const [empdata, empdatachange] = useState({});
  useEffect(() => {
    fetch("/tasks/edit/" + taskid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        idchange(resp.id);
        titlechange(resp.title);
        contentchange(resp.content);
        tagschange(resp.tags);
        completedchange(resp.completed);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [id, idchange] = useState("");
  const[title,titlechange]=useState("");
  const[content,contentchange]=useState("");
  const[tags,tagschange]=useState("");
  const[completed,completedchange]=useState(true);
  const[validationTitle,valtitlechange]=useState(false);
  const[validationContent,valcontentchange]=useState(false);
  const[validationTags,valtagschange]=useState(false);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const data = { id, title, content, tags, completed };
    // console.log(data)
    fetch("/tasks/edit/"+taskid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card">
              <div className="card-title">
                <h2>Tasks Edit</h2>
              </div>
              <div className="card-body" style={{ textAlign: "left" }}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        value={title}
                        required
                        onMouseDown={(e) => valtitlechange(true)}
                        onChange={(e) => titlechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {title.length == 0 && validationTitle && (
                        <span className="text-danger">Enter the title</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        value={content}
                        required
                        onMouseDown={(e) => valcontentchange(true)}
                        onChange={(e) => contentchange(e.target.value)}
                        className="form-control"
                      ></input>
                      {content.length == 0 && validationContent && (
                        <span className="text-danger">Enter the description</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Tags</label>
                      <input
                        value={tags}
                        required
                        onMouseDown={(e) => valtagschange(true)}
                        onChange={(e) => tagschange(e.target.value)}
                        className="form-control"
                      ></input>
                      {tags.length == 0 && validationTags && (
                        <span className="text-danger">
                          Enter the tags
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={completed}
                        onChange={(e) => completedchange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is completed</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
