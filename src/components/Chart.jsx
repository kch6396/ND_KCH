import Performance, { data1 } from "./charts/Performance";
import Parameter, { data2 } from "./charts/Parameter";
import Size, { data3 } from "./charts/Size";
import Computation, { data4 } from "./charts/Computation";
import styles from "./css/allchart.module.css";
import axios from "axios";
import useFetch from "../hocs/useFetch";
import { Link, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TaskChoise from "./TaskChoice";

export default function Chart() {
  const location = useLocation();
  const taskcheck = useParams().id;
  const userId = localStorage.getItem("id");
  var [state, setState] = useState("");
  const tasks = useFetch(
    `http://192.168.123.2:6600/api/TaskAdmin/${taskcheck}`
  );
  const compressTasks = useFetch(
    `http://192.168.123.2:6600/api/CompressAdmin/${taskcheck}`
  );
  console.log(taskcheck);
  const modelval = ["A", "B", "C", "D", "E"];
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
  check();
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
            state: "Chart",
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
            state: "Chart",
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
    const modelval2 = ["a", "b", "c", "d", "e"];
    for (var i = 0; i < 6; i++) {
      // axios
      //   .delete(
      //     `http://192.168.123.2:6600/api/${modelval2[i]}/${taskcheck}`,
      //     {}
      //   )
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }

    for (var i = 0; i < 6; i++) {
      const config2 = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        axios
          .post(`http://192.168.123.2:6600/api/${modelval[i]}`, {
            config2,
            Performance: data1[i + 1].Performance,
            Parameter: data2[i + 1].Performance,
            Size: data3[i + 1].Performance,
            Computation: data4[i + 1].Performance,
            TaskId: taskcheck,
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const selectList = ["Model", "A", "B", "C", "D", "E"];
  const [Selected, setSelected] = useState("Please select a model");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  var selected = modelval.indexOf(Selected);
  console.log(selected);
  const onclickBtn = (e) => {
    if (selected === -1) {
      e.preventDefault();
      alert("모델을 선택해주세요.");
      return false;
    } else {
      axios
        .delete(`http://192.168.123.2:6600/api/result/${taskcheck}`, {})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        axios
          .post(`http://192.168.123.2:6600/api/Result`, {
            config,
            Performance: data1[selected + 1].Performance,
            Parameter: data2[selected + 1].Performance,
            Size: data3[selected + 1].Performance,
            Computation: data4[selected + 1].Performance,
            TaskId: taskcheck,
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={styles.allchart}>
      <div className={styles.task}>
        <h2
          style={{
            width: "100%",
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
      <li className={styles.theme}>기존 모델과 6가지 압축기술이 적용된 모델</li>
      <div className={styles.chart1}>
        <Performance></Performance>
        <Parameter></Parameter>
      </div>
      <div className={styles.chart2}>
        <Size></Size>
        <Computation></Computation>
      </div>
      <div className={styles.btns}>
        <button type={"button"} value={"PDF"} className="pdf">
          PDF
        </button>
        {state === "modelCreation" && (
          <Link to={`/${state}/task/${tasks.id}/result`}>
            <button
              type={"button"}
              value={"Seleted Model"}
              className="result"
              onClick={onclickBtn}
            >
              Seleted Model
            </button>
          </Link>
        )}
        {state === "modelCompress" && (
          <Link to={`/${state}/task/${compressTasks.id}/result`}>
            <button
              type={"button"}
              value={"Seleted Model"}
              className="result"
              onClick={onclickBtn}
            >
              Seleted Model
            </button>
          </Link>
        )}
        <select
          name="pets"
          id="select"
          onChange={handleSelect}
          value={Selected}
        >
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="select" className="select_label">
          Select a Model :
        </label>
      </div>
    </div>
  );
}
