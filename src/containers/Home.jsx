import { Link } from "react-router-dom";
import "../components/css/home.css";
import Login from "./Login";
export default function Home() {
  return (
    <>
      <div className="container">
        <div className="jumbotron mt-5">
          <h1 className="display-4">Welcome to neuralDrop!</h1>
          <p className="lead">
            This is an incredible authentication system with production level
            features!
          </p>
          <hr className="my-4" />
          <p>Click the Log In button</p>
          {/* <Link className="btn btn-primary btn-lg" to="/login" role="button">
            Login
          </Link> */}
        </div>
      </div>
    </>
  );
}
