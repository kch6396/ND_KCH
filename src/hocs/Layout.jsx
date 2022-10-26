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
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default connect(null, { checkAuthenticated, load_user, refreshToken })(
  Layout
);
