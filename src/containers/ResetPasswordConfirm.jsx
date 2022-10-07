import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  let navigate = useNavigate();
  const match = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    const uid = match.uid;
    const token = match.token;
    console.log(uid, token, match);

    reset_password_confirm(uid, token, new_password, re_new_password);
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
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            name="new_password"
            value={new_password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            name="re_new_password"
            value={re_new_password}
            onChange={onChange}
            minLength="6"
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
