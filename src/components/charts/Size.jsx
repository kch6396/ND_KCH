import React, { PureComponent } from "react";
import styles from "./chart.module.css";
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

const barColors = [
  "#97EB88",
  "#6DD866",
  "#39BF3D",
  "#29A438",
  "#1C8933",
  "#126E2D",
  // "#0A5B29",
];

export const data3 = [
  // {
  //   name: "Origin",
  //   Performance: 15,
  // },
  {
    name: "Origin",
    Performance: 13,
  },
  {
    name: "A",
    Performance: 9,
  },
  {
    name: "B",
    Performance: 15,
  },
  {
    name: "C",
    Performance: 11,
  },
  {
    name: "D",
    Performance: 8.5,
  },
  {
    name: "E",
    Performance: 7,
  },
];

export default class Size extends PureComponent {
  render() {
    return (
      <div className={styles.one}>
        <h1 className={styles.title}>Size(파일크기) 비교</h1>
        {/* <ResponsiveContainer width="100%" height={200}> */}
        <ResponsiveContainer
          width="100%"
          height="75%"
          className={styles.chartsize}
        >
          <BarChart
            width={500}
            height={300}
            data={data3}
            margin={{
              top: 5,
              right: 30,
            }}
            barSize={35}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 40, right: 40 }}
            />
            <YAxis />
            {/* <Tooltip
              contentStyle={{
                backgroundColor: "#E3FBD8",
                border: "3px solid #C3F8B2",
                borderRadius: "5px",
              }}
            /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Performance"
              // fill="#8884d8"
              background={{ fill: "#eee" }}
              label={{ position: "insideTop", fill: "white" }}
            >
              {data3.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.unit}>단위:MB</div>
      </div>
    );
  }
}
