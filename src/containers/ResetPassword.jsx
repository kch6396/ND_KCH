import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import { useEffect } from "react";

const ResetPassword = ({ reset_password }) => {
  let navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  }

  // if (requestSent) {
  //   return navigate("/");
  // }

  useEffect(() => {
    if (requestSent) {
      return navigate("/");
    }
  }, [requestSent, navigate]);

  return (
    <div className="container mt-5">
      <h1>Request Password Reset:</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
