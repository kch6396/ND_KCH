import "./css/mainPage.css";
import axios from "axios";
import Section from "./Section";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import Aside from "./Aside";

const ModelCom = ({ logout }) => {
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
          `http://192.168.123.2:6600/api/testing/jwt/verify/`,
          body,
          config
        );
        console.log("Process_check", res);
      } catch (err) {
        console.log(err);
        logout();
        window.location.replace("/");
      }
    } else {
      console.log("else");
      logout();
      window.location.replace("/");
    }
  };
  check();

  return <>{<Section />}</>;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(ModelCom);
