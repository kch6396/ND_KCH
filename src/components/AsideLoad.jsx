import Aside from "./Aside";
import Upload from "./Upload";
import Footer from "./Footer";

import "./css/AsideLoad.css";
import Navbar from "../navbar/Navbar";

export default function AsideLoad() {
  return (
    <div className="Asideupload">
      <Aside />
      <Upload />
    </div>
  );
}
