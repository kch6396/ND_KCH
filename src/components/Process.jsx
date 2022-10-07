import chain from "../chain.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import styles from "./css/process.module.css";
import "./css/process.css";

import { checkAuthenticated } from "../actions/auth";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Login from "./../containers/Login";

const now = 53;

const testData = [{ bgcolor: "#6a1b9a", completed: 60 }];

export default function Process() {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   axios
  //     // .get("https://jsonplaceholder.typicode.com/posts")
  //     .get("")
  //     .then((res) => {
  //       console.log(res);
  //       setPosts(res.data);
  //       var keys = Object.keys(res.data);
  //       console.log(keys);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   console.log(posts.findIndex);
  // });

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
      window.location.replace("/login");
    }
  };

  useEffect(() => {
    check();
    const loop = setInterval(() => {
      if (number_ref.current < 96) {
        number_ref.current += Math.round(Math.random() * (4 - 0) + 0);
        setNumber(number_ref.current);
        setShow(false);
      }
      // number_ref.current += 1;
      // setNumber(number_ref.current);
      // console.log("number", number);
      // console.log(number_ref.current);
      else if (
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
    }, 4000);
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
            // bgcolor={testData.bgcolor}
          />
        )}
        {show && (
          <Link to="/chart">
            <button className={styles.process__btn} id="process__btn">
              결과 확인
            </button>
          </Link>
        )}
      </div>
      {/* {show && (
        <Link to="/chart">
          <button className={styles.process__btn} id="process__btn">
            결과 확인
          </button>
        </Link>
      )} */}
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
    </div>
  );
}
