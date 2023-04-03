import useFetch from "../hocs/useFetch";
import React, { useState, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./css/TaskChoice.module.css";

export default function TaskChoise() {
  const TaskBtn = useRef();
  const SelectBtn = useRef();
  const [id, setId] = useState(`${localStorage.getItem("id")}`);
  const taskcheck = useParams().id;
  const navigate = useNavigate();
  const [onSelect, setOnSelect] = useState(false);
  const [hoverValue, setHoverValue] = useState();
  const location = useLocation();
  let creTasks = useFetch(`http://192.168.123.2:6600/api/Task/${id}`);
  let creTaskName = useFetch(
    `http://192.168.123.2:6600/api/TaskAdmin/${taskcheck}`
  );
  let comTasks = useFetch(`http://192.168.123.2:6600/api/Compress/${id}`);
  let comTaskName = useFetch(
    `http://192.168.123.2:6600/api/CompressAdmin/${taskcheck}`
  );

  var state = "";
  if (location.pathname.indexOf("Creation") !== -1) {
    state = "modelCreation";
  } else if (location.pathname.indexOf("Compress") !== -1) {
    state = "modelCompress";
  }

  const LinkTask = (e) => {
    if (state === "modelCreation") {
      navigate(`/modelCreation/task/${e.currentTarget.value}`);
    } else if (state === "modelCompress") {
      navigate(`/modelCompress/task/${e.currentTarget.value}`);
    }
  };
  const selectClick = () => {
    setOnSelect(!onSelect);
    if (onSelect) {
      TaskBtn.current.style.transform = "rotate(0deg)";
      SelectBtn.current.style.outline = "none";
      SelectBtn.current.style.color = "#bebebe";
    } else {
      TaskBtn.current.style.transform = "rotate(-180deg)";
      SelectBtn.current.style.outline = "2px solid #49277f";
      SelectBtn.current.style.color = "#49277f";
    }
  };
  const HoverTask = (e) => {
    setHoverValue(e.currentTarget.value);
  };
  const unHoverTask = (e) => {
    setHoverValue("");
  };
  return (
    <div className={styles.selectWrapper}>
      <button
        type="button"
        onClick={selectClick}
        className={styles.selectBtn}
        ref={SelectBtn}
      >
        Move Task
        <span
          ref={TaskBtn}
          className="material-symbols-outlined"
          style={{
            color: "#333",
            transition: "all 0.3s",
            fontSize: "28px",
          }}
        >
          arrow_drop_down
        </span>
      </button>
      {onSelect && (
        <div className={styles.optionWrapper}>
          <ul className={styles.taskUl}>
            {state === "modelCreation" &&
              creTasks.map(
                (task) =>
                  task.taskname !== creTaskName.taskname && (
                    <li key={task.id}>
                      <button
                        onMouseEnter={HoverTask}
                        onMouseLeave={unHoverTask}
                        className={styles.targetTask}
                        onClick={LinkTask}
                        value={task.id + "/" + task.state}
                      >
                        <div
                          className={styles.state}
                          style={{
                            transition: "all 0.1s",
                            backgroundColor:
                              hoverValue === task.id + "/" + task.state
                                ? "#49277f"
                                : "#bebebe",
                          }}
                        >
                          {task.state}
                        </div>
                        <div
                          style={{
                            transition: "all 0.1s",
                            color:
                              hoverValue === task.id + "/" + task.state
                                ? "#49277f"
                                : "#bebebe",
                          }}
                          className={styles.taskName}
                        >
                          {task.taskname}
                        </div>
                      </button>
                    </li>
                  )
              )}
            {state === "modelCompress" &&
              comTasks.map(
                (task) =>
                  task.taskname !== comTaskName.taskname && (
                    <li key={task.id}>
                      <button
                        onMouseEnter={HoverTask}
                        onMouseLeave={unHoverTask}
                        className={styles.targetTask}
                        onClick={LinkTask}
                        value={task.id + "/" + task.state}
                      >
                        <div
                          className={styles.state}
                          style={{
                            transition: "all 0.1s",
                            backgroundColor:
                              hoverValue === task.id + "/" + task.state
                                ? "#49277f"
                                : "#bebebe",
                          }}
                        >
                          {task.state}
                        </div>
                        <div
                          style={{
                            transition: "all 0.1s",
                            color:
                              hoverValue === task.id + "/" + task.state
                                ? "#49277f"
                                : "#bebebe",
                          }}
                          className={styles.taskName}
                        >
                          {task.taskname}
                        </div>
                      </button>
                    </li>
                  )
              )}
          </ul>
        </div>
      )}
    </div>
  );
}
