import { Link, useParams } from "react-router-dom";
import useFetch from "../hocs/useFetch";
import axios from "axios";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import "../components/css/tasklist.css";
import { useEffect, useState } from "react";

const DayList = ({ logout }) => {
  const taskColor = useParams().id;
  const [id, setId] = useState(`${localStorage.getItem("id")}`);
  console.log("id", id);
  const tasks = useFetch(`http://112.221.126.139:10000/api/Testing/${id}`);

  const check = async () => {
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
          `http://112.221.126.139:10000/api/testing/jwt/verify/`,
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
  };

  check();

  if (tasks.length === 0) {
    return <span>Loading...</span>;
  }
  return (
    <>
      <ul className="list_day">
        {tasks.map((task) => (
          <li className="tasklists" key={task.id}>
            {/* {task.state === "upload" && ( */}
            <a
              className="tasklist"
              id={`tasklist/${task.id}`}
              href={`/task/${task.id}/${task.state}`}
              style={{ textDecoration: "none" }}
            >
              {Number(taskColor) === task.id && (
                <div
                  style={{
                    backgroundColor: "#999",
                    color: "#333",
                    fontSize: "22px",
                    // font-weight: 600
                    padding: "5px 0",
                  }}
                >
                  {task.Taskname}
                </div>
              )}
              {Number(taskColor) !== task.id && (
                <div
                  style={{
                    color: "#777",
                    fontSize: "22px",
                    padding: "5px 0",
                  }}
                >
                  {task.Taskname}
                </div>
              )}
            </a>
            {/* )} */}
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(DayList);
