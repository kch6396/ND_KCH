import React, { PureComponent } from "react";
import styles from "./chart.module.css";
import "./chart.css";
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
  "#8BCBFE",
  "#6EB7FD",
  "#3F97FC",
  "#2E75D8",
  "#1F57B5",
  "#143D92",
  // "#0C2A78",
];

export const data1 = [
  // {
  //   name: "Origin",
  //   Performance: 95,
  // },
  {
    name: "Origin",
    Performance: 94,
  },
  {
    name: "A",
    Performance: 93,
  },
  {
    name: "B",
    Performance: 96,
  },
  {
    name: "C",
    Performance: 95.5,
  },
  {
    name: "D",
    Performance: 90,
  },
  {
    name: "E",
    Performance: 50,
  },
];

export default class Performance extends PureComponent {
  render() {
    return (
      <div className={styles.one}>
        <h1 className={styles.title}>Performance 비교</h1>
        {/* <ResponsiveContainer width="100%" height={200}> */}
        <ResponsiveContainer
          width="100%"
          height="75%"
          className={styles.chartsize}
        >
          <BarChart
            width={500}
            height={300}
            data={data1}
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
                backgroundColor: "#D8F1FE",
                border: "3px solid #8BCBFE",
                borderRadius: "5px",
              }}
            /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Performance"
              background={{ fill: "#eee" }}
              label={{ position: "insideTop", fill: "white" }}
            >
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.unit}>단위:Performance(%)</div>
      </div>
    );
  }
}
