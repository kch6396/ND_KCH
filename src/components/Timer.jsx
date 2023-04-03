import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { refreshToken } from "../actions/auth";
import { connect } from "react-redux";
import styles from "../components/css/Timer.module.css";

const Timer = (props) => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  // var [loc, setLoc] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMinutes(10);
    setSeconds(0);
  }, [pathname]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          props.logout();
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);
  function TimerReset() {
    setMinutes(10);
    setSeconds(0);
    props.refreshToken();
  }

  return (
    <div style={{ marginBottom: "50px", display: "flex", marginLeft: "5px" }}>
      <h2
        style={{
          width: "40px",
          fontSize: "16px",
          marginBottom: "0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          lineHeight: "29px",
        }}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h2>
      <button type="button" onClick={TimerReset} className={styles.btn}>
        Login Extension
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { refreshToken })(Timer);
