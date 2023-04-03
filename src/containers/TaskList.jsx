import { Link, useParams, useLocation } from "react-router-dom";
import useFetch from "../hocs/useFetch";
import axios from "axios";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import "../components/css/tasklist.css";
import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";

const DayList = ({ logout }) => {
  const InputRef = useRef();
  const [taskId, setTaskId] = useState();
  const [isHover, setIsHover] = useState(false);
  const [hoverTask, setHoverTask] = useState(false);
  const [clickTask, setClickTask] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [editBtns, setEditBtns] = useState(false);
  const [disable, setDisable] = useState(false);
  const [already, setAlready] = useState();
  const location = useLocation();
  const [put, setPut] = useState(false);
  const [taskName, setTaskName] = useState();

  const location1 = useLocation();

  const [formData, setFormData] = useState({
    name: "",
  });
  var state = "";
  if (location.pathname.indexOf("Creation") !== -1) {
    state = "modelCreation";
  } else if (location.pathname.indexOf("Compress") !== -1) {
    state = "modelCompress";
  }
  const taskColor = useParams().id;
  const [id, setId] = useState(`${localStorage.getItem("id")}`);
  console.log("id", id);
  // let tasks = useFetch(`http://192.168.123.2:6600/api/Task/${id}`);
  let tasks = useFetch(`http://192.168.123.2:6600/api/Task/${id}`);
  console.log(tasks);
  let compressTasks = useFetch(`http://192.168.123.2:6600/api/Compress/${id}`);
  console.log(compressTasks);

  const check = useCallback(async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ token: localStorage.getItem("access") });
      console.log("JSON", body);
      try {
        const res = await axios.post(
          `http://192.168.123.2:6600/api/testing/jwt/verify/`,
          body,
          config
        );
        setId(`${localStorage.getItem("id")}`);

        console.log("Process_check", res);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("else");
      logout();
    }
  });
  useEffect(() => {
    check();
  }, [check]);

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const filterCreation = tasks.filter((p) => {
    return p.taskname
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase().replace(" ", ""));
  });

  const filterCompress = compressTasks.filter((p) => {
    return p.taskname
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase().replace(" ", ""));
  });

  if (state === "modelCreation") {
    if (tasks.length === 0) {
      return (
        <span className="noTask">There are no Tasks. Please create a Task</span>
      );
    }
  } else if (state === "modelCompress") {
    if (compressTasks.length === 0) {
      return (
        <span className="noTask">There are no Tasks. Please create a Task</span>
      );
    }
  }
  const date = new Date();

  const handleMouseEnter = (id, e) => {
    setIsHover(true);
    setHoverTask(id);
    setTaskId(id);

    e.preventDefault();
  };

  const handleMouseLeave = () => {
    setHoverTask();
    setTaskId();
    setIsHover(false);
  };

  const hoverTaskstyle = {
    transition: "all 0.3s",
    borderLeft:
      isHover || editBtn ? "3px solid #49277f" : "3px solid transparent",
    borderTop: "1px solid #dbdbdb",
    borderRight: "3px solid transparent",
    color: isHover || editBtn ? "#49277f" : "#bebebe",
  };
  const Taskstyle = {
    borderTop: "1px solid #dbdbdb",
    transition: "all 0.3s",
    borderLeft: "3px solid transparent",
    borderRight: "3px solid transparent",
    color: "#bebebe",
  };

  async function deleteOnClick() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    if (location.pathname.includes("/modelCreation")) {
      try {
        await axios
          .delete(`http://192.168.123.2:6600/api/TaskAdmin/${taskId}`, {
            config,
            company_id: localStorage.getItem("id"),
            id: taskId,
          })
          .then((res) => {
            window.location.replace("/modelCreation");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else if (location.pathname.includes("/modelCompress")) {
      try {
        await axios
          .delete(`http://192.168.123.2:6600/api/CompressAdmin/${taskId}`, {
            config,
            company_id: localStorage.getItem("id"),
            id: taskId,
          })
          .then((res) => {
            window.location.replace("/modelCompress");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }
  const editOnclick = (id, name, e) => {
    setPut(!put);
    setAlready(id);
    setClickTask(id);
    setEditBtn(true);
    setEditBtns(true);
    setTaskName(name);
    if (already === id) {
      InputRef.current.style.width = 0 + "px";
      InputRef.current.style.padding = 0 + "px";
      InputRef.current.style.borderLeft = "none";
      setTaskName();
      setTimeout(() => {
        setEditBtn(false);

        setClickTask();
      }, 490);
      setEditBtns(false);
      setAlready();
    } else if (already !== id) {
      setAlready(id);
      setTimeout(() => {
        InputRef.current.value = name;
        InputRef.current.style.width = 150 + "px";
        InputRef.current.style.border = "2px solid #49277f";
        InputRef.current.style.borderLeft = "none";
        InputRef.current.style.paddingLeft = 15 + "px";
        console.log(InputRef.current.style.width);
        InputRef.current.select();
      });
    }
    e.preventDefault();
  };
  const eidtCansel = (e) => {
    InputRef.current.style.width = 0 + "px";
    InputRef.current.style.padding = 0 + "px";
    InputRef.current.style.borderLeft = "none";
    setTimeout(() => {
      setEditBtn(false);
      setTaskName();
      setClickTask();
    }, 490);
    setEditBtns(false);
    setAlready();
    e.preventDefault();
  };

  // function putOnClick() {
  //   setPut(!put);
  // }

  const { name } = formData;
  function onChange1(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit1(e) {
    e.preventDefault();
  }
  function onCheckEnter(e) {
    if (e.key === "Enter") {
      edit();
    }
  }

  async function edit() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    if (location1.pathname.includes("/modelCreation")) {
      try {
        await axios
          .put(`http://192.168.123.2:6600/api/TaskAdmin/${clickTask}`, {
            config,
            taskname: name,
          })
          .then((res) => {
            window.location.replace("/modelCreation");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else if (location1.pathname.includes("/modelCompress")) {
      try {
        await axios
          .put(`http://192.168.123.2:6600/api/CompressAdmin/${clickTask}`, {
            config,
            taskname: name,
          })
          .then((res) => {
            window.location.replace("/modelCompress");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div
        style={{
          // border: "2px solid #49277f",
          width: "98.2%",
          margin: "auto",
          borderRadius: "5px",
          boxShadow: "3px 3px 10px #333",
        }}
      >
        <table
          style={{
            width: "100%",
            margin: "auto",
            fontWeight: "600",
            whiteSpace: "nowrap",
            border: "none",
            borderRadius: "5px",
            cursor: "default",
          }}
        >
          <thead
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              borderBottom: "2px solid #dbdbdb",
              color: "#49277f",
              height: "40px",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
            }}
          >
            <tr style={{}}>
              {/* <th style={{ width: "0px" }}>fds</th> */}
              {/* <th
                style={{
                  width: "1%",
                  paddingLeft: "20px",
                  verticalAlign: "middle",
                }}
              >
                number
              </th> */}
              <th
                style={{
                  width: "15%",
                  paddingLeft: "20px",
                  verticalAlign: "middle",
                }}
              >
                Task Name
              </th>
              <th
                style={{
                  width: "10%",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Created Date
              </th>
              <th
                style={{
                  width: "10%",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                State
              </th>
              <th style={{ width: "40%" }}></th>
              <th
                style={{
                  width: "4%",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Process
              </th>
              <th
                style={{
                  width: "4%",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Edit
              </th>
              <th
                style={{
                  width: "4%",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                Delete
              </th>

              <th style={{ width: "5%" }}></th>
            </tr>
          </thead>
          <tbody style={{ color: "#bebebe", fontSize: "17px" }}>
            {state === "modelCreation" &&
              filterCreation.map((task) => (
                <>
                  <tr
                    key={task.id}
                    style={
                      task.id === hoverTask || task.id === clickTask
                        ? hoverTaskstyle
                        : Taskstyle
                    }
                    // style={{borderTop:"1px solid #bebebe"}}
                  >
                    {/* {task.state === "upload" && ( */}
                    {/* <td>{task.id}</td> */}
                    <td
                      style={{
                        verticalAlign: "middle",
                        paddingLeft: "20px",
                        cursor: "default",
                        paddingRight: "10px",
                        // borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                        position: "relative",
                      }}
                    >
                      {/* <a
                      className="tasklist"
                      id={`tasklist/${task.id}`}
                      href={`/${state}/task/${task.id}/${task.state}`}
                      style={{ textDecoration: "none" }}
                    > */}
                      {Number(taskColor) !== task.id && (
                        <li
                          id={task.id}
                          style={{
                            // color: "#666",
                            fontWeight: "bold",
                            fontSize: "20px",

                            // backgroundColor: "#333",
                          }}
                        >
                          {task.taskname}
                        </li>
                      )}
                      {/* </a> */}
                      <form
                        onSubmit={onSubmit1}
                        onKeyPress={onCheckEnter}
                        style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: "0px",
                          display: "flex",
                        }}
                      >
                        {task.id === clickTask && editBtn && (
                          // <form onSubmit={onSubmit}>
                          <input
                            ref={InputRef}
                            name="name"
                            type="text"
                            onChange={(e) => {
                              onChange1(e);
                            }}
                            // onChange={onEdit}
                            className="editinput"
                            style={{
                              height: "47px",
                              fontSize: "20px",
                              width: "0px",
                              border: "2px solid #49277f",
                              borderLeft: "none",
                              color: "#333",
                              fontWeight: "600",
                              borderTopRightRadius: "3px",
                              borderBottomRightRadius: "3px",
                              transition: "all .5s",
                            }}
                          />
                        )}
                        {task.id === clickTask && editBtns && (
                          <div
                            className="btnWrapper"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: "white",
                            }}
                          >
                            <button
                              type="button"
                              className="nameEditBtn"
                              onClick={edit}
                            >
                              Edit
                            </button>
                            <button
                              className="editCancelBtn"
                              type="button"
                              onClick={(e) => {
                                eidtCansel(e);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </form>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        //color: "#333",
                        // color: "#666",
                        // fontWeight: "bold",
                        // borderTop: "1px solid #bebebe",
                        weight: "10px",
                        borderBottom: "none",
                      }}
                    >
                      <li>
                        {date.getFullYear()}-{date.getMonth() + 1}-
                        {date.getDate()} {date.getHours()}:
                        {date.getUTCMinutes()}
                      </li>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        // color: "#666",
                        // fontWeight: "bold",
                        // borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <li>{task.state}</li>
                    </td>
                    <td
                      style={{
                        // borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                        verticalAlign: "middle",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    ></td>
                    <td
                      style={{
                        textAlign: "center",
                        //borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <a
                        className="tasklist"
                        id={`tasklist/${task.id}`}
                        href={`/${state}/task/${task.id}/${task.state}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          type="button"
                          className="processBtn"
                          disabled={disable}
                          onMouseEnter={(e) => {
                            handleMouseEnter(task.id, e);
                          }}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            margin: "auto",
                            border: "2.5px solid #49277f",
                            transition: "all 0.3s",
                          }}
                        >
                          <span
                            className="material-symbols-outlined arrow"
                            style={{ margin: "4.5px 0", color: "#49277f" }}
                          >
                            play_arrow
                          </span>
                        </button>
                      </a>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        //borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <button
                        type="button"
                        className="editBtn"
                        onMouseEnter={(e) => {
                          handleMouseEnter(task.id, e);
                        }}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => {
                          editOnclick(task.id, task.taskname, e);
                        }}
                        disabled={disable}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          display: "flex",
                          margin: "auto",
                          border: "2.5px solid #49277f",
                        }}
                      >
                        <span
                          className="material-symbols-outlined edit"
                          style={{
                            FILL: "1",
                            margin: "4.5px 0",
                            color: "#49277f",
                          }}
                        >
                          drive_file_rename_outline
                        </span>
                      </button>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        //borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <button
                        type="button"
                        className="deleteBtn"
                        disabled={disable}
                        onMouseEnter={(e) => {
                          handleMouseEnter(task.id, e);
                        }}
                        onMouseLeave={handleMouseLeave}
                        onClick={deleteOnClick}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          display: "flex",
                          margin: "auto",

                          border: "2.5px solid #49277f",
                        }}
                      >
                        <span
                          className="material-symbols-outlined delete"
                          style={{ margin: "4.5px 0", color: "#49277f" }}
                        >
                          delete
                        </span>
                      </button>
                    </td>
                    <td style={{ borderBottom: "none" }}></td>
                    {/* )} */}
                  </tr>
                </>
              ))}

            {state === "modelCompress" &&
              filterCompress.map((task) => (
                <>
                  <tr
                    key={task.id}
                    style={
                      task.id === hoverTask || task.id === clickTask
                        ? hoverTaskstyle
                        : Taskstyle
                    }
                    // style={{borderTop:"1px solid #bebebe"}}
                  >
                    {/* {task.state === "upload" && ( */}
                    {/* <td>{task.id}</td> */}
                    <td
                      style={{
                        verticalAlign: "middle",
                        paddingLeft: "20px",
                        cursor: "default",
                        paddingRight: "10px",
                        // borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                        position: "relative",
                      }}
                    >
                      {/* <a
                    className="tasklist"
                    id={`tasklist/${task.id}`}
                    href={`/${state}/task/${task.id}/${task.state}`}
                    style={{ textDecoration: "none" }}
                  > */}
                      {Number(taskColor) !== task.id && (
                        <li
                          id={task.id}
                          style={{
                            // color: "#666",
                            fontWeight: "bold",
                            fontSize: "20px",

                            // backgroundColor: "#333",
                          }}
                        >
                          {task.taskname}
                        </li>
                      )}
                      {/* </a> */}
                      <form
                        onSubmit={onSubmit1}
                        onKeyPress={onCheckEnter}
                        style={{
                          position: "absolute",
                          bottom: "-1px",
                          left: "0px",
                          display: "flex",
                        }}
                      >
                        {task.id === clickTask && editBtn && (
                          // <form onSubmit={onSubmit}>
                          <input
                            ref={InputRef}
                            name="name"
                            type="text"
                            onChange={(e) => {
                              onChange1(e);
                            }}
                            // onChange={onEdit}
                            className="editinput"
                            style={{
                              height: "47px",
                              fontSize: "20px",
                              width: "0px",
                              border: "2px solid #49277f",
                              borderLeft: "none",
                              color: "#333",
                              fontWeight: "600",
                              borderTopRightRadius: "3px",
                              borderBottomRightRadius: "3px",
                              transition: "all .5s",
                            }}
                          />
                        )}
                        {task.id === clickTask && editBtns && (
                          <div
                            className="btnWrapper"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: "white",
                            }}
                          >
                            <button
                              type="button"
                              className="nameEditBtn"
                              onClick={edit}
                            >
                              Edit
                            </button>
                            <button
                              className="editCancelBtn"
                              type="button"
                              onClick={(e) => {
                                eidtCansel(e);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </form>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        //color: "#333",
                        // color: "#666",
                        // fontWeight: "bold",
                        // borderTop: "1px solid #bebebe",
                        weight: "10px",
                        borderBottom: "none",
                      }}
                    >
                      <li>
                        {date.getFullYear()}-{date.getMonth() + 1}-
                        {date.getDate()} {date.getHours()}:
                        {date.getUTCMinutes()}
                      </li>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        // color: "#666",
                        // fontWeight: "bold",
                        // borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <li>{task.state}</li>
                    </td>
                    <td
                      style={{
                        // borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                        verticalAlign: "middle",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    ></td>
                    <td
                      style={{
                        textAlign: "center",
                        //borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <a
                        className="tasklist"
                        id={`tasklist/${task.id}`}
                        href={`/${state}/task/${task.id}/${task.state}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          type="button"
                          className="processBtn"
                          disabled={disable}
                          onMouseEnter={(e) => {
                            handleMouseEnter(task.id, e);
                          }}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            margin: "auto",
                            border: "2.5px solid #49277f",
                            transition: "all 0.3s",
                          }}
                        >
                          <span
                            className="material-symbols-outlined arrow"
                            style={{ margin: "4.5px 0", color: "#49277f" }}
                          >
                            play_arrow
                          </span>
                        </button>
                      </a>
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        //borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <button
                        type="button"
                        className="editBtn"
                        onMouseEnter={(e) => {
                          handleMouseEnter(task.id, e);
                        }}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => {
                          editOnclick(task.id, task.taskname, e);
                        }}
                        disabled={disable}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          display: "flex",
                          margin: "auto",
                          border: "2.5px solid #49277f",
                        }}
                      >
                        <span
                          className="material-symbols-outlined edit"
                          style={{
                            FILL: "1",
                            margin: "4.5px 0",
                            color: "#49277f",
                          }}
                        >
                          drive_file_rename_outline
                        </span>
                      </button>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        //borderTop: "1px solid #bebebe",
                        borderBottom: "none",
                      }}
                    >
                      <button
                        type="button"
                        className="deleteBtn"
                        disabled={disable}
                        onMouseEnter={(e) => {
                          handleMouseEnter(task.id, e);
                        }}
                        onMouseLeave={handleMouseLeave}
                        onClick={deleteOnClick}
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          display: "flex",
                          margin: "auto",

                          border: "2.5px solid #49277f",
                        }}
                      >
                        <span
                          className="material-symbols-outlined delete"
                          style={{ margin: "4.5px 0", color: "#49277f" }}
                        >
                          delete
                        </span>
                      </button>
                    </td>
                    <td style={{ borderBottom: "none" }}></td>
                    {/* )} */}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>

      <ul className="list_day">
        <input
          className="search"
          type="text"
          value={search}
          onChange={onChange}
          placeholder="Search task name"
          style={{
            marginTop: "5px",
            position: "absolute",
            top: "7px",
            height: "35px",
            right: "20px",
            borderRadius: "3px",
          }}
        />
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(DayList);
