import React, { PureComponent } from "react";
import styles from "./chart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

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
        {/* <div> */}
        <h1 className={styles.title}>Computation(연산량) 비교</h1>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              // left: 20,
              // bottom: 5,
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
                // borderColor: "#FFF4B1",
                borderRadius: "5px",
              }}
            />
            {/* <Legend
              payload={data.map((item, index) => ({
                id: item.name,
                type: "square",
                value: `Performance(%)`,
                color: "#3F97FC",
              }))}
            /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Performance"
              // fill="#8884d8"
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
        {/* <h4 className="sub">기존 모델과 6가지 압축기술이 적용된 모델</h4> */}
        {/* </div> */}
      </div>
    );
  }
}