import "./css/mainPage.css";
import axios from "axios";
import Section from "./Section";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const mainPage = ({ logout }) => {
  const check = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ token: localStorage.getItem("access") });
      try {
        const res = await axios.post(
          `http://112.221.126.139:10000/api/testing/jwt/verify/`,
          body,
          config
        );
        console.log("Process_check", res);
      } catch (err) {
        console.log(err);
        logout();
        // window.location.replace("/login");
      }
    } else {
      console.log("else");
      logout();
      // window.location.replace("/login");
    }
  };
  check();

  return (
    <>
      <Section />
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(mainPage);
