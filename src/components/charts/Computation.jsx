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
  "#FFEC8A",
  "#FFE46D",
  "#FFD83D",
  "#DBB42C",
  "#B7921E",
  "#937213",
  "#7A5A0B",
];

const data = [
  {
    name: "Origin",
    Performance: 255,
  },
  {
    name: "A",
    Performance: 240,
  },
  {
    name: "B",
    Performance: 160,
  },
  {
    name: "C",
    Performance: 245,
  },
  {
    name: "D",
    Performance: 180,
  },
  {
    name: "E",
    Performance: 130,
  },
  {
    name: "F",
    Performance: 70,
  },
];

export default class Computation extends PureComponent {
  render() {
    return (
      <div className={styles.one}>
        <h1 className={styles.title}>Computation(연산량) 비교</h1>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width={500}
            height={300}
            data={data}
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
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFAD8",
                border: "3px solid #FFF4B1",
                borderRadius: "5px",
              }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Performance"
              background={{ fill: "#eee" }}
              label={{ position: "insideTop", fill: "white" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.unit}>단위:MACs(M)</div>
      </div>
    );
  }
}
