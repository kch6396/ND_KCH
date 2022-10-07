import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";
import "./Login.css";

const Activate = ({ verify }) => {
  let navigate = useNavigate();
  const match = useParams();
  const [verified, setVerified] = useState(false);

  function verify_account() {
    const uid = match.uid;
    const token = match.token;
    verify(uid, token);
    setVerified(true);
  }

  // if (verified) {
  //   return navigate("/");
  // }

  useEffect(() => {
    if (verified) {
      return navigate("/");
    }
  }, [verified, navigate]);

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
