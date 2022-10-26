import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import "../components/css/navbar.css";
const Navbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <li className="nav-item">
      {/* <a className="nav-link" href="/login" onClick={logout}>
        Logout
      </a> */}
      <Link className="nav-link" to="/login" onClick={logout}>
        Logout
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <div className="nav_title">NeuralDrop</div> */}
      <Link className="nav_title" to="/mainPage">
        NeuralDrop
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
