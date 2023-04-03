import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./css/Compress.module.css";
import useFetch from "../hocs/useFetch";
import axios from "axios";
import $, { error } from "jquery";
import TaskChoise from "./TaskChoice";
const Compress = () => {
  const location = useLocation();
  const [filesArr, setFilesArr] = useState([]);
  const [hide, setHide] = useState(true);
  const [senddisable, setSenddisable] = useState(false);
  const [deldisable, setDeldisable] = useState(true);
  const [rundisable, setRundisable] = useState(false);
  var [state, setState] = useState("");
  const taskcheck = useParams().id;

  const tasks = useFetch(
    `http://192.168.123.2:6600/api/CompressAdmin/${taskcheck}`
  );
  useEffect(() => {
    if (location.pathname.indexOf("Creation") !== -1) {
      setState("modelCreation");
    } else if (location.pathname.indexOf("Compress") !== -1) {
      setState("modelCompress");
    }
  }, []);
  const onChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      console.log(e.target.files[i]);
      var reader = new FileReader();
      reader.onload = (e) => {
        setFilesArr((filesArr) => [...filesArr, file]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  const delFile = (num, e) => {
    console.log(num);
    setFilesArr(filesArr.filter((value, index) => index !== num));
  };
  console.log(tasks.taskname);
  const formData = new FormData();
  const [complete, setComplete] = useState(false);
  const [val, setVal] = useState("0");
  const upload = (e) => {
    e.preventDefault();
    axios
      .delete(`http://192.168.123.2:6600/api/FileCompressing/${taskcheck}`, {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (senddisable === true) {
      filesArr.forEach((file) => {
        formData.append("File", file);
        formData.append("taskId", taskcheck);

        const config = {
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            // if (percentCompleted !== 100 || percentCompleted > 0) {
            //   $(".xprogressbar").show();
            //   $(".resetbtn").show();
            //   $(".label").show();
            //   $("#ok__btn").attr("disabled", true);
            // }
            setVal(percentCompleted);
            console.log(percentCompleted);
            // progress.setAttribute("value", percentCompleted);
            // progress.previousElementSibling.textContent = `${percentCompleted}%`;
            if (percentCompleted === 100) {
              // setVal(`Upload complete!`);
              // $("#ok__btn").attr("disabled", false);
              // $(".resetbtn").remove();
            }
          },

          // cancelToken: source.token,
        };

        // axios({
        //   method: "POST",
        //   url: `http://192.168.123.2:6600/api/FileCompressing/${taskcheck}`,
        //   data: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // })
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        axios
          .post(
            `http://192.168.123.2:6600/api/FileCompressing/${taskcheck}`,
            formData,
            config,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  const sendBtn = () => {
    if (filesArr.length === 0) {
      setSenddisable(false);
      alert("파일을 첨부해주세요.");
    } else {
      setSenddisable(true);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={upload}>
        <div className={styles.task}>
          <h2
            style={{
              width: "100%;",
              fontSize: "20px",
              paddingLeft: "10px",
              padding: "17px 20px",
              // color: "white",
              color: "#49277f",
              // backgroundColor: "#D3D3D3",
              backgroundColor: "#e9e9e9",
              fontWeight: "bold",
              cursor: "default",
              marginBottom: "0px",
            }}
            className={styles.taskname}
          >
            {tasks.taskname}
          </h2>
          <TaskChoise />
        </div>
        <div className={styles.notice}>
          ※ 파일을 업로드 중 페이지를 나가시면 업로드가 중단됩니다.
        </div>
        <div className={styles.filebox}>
          <div className={styles.btns1}>
            <label htmlFor="compressFile">XFile Upload</label>
            <div className={styles.file_edit_icon1} id="file_edit_icon1"></div>
          </div>
          <input
            type="file"
            name="file"
            id="compressFile"
            className={`${styles.upload_box} ${styles.upload_plus}`}
            multiple="multiple"
            disabled=""
            onChange={onChange}
          />
          <div className={styles.files}>
            {filesArr &&
              filesArr.map((arr, index) => (
                <div
                  className={styles.filelist}
                  id={"file" + index}
                  key={index}
                >
                  <p className={styles.name}>{arr.name}</p>
                  <button
                    className={styles.del}
                    onClick={(e) => delFile(index, e)}
                    type="button"
                  >
                    <i
                      className="far fa-minus-square"
                      style={{ color: "red", cursor: "pointer" }}
                    ></i>
                  </button>
                  <label
                    htmlFor={"progress-bar" + [index]}
                    className={styles.label}
                  >
                    {val}%{/* {complete===false&&{val}%} */}
                  </label>
                  <progress
                    style={{ width: "40%", height: "25px" }}
                    id={"progres-bar" + [index]}
                    className={styles.progressbar}
                    value={val}
                    max={100}
                  ></progress>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className={styles.sendBtn}
            id="sendBtn"
            // disabled={senddisable}
            onClick={sendBtn}
          >
            SEND
          </button>
          <button
            id="resetBtn"
            className={styles.resetBtn}
            disabled={deldisable}
            hidden={hide}
          >
            CANCEL
          </button>
          {/* {`/${state}/task/${task.id}/${task.state}`} */}
          <Link to={`/${state}/task/${taskcheck}/process`}>
            <button id="okBtn" className={styles.okBtn} disabled={rundisable}>
              Running AI
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Compress;
