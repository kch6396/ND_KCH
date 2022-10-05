import "./App.css";

import Chart from "./components/Chart";
import Upload from "./components/Upload";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Process from "./components/Process";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="main">
      <Header />
      <Section />
      <Footer />
    </div>
  );
}
export default App;
