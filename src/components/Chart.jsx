import Performance from "./charts/Performance";
import Parameter from "./charts/Parameter";
import Size from "./charts/Size";
import Computation from "./charts/Computation";
import styles from "./allchart.module.css";
export default function Chart() {
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
