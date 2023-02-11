import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmpListing() {
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/tasks/edit/" + id);
  };

  const RemoveFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("/tasks/delete/"+id, {
        method: "DELETE"
      })
        .then((res) => {
          alert("Removed succesfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const LoadDetail = (id) => {
    navigate("/tasks/detail/" + id);
  };

  useEffect(() => {
    fetch("/tasks")
      .then((res) => {
        if (res.ok){
          return res.json();
        }
      })
      .then((resp) => {
        empdatachange(resp.tasks);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Tasks Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="tasks/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Titolo</td>
                <td>Description</td>
                <td>Tags</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td onClick={() => {
                      LoadDetail(item.id)
                    }} className='link'>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.tags}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          RemoveFunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
