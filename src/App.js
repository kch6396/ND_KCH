import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Layout from "./hocs/Layout";
import Login from "./containers/Login";
import Signup from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Activate from "./containers/Activate";
import MainPage from "./components/mainPage";

import { Provider } from "react-redux";
import store from "./store";
import FindId from "./containers/FindId";

import "./components/css/mainPage.css";
import AsideLoad from "./components/AsideLoad";
import AsideProcess from "./components/AsideProcess";
import AsideChart from "./components/AsideChart";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/FindId" element={<FindId />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/activation/:uid/:token" element={<Activate />} />
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/chart" element={<AsideChart />}></Route>
            <Route path="/process" element={<AsideProcess />}></Route>
            <Route path="/Upload" element={<AsideLoad />}></Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
