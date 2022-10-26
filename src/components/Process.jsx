import chain from "../chain.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./css/process.module.css";
import useFetch from "../hocs/useFetch";
import { checkAuthenticated } from "../actions/auth";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Process() {
  const [show, setShow] = useState(false);

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
          `http://112.221.126.139:10000/api/testing/jwt/verify/`,
          body,
          config
        );
        console.log("Process_check", res);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("else");
      // window.location.replace("/login");
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
    }, 6000);
  }, []);
  const taskcheck = useParams().id;
  const userId = localStorage.getItem("id");
  const tasks = useFetch(
    `http://112.221.126.139:10000/api/Testing/${userId}/${taskcheck}`
  );
  const task_name = tasks.Taskname;
  const formData = new FormData();
  formData.append("Taskname", task_name);
  formData.append("state", "Process");
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      axios
        .put(
          `http://112.221.126.139:10000/api/Testing/${userId}/${taskcheck}`,
          {
            config,
            state: "Process",
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={styles.processing}>
      <div className={styles.process}>
        {!show && <img src={chain} className={styles.App_logo} alt="chain" />}
        {!show && (
          <ProgressBar
            className={styles.bar}
            now={number}
            label={`${number}%`}
            max="100"
          />
        )}
        {show && (
          <Link to={`/task/${tasks.id}/chart`}>
            <button className={styles.process__btn} id="process__btn">
              결과 확인
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
