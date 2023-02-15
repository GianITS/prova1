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
        datachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card thDark text-white border border-0">
        <div className="card-title">
          {data && (
            <div>
              <h1 className="mt-4 mb-5">
                <b>{data.title}</b>
              </h1>
              <div className="card-body" style={{ textAlign: "left" }}>
                <p>Description: <b className="fs-3">{data.content}</b></p>
                <p className="my-3">Tags: <b className="fs-3">{data.tags}</b></p>
                <p>Time: <b className="fs-3">{data.timer}</b></p>
                <Link to="/" className="btn btn-danger divBtnRight mt-5">
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
