import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../actions/auth";
import "../components/css/navbar.css";
import Timer from "../components/Timer";

const Navbar = ({ logout, isAuthenticated }) => {
  const location = useLocation();
  const [creation, setCreation] = useState(false);
  const [compress, setCompress] = useState(false);
  const [out, setOut] = useState(false);
  const [navbarset, setNavbarset] = useState();
  const [username, setUsername] = useState("");

  // const [minutes, setMinutes] = useState(10);
  // const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   const countdown = setInterval(() => {
  //     if (parseInt(seconds) > 0) {
  //       setSeconds(parseInt(seconds) - 1);
  //     }
  //     if (parseInt(seconds) === 0) {
  //       if (parseInt(minutes) === 0) {
  //         clearInterval();
  //         logout();
  //       } else {
  //         setMinutes(parseInt(minutes) - 1);
  //         setSeconds(59);
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(countdown);
  // }, [minutes, seconds]);

  // function TimerReset() {
  //   setMinutes(10);
  //   setSeconds(0);
  // }

  useEffect(() => {
    // console.log(username);
    // while (true) {
    setTimeout(() => {
      setUsername(localStorage.getItem("username"));
    }, 100);
    // setUsername(localStorage.getItem("username"));
    //   if (username !== null) {
    //     break;
    //   }
    // }
    //etUsername(localStorage.getItem("username"));

    if (location.pathname.includes("/modelCreation")) {
      setCreation(true);
      setCompress(false);
      setOut(false);
    } else if (location.pathname.includes("/modelCompress")) {
      setCompress(true);
      setCreation(false);
      setOut(false);
    } else if (location.pathname.includes("/signup")) {
      setOut(true);
      setCompress(false);
      setCreation(false);
    } else {
      setOut(false);
      setCompress(false);
      setCreation(false);
    }
  });

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item singup-li">
        {out === true && (
          <Link className="nav-link singup singup-underline" to="/signup">
            Sign Up
          </Link>
        )}
        {out === false && (
          <Link className="nav-link signup" to="/signup">
            Sign Up
          </Link>
        )}
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <>
      <div style={{ display: "flex", padding: "0 0", marginBottom: "5px" }}>
        <li className="nav-item username">{username}</li>
        <li className="nav-item logout-li">
          <Link className="nav-link logout" to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </div>
      <Timer logout={logout} />
      <div>
        <h2>
          {/* <button type="button" onClick={timer}>
            hihi
          </button> */}
          {/* {minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
        </h2>
      </div>
      <li className="nav-item model-li">
        {creation === true && (
          <Link
            // onClick={TimerReset}
            className="nav-link model creation-underline"
            to="/modelCreation"
          >
            Model Creation
          </Link>
        )}
        {creation === false && (
          <Link
            className="nav-link model"
            to="/modelCreation"
            // onClick={TimerReset}
          >
            Model Creation
          </Link>
        )}
      </li>
      <li className="nav-item model-li">
        {compress === true && (
          <Link
            // onClick={TimerReset}
            className="nav-link model compress-underline"
            to="/modelCompress"
          >
            Model Compression
          </Link>
        )}
        {compress === false && (
          <Link
            className="nav-link model"
            to="/modelCompress"
            // onClick={TimerReset}
          >
            Model Compression
          </Link>
        )}
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <div className="nav_title">NeuralDrop</div> */}
      <Link className="nav_title" to="/mainPage">
        <li> NeuralDrop</li>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {isAuthenticated ? authLinks() : guestLinks()}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
