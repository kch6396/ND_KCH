import "./css/mainPage.css";
import axios from "axios";

import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";

export default function mainPage() {
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
    // <div className="main">
    <>
      {/* <Header /> */}
      <Section />
      {/*</div> */}
    </>
  );
}
