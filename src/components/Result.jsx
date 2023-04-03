import React, { useEffect, useState } from "react";
import useFetch from "../hocs/useFetch";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/result.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import TaskChoise from "./TaskChoice";

export default function Result() {
  const location = useLocation();
  var [state, setState] = useState("");
  const taskcheck = useParams().id;
  const tasks = useFetch(
    `http://192.168.123.2:6600/api/TaskAdmin/${taskcheck}`
  );
  const compressTasks = useFetch(
    `http://192.168.123.2:6600/api/CompressAdmin/${taskcheck}`
  );
  const model = useFetch(`http://192.168.123.2:6600/api/result/${taskcheck}`);
  var performance = 0;
  var param = 0;
  var size = 0;
  var comput = 0;
  useEffect(() => {
    if (location.pathname.indexOf("Creation") !== -1) {
      setState("modelCreation");
    } else if (location.pathname.indexOf("Compress") !== -1) {
      setState("modelCompress");
    }
  }, []);
  for (const key in Object.values(model)) {
    performance = model[key].Performance;
    param = model[key].Parameter;
    size = model[key].Size;
    comput = model[key].Computation;
  }
  const data = [
    {
      name: "Performance",
      Performance: parseFloat(performance),
    },
    {
      name: "Parameter",
      Performance: parseFloat(param),
    },
    {
      name: "Size",
      Performance: parseFloat(size),
    },
    {
      name: "Computation",
      Performance: parseFloat(comput),
    },
  ];
  const barColors = ["#49277f", "#49277f", "#49277f", "#49277f"];

  return (
    <div className="result_wrapper">
      <div className="task">
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
          className="tasktitle"
        >
          {state === "modelCreation" && <div>{tasks.taskname}</div>}
          {state === "modelCompress" && <div>{compressTasks.taskname}</div>}
        </h2>
        <TaskChoise />
      </div>
      <div className="resultPage">
        <div className="resultchart">
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={70}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 150, right: 150 }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#999999",
                  border: "3px solid #333333",
                  borderRadius: "5px",
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="Performance"
                background={{ fill: "#eee" }}
                label={{ position: "top", fill: "#333" }}
                // barSize={20}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="btnplace">
          <button className="down">Download</button>
          <Link to={`/${state}/task/${taskcheck}/chart`}>
            <button className="prev">Previous</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
