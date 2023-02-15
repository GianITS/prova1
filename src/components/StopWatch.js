import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function StopWatch(props) {
  const time = props.time.split(":");
  const [seconds, setSeconds] = useState(parseInt(time[2]));
  const [minutes, setMinutes] = useState(parseInt(time[1]));
  const [hours, setHours] = useState(parseInt(time[0]));
  const [isRunning, setisRunning] = useState(false);
  var timer;
  useEffect(() => {
    if (isRunning === true){
      timer = setInterval(() => {
        setSeconds(seconds+1);
        if (seconds === 59){
          setMinutes(minutes+1);
          setSeconds(0);
        }
        if (minutes === 60){
          setHours(hours+1);
          setMinutes(0);
          setSeconds(0);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  });

  const start = () => {
    setisRunning(true);
  };

  const saveTimer = () => {
    const taskid = props.id;
    const data = { taskid, seconds, minutes, hours };
    // console.log(data)
    fetch("/tasks/saveTimer/", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const pause = () => {
    clearInterval(timer);
    setisRunning(false);
    saveTimer();
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <h3 className="d-flex align-items-center justify-content-center mb-0 me-3">
        <span>{hours<10? "0"+hours:hours}</span>:<span>{minutes<10? "0"+minutes:minutes}</span>:<span>{seconds<10? "0"+seconds:seconds}</span>
      </h3>
      {isRunning ? (
        <a onClick={pause} className="btn btn-warning">
          <PauseIcon />
        </a>
      ) : (
        <a onClick={start} className="btn btn-success">
          <PlayArrowIcon />
        </a>
      )}
    </div>
  );
}
