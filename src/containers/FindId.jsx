import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Find_Id } from "../actions/auth";

const FindId = ({ Find_Id }) => {
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

    Find_Id(email);
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
      <h1>Request Id Reset:</h1>
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
          Reset Id
        </button>
      </form>
    </div>
  );
};

export default connect(null, { Find_Id })(FindId);
