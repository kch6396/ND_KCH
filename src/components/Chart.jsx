import Performance from "./charts/Performance";
import Parameter from "./charts/Parameter";
import Size from "./charts/Size";
import Computation from "./charts/Computation";
import styles from "./css/allchart.module.css";
import axios from "axios";
export default function Chart() {
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
  check();
  return (
    <div className={styles.allchart}>
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
        <input type={"button"} value={"PDF"}></input>
        <input type={"button"} value={"결과"}></input>
      </div>
    </div>
  );
}
