import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import "./Login.css";
import { useEffect } from "react";

const Signup = ({ signup, isAuthenticated }) => {
  let navigate = useNavigate();
  const [passwordChk, setPasswordChk] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [termError, setTermError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
    company: "",
    position: "",
    name: "",
    email: "",
  });

  const { username, password, re_password, company, position, name, email } =
    formData;

  const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  // 특수문자 1자 이상, 전체 8자 이상일것.
  const isValidPassword = password.length >= 8 && specialLetter >= 1;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onChangePChk(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPasswordChk(e.target.value === password);
  }

  const onChangePhoneNumber = (e) => {
    setTermError(false);
    setPhoneNumber(e.target.value);
  };

  function onSubmit(e) {
    e.preventDefault();
    if (passwordChk && isValidPassword === true && termError === true) {
      signup(
        username,
        password,
        re_password,
        phoneNumber,
        company,
        position,
        name,
        email
      );
      setAccountCreated(true);
    }
  }

  // if (isAuthenticated) {
  //   return navigate("/");
  // }
  // if (accountCreated) {
  //   return navigate("/login");
  // }

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
    if (isAuthenticated) {
      return navigate("/");
    }
    if (accountCreated) {
      return navigate("/login");
    }
  }, [navigate, isAuthenticated, accountCreated, phoneNumber]);

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <p>Create your Account</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Id"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            autoComplete="on"
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
          {isValidPassword === false && (
            <div style={{ color: "red" }}>
              특수문자 1자 이상, 전체 8자이상 입력
            </div>
          )}
        </div>
        <div className="form-group">
          <input
            autoComplete="on"
            type="password"
            className="form-control"
            placeholder="re_password"
            name="re_password"
            value={re_password}
            onChange={onChangePChk}
            minLength="6"
            required
          />
          {passwordChk === false && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            placeholder="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="position"
            name="position"
            value={position}
            onChange={onChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
