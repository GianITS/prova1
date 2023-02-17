import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import StopWatch from "./StopWatch";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { blue } from '@mui/material/colors';

export default function EmpListing() {
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [itemId, idchange] = useState("");
  const [itemTitle, titlechange] = useState("");
  const [itemContent, contentchange] = useState("");
  const [itemTags, tagschange] = useState("");
  const [itemTimer, timerchange] = useState("");
  const [itemCompleted, completedchange] = useState(false);
  const fullWidth = true;
  const maxWidth = 'sm';

  // dialog per rimuovere una task
  const handleOpenRemoveDialog = () => {
    setOpenRemoveDialog(true);
  };
  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };

  // dialog per i dettagli di una task
  const handleOpenDetailDialog = (item) => {
    idchange(item.id);
    titlechange(item.title);
    contentchange("Description: " + item.content);
    tagschange("Tags: " + item.tags);
    completedchange(
      item.completed === false ? "Completed: No" : "Completed: Si"
    );
    timerchange("Time: " + item.timer);
    setOpenDetailDialog(true);
  };
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const LoadCreate = () => {
    navigate("/tasks/create");
  };

  const LoadEdit = (id) => {
    navigate("/tasks/edit/" + id);
  };

  const RemoveFunction = (id) => {
    fetch("/tasks/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        window.location.reload();
        toast.success("Removed succesfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const LoadDetail = (id) => {
    navigate("/tasks/detail/" + id);
  };

  useEffect(() => {
    fetch("/tasks")
      .then((res) => {
        if (res.ok) {
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
    <div className="container thDark text-white pt-4">
      <h1 className="mb-5">Tasks Manager</h1>
      <div className="btnCreate">
        <Fab
          color="success"
          aria-label="add"
          onClick={() => {
            LoadCreate();
          }}
        >
          <AddIcon />
        </Fab>
      </div>
      {empdata &&
        empdata.map((item) => (
          <div
            className="card text-start my-3 p-3 thDark text-white border border-info"
            key={item.id}
          >
            <div className="row d-flex flex-wrap">
              <div className="col minWidth">
                <div className="card-title maxContent">
                  <h2
                    onClick={() => {
                      handleOpenDetailDialog(item);
                    }}
                    className="link"
                  >
                    {item.title}
                  </h2>
                </div>
                <div className="card-body">
                  <div>{item.content}</div>
                  <div>{item.tags}</div>
                </div>
              </div>
              <div className="col d-flex align-items-center justify-content-end">
                <StopWatch id={item.id} time={item.timer} />
                <a
                  onClick={() => {
                    LoadEdit(item.id);
                  }}
                  className="btn btn-primary"
                >
                  <EditIcon />
                </a>
                <a
                  onClick={() => {
                    handleOpenRemoveDialog();
                  }}
                  className="btn btn-danger"
                >
                  <DeleteForeverIcon />
                </a>
              </div>
            </div>
            <Dialog
              open={openRemoveDialog}
              onClose={handleCloseRemoveDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={fullWidth}
              maxWidth={maxWidth}
            >
              <DialogTitle
                id="alert-dialog-title"
                className="thDark text-white"
              >
                {"Task Remove"}
              </DialogTitle>
              <DialogContent className="thDark">
                <DialogContentText
                  id="alert-dialog-description"
                  className="text-white"
                >
                  Sei sicuro di voler rimuovere la task?
                </DialogContentText>
              </DialogContent>
              <DialogActions className="thDark">
                <Button
                  className="border border-info text-info link"
                  onClick={handleCloseRemoveDialog}
                >
                  Exit
                </Button>
                <Button
                  className="border border-info text-info link"
                  onClick={() => {
                    RemoveFunction(item.id);
                  }}
                  autoFocus
                >
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-title" className="thLightDark text-white">
          {itemTitle}
          <IconButton
              aria-label="close"
              onClick={handleCloseDetailDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#f00",
              }}
            >
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent className="thLightDark">
          <List className="text-white">
            <ListItem disablePadding>
              <ListItemText primary={itemContent} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={itemTags} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={itemTimer} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={itemCompleted} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions className="thLightDark">
          <Button
            className="border border-info text-info link m-2"
            onClick={() => {
              LoadDetail(itemId);
            }}
          >
            More details
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
