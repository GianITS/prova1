import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EmpDetail() {
  const { taskid } = useParams();
  const [data, datachange] = useState({});
  useEffect(() => {
    fetch("/tasks/" + taskid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        datachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div className="card">
        <div className="card-title">
          {data && (
            <div>
              <h1>
                <b>{data.title}</b> - id_{data.id}
              </h1>
              <div className="card-body" style={{ textAlign: "left" }}>
                <h2>Task Details</h2>
                <h3>Description: {data.content}</h3>
                <h3>Tags: {data.tags}</h3>
                <Link to="/" className="btn btn-danger divBtnRight">
                  Back
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
