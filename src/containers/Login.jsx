import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import "./Login.css";
import { useEffect } from "react";

const Login = ({ login, isAuthenticated }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    login(username, password);
  }

  useEffect(() => {
    setTimeout(() => {}, 1000);
    if (isAuthenticated) {
      return navigate("/MainPage");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="signin">
      <h1>로그인</h1>
      <div className="signin__card">
        <h2>
          <strong>Welcome!</strong> neuralDrop에 오신 것을 환영합니다.
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="아이디를 입력하세요."
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요."
            onChange={onChange}
            required
          />
          <input type="submit" value="login" />
          <p>
            * 비밀번호를 타 사이트와 같이 사용할 경우 도용 위험이 있으니,
            {<br></br>}
            정기적으로 비밀번호를 변경하세요!
          </p>
        </form>
        <div className="actions">
          <Link to="/SignUp">회원가입</Link>
          <Link to="/FindId">아이디 찾기</Link>
          <Link to="/reset-password">비밀번호 찾기</Link>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
