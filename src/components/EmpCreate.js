import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckBoxList from "./CheckBoxList";
import { TextField } from "@mui/material";

export default function EmpCreate() {
  const [id, idchange] = useState("");
  const [title, titlechange] = useState("");
  const [content, contentchange] = useState("");
  const [tags, tagschange] = useState("");
  const [completed, completedchange] = useState(false);
  const [validationTitle, valtitlechange] = useState(false);
  const [validationContent, valcontentchange] = useState(false);
  const [validationTags, valtagschange] = useState(false);
  const navigate = useNavigate();
  const [listCheckBox, listcheckboxchange] = useState([]);
  const [open, setOpen] = useState(false);
  const [subTask, subtaskchange] = useState("");
  const fullWidth = true;
  const maxWidth = "sm";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCheckBox = () => {
    if (subTask.length > 0){
      listcheckboxchange((oldArray) => [...oldArray, subTask]);
      setOpen(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const data = { title, content, tags, completed };
    // console.log(data)
    fetch("/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Saved succesfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <form className="container" onSubmit={handlesubmit}>
        <div className="card thDark text-white border border-0">
          <div className="card-title">
            <h2 className="mt-4 mb-5">Tasks Create</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="mb-1">Title</label>
                  <input
                    value={title}
                    required
                    onMouseDown={(e) => valtitlechange(true)}
                    onChange={(e) => titlechange(e.target.value)}
                    className="form-control mb-3"
                  ></input>
                  {title.length === 0 && validationTitle && (
                    <span className="text-danger">Enter the title</span>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="mb-1">Description</label>
                  <input
                    value={content}
                    required
                    onMouseDown={(e) => valcontentchange(true)}
                    onChange={(e) => contentchange(e.target.value)}
                    className="form-control mb-3"
                  ></input>
                  {content.length === 0 && validationContent && (
                    <span className="text-danger">Enter the content</span>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="mb-1">Tags</label>
                  <input
                    value={tags}
                    required
                    onMouseDown={(e) => valtagschange(true)}
                    onChange={(e) => tagschange(e.target.value)}
                    className="form-control mb-4"
                  ></input>
                  {tags.length === 0 && validationTags && (
                    <span className="text-danger">Enter the tags</span>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <button
                  type="button"
                  className="btn btn-outline-success divBtnRight"
                  onClick={handleClickOpen}
                >
                  Add CheckBox
                </button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    className="thDark text-white"
                  >
                    {"Insert Sub Task"}
                  </DialogTitle>
                  <DialogContent className="thDark">
                    <TextField
                      required
                      autoFocus
                      margin="normal"
                      id="standard-basic"
                      label="SubTask"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => subtaskchange(e.target.value)}
                      color='info'
                      sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                    />
                  </DialogContent>
                  <DialogActions className="thDark pt-2 p-3 thDark">
                    <Button
                      className="border border-info text-info link"
                      onClick={handleClose}
                    >
                      Exit
                    </Button>
                    <Button
                      className="border border-info text-info link"
                      onClick={() => {
                        addCheckBox();
                      }}
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                {listCheckBox &&
                  listCheckBox.map((item, index) => (
                    <CheckBoxList name={item} key={index} />
                  ))}
              </div>
              <div className="col-lg-12">
                <div className="form-group divBtnRight">
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
  );
}
