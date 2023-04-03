import { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../navbar/Navbar";
import { checkAuthenticated, load_user, refreshToken } from "../actions/auth";
import Footer from "../components/Footer";

const Layout = (props) => {
  useEffect(() => {
    props.refreshToken();
    props.checkAuthenticated();
    props.load_user();
  }, [props]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Navbar />
      {props.children}
      {/* <Footer /> */}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user, refreshToken })(
  Layout
);
