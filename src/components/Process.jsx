import chain from "../chain.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./css/process.module.css";
import useFetch from "../hocs/useFetch";
import { checkAuthenticated } from "../actions/auth";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import TaskChoise from "./TaskChoice";

export default function Process() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  var [state, setState] = useState("");
  const [number, setNumber] = useState(0);
  const number_ref = useRef(0);

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
          `http://192.168.123.2:6600/api/testing/jwt/verify/`,
          body,
          config
        );
        console.log("Process_check", res);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("else");
      window.location.replace("/");
    }
  };

  useEffect(() => {
    check();
    const loop = setInterval(() => {
      if (number_ref.current < 96) {
        number_ref.current += Math.round(Math.random() * (4 - 0) + 0);
        setNumber(number_ref.current);
        setShow(false);
      } else if (
        number_ref.current === 99 &&
        number_ref.current !== 98 &&
        number_ref.current !== 97 &&
        number_ref.current !== 96
      ) {
        number_ref.current += 1;
      } else if (
        number_ref.current !== 99 &&
        number_ref.current === 98 &&
        number_ref.current !== 97 &&
        number_ref.current !== 96
      ) {
        number_ref.current += 2;
      } else if (
        number_ref.current !== 99 &&
        number_ref.current !== 98 &&
        number_ref.current === 97 &&
        number_ref.current !== 96
      ) {
        number_ref.current += 3;
      } else if (
        number_ref.current !== 99 &&
        number_ref.current !== 98 &&
        number_ref.current !== 97 &&
        number_ref.current === 96
      ) {
        number_ref.current += 4;
      } else if (number_ref.current === 100) {
        number_ref.current = 100;
        clearInterval(loop);
        setShow(true);
      }
    }, 400);
  }, []);
  const taskcheck = useParams().id;
  const userId = localStorage.getItem("id");
  const tasks = useFetch(
    `http://192.168.123.2:6600/api/TaskAdmin/${taskcheck}`
  );
  const compressTasks = useFetch(
    `http://192.168.123.2:6600/api/CompressAdmin/${taskcheck}`
  );
  const task_name = tasks.taskname;
  const formData = new FormData();
  formData.append("Taskname", task_name);
  formData.append("state", "Process");
  console.log(task_name);
  useEffect(() => {
    if (location.pathname.indexOf("Creation") !== -1) {
      setState("modelCreation");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        axios
          .put(`http://192.168.123.2:6600/api/TaskAdmin/${taskcheck}`, {
            config,
            state: "Process",
            //taskname: `${task_name}`,
            // userId: `${userId}`,
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else if (location.pathname.indexOf("Compress") !== -1) {
      setState("modelCompress");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        axios
          .put(`http://192.168.123.2:6600/api/CompressAdmin/${taskcheck}`, {
            config,
            state: "Process",
            //taskname: `${task_name}`,
            // userId: `${userId}`,
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <div className={styles.processing}>
      <div className={styles.task}>
        <h2
          style={{
            width: "100%;",
            fontSize: "20px",
            paddingLeft: "10px",
            padding: "17px 20px",
            // color: "white",
            color: "#49277f",
            // backgroundColor: "#D3D3D3",
            backgroundColor: "#e9e9e9",
            fontWeight: "bold",
            cursor: "default",
            marginBottom: "0px",
          }}
          className={styles.tasktitle}
        >
          {state === "modelCreation" && <div>{tasks.taskname}</div>}
          {state === "modelCompress" && <div>{compressTasks.taskname}</div>}
        </h2>
        <TaskChoise />
      </div>
      <div className={styles.process}>
        {!show && <img src={chain} className={styles.App_logo} alt="chain" />}
        {!show && (
          <div
            style={{
              textAlign: "center",
              fontSize: "30px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            모델 생성 중 입니다...
          </div>
        )}
        {!show && (
          <ProgressBar
            className={styles.bar}
            now={number}
            label={`${number}%`}
            max="100"
          />
        )}
        {show && state === "modelCreation" && (
          <Link
            to={`/${state}/task/${tasks.id}/chart`}
            style={{
              textDecoration: "none",
              margin: "auto",
              width: "180px",
            }}
          >
            <button className={styles.process__btn} id="process__btn">
              결과 확인
            </button>
          </Link>
        )}
        {show && state === "modelCompress" && (
          <Link
            to={`/${state}/task/${compressTasks.id}/chart`}
            style={{
              textDecoration: "none",
              margin: "auto",
              width: "180px",
            }}
          >
            <button className={styles.process__btn} id="process__btn">
              결과 확인
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
