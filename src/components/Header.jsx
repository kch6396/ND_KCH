import styles from "./css/header.module.scss";
import logo from "../onlylogo.png";

export default function Header() {
  return (
    <header>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.title}>
            <h1>NeuralDrop</h1>
            <div className={styles.user_name}>
              <div className={styles.name}>USER_NAME</div>
              <div className={styles.logout}>
                <a href="#">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#" id="underline">
                Home
              </a>
            </li>
            <li>
              <a href="#">Personal Information</a>
            </li>
            <li>
              <a href="#">History Inquiry</a>
            </li>
            <li>
              <a href="#">Model Introduction</a>
            </li>
            <li>
              <a href="#">How to use</a>
            </li>
            <li>
              <a href="#">Price</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
