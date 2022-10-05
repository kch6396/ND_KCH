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
  "#FF9D7E",
  "#FF785D",
  "#FF3A28",
  "#DB1D1D",
  "#B71421",
  "#930C22",
  "#7A0723",
];

const data = [
  {
    name: "Origin",
    Performance: 1.7,
  },
  {
    name: "A",
    Performance: 1.65,
  },
  {
    name: "B",
    Performance: 1.1,
  },
  {
    name: "C",
    Performance: 1.67,
  },
  {
    name: "D",
    Performance: 1.2,
  },
  {
    name: "E",
    Performance: 0.85,
  },
  {
    name: "F",
    Performance: 0.45,
  },
];

export default class Parameter extends PureComponent {
  render() {
    return (
      <div className={styles.one}>
        {/* <div> */}
        <h1 className={styles.title}>Parameter 수 비교</h1>
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
                backgroundColor: "#FFE5D3",
                border: "3px solid #FFC5A9",
                // borderColor: "#FFC5A9",
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
        <div className={styles.unit}>단위:Params(M)</div>
        {/* <h4 className="sub">기존 모델과 6가지 압축기술이 적용된 모델</h4> */}
        {/* </div> */}
      </div>
    );
  }
}
