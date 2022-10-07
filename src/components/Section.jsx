import styles from "./css/section.module.scss";
import Aside from "./Aside";
import Article from "./Article";
export default function Section() {
  return (
    <section>
      <Aside />
      <Article />
    </section>
  );
}
