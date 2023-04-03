import React, { useState, useRef, useEffect, useNavigate } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styles from "./css/upload.module.css";
import $, { error } from "jquery";
import axios from "axios";
import "./css/upload.css";
import { connect } from "react-redux/es/exports";
import { logout } from "../actions/auth";
import useFetch from "../hocs/useFetch";
import TaskChoise from "./TaskChoice";
var xfilesArr = [];
var yfilesArr = [];
var xstate = [];
var ystate = [];
var xdel = 0;
var ydel = 0;
var xsuc = 0;
var ysuc = 0;
var xfileNo = 0;
var yfileNo = 0;
var checkcnt1 = 0;
var checkcnt2 = 0;
var k = 0;
var v = 0;
var z = 0;
var w = 0;
var m = 0;
var n = 0;
var xcomplete = 0;
var ycomplete = 0;
const xformData = new FormData();
const yformData = new FormData();
const checkboxes1 = document.getElementsByName("check1");
const checkboxes2 = document.getElementsByName("check2");
var idi = 0;
var companyid = 0;
var yfilenone = 1;
const Upload = ({ logout }) => {
  const ref = useRef();
  const location = useLocation();
  var [state, setState] = useState("");
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + `/task/${idi}`;
      window.location.reload();
    }
  };

  const taskcheck = useParams().id;
  console.log(taskcheck);
  const [id, setId] = useState(`${localStorage.getItem("id")}`);
  const tasks = useFetch(
    `http://192.168.123.2:6600/api/TaskAdmin/${taskcheck}`
  );
  const [checkBox, setCheckBox] = useState(tasks.id);

  const tId = useParams().id;
  idi = tId;
  companyid = tasks.id;

  const firstData = [
    { id: 1, name: "분류(Classification)" },
    { id: 2, name: "회귀(Regression)" },
    { id: 3, name: "예측(Prediction)" },
  ];
  const secondData = [
    { id: 1, name: "정답지 존재(Supversied)" },
    { id: 2, name: "정답지 부재(UnSupversied)" },
  ];

  useEffect(() => {
    if (location.pathname.indexOf("Creation") !== -1) {
      setState("modelCreation");
    } else if (location.pathname.indexOf("Compress") !== -1) {
      setState("modelCompress");
    }
    console.log(xcomplete, ycomplete);
    if (taskcheck !== checkBox) {
      $(".xfile-list").empty();
      $(".yfile-list").empty();
      xfilesArr = [];
      yfilesArr = [];
      xstate = [];
      ystate = [];
      xfileNo = 0;
      yfileNo = 0;
      xdel = 0;
      ydel = 0;
      xsuc = 0;
      ysuc = 0;
      checkcnt1 = 0;
      checkcnt2 = 0;
      k = 0;
      v = 0;
      z = 0;
      w = 0;
      n = 0;
      m = 0;
      xstate.length = 0;
      ystate.length = 0;
      for (let i = 0; i < checkboxes1.length; i++) {
        checkboxes1[i].checked = false;
      }
      for (let i = 0; i < checkboxes2.length; i++) {
        checkboxes2[i].checked = false;
      }
    }
  }, [taskcheck, checkBox]);

  const check = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ token: localStorage.getItem("access") });
      console.log("JSON", body);
      try {
        const res = await axios.post(
          `http://192.168.123.2:6600/api/testing/jwt/verify/`,
          body,
          config
        );

        console.log("Process_check", res);
      } catch (err) {
        console.log(err);
        logout();
      }
    } else {
      console.log(error);
      logout();
    }
  };
  check();
  const [isChecked1, setisChecked1] = useState(false);
  const [isChecked2, setisChecked2] = useState(false);
  const checkHandler1 = ({ target }) => {
    setisChecked1(!isChecked1);
    checkeditemHandler1(target.parentNode, target.value, target.checked);

    xformData.append("Checkbox1", target.value);
    yformData.append("Checkbox1", target.value);
    console.log(target.value);
  };
  const checkHandler2 = ({ target }) => {
    setisChecked2(!isChecked2);
    checkeditemHandler2(target.parentNode, target.value, target.checked);

    xformData.append("Checkbox2", target.value);
    yformData.append("Checkbox2", target.value);
    console.log(target.value);
    if (target.value === "정답지 부재(UnSupversied)") {
      yfilenone = 0;
      console.log(yfilenone);
      $(".yfile-list").empty();
      $("#yfile_label").hide();
      yfilesArr = [];
      console.log(yfilesArr);
      ystate = [];
      yfileNo = 0;
      ydel = 0;
      ysuc = 0;
      k = 0;
      v = 0;
      m = 0;
    } else {
      yfilenone = 1;
      console.log(yfilenone);
      $("#yfile_label").show();
    }
  };

  const checkeditemHandler1 = (box, id, isChecked1) => {
    console.log(box);
    if (isChecked1) {
      for (let i = 0; i < checkboxes1.length; i++) {
        if (checkboxes1[i] !== box.childNodes[0]) {
          checkboxes1[i].checked = false;
        }
      }
    }
  };

  const checkeditemHandler2 = (box, id, isChecked2) => {
    console.log(isChecked2);
    if (isChecked2) {
      for (let i = 0; i < checkboxes2.length; i++) {
        if (checkboxes2[i] !== box.childNodes[0]) {
          checkboxes2[i].checked = false;
        }
      }
    }
  };

  // xformData.append("company_id", tasks.company_id);
  // xformData.append("Taskname", tasks.Taskname);
  // xformData.append("state", tasks.state);
  xformData.append("taskId", idi);
  xformData.append("userId", `${localStorage.getItem("id")}`);
  // yformData.append("company_id", tasks.company_id);
  // yformData.append("Taskname", tasks.Taskname);
  // yformData.append("state", tasks.state);
  yformData.append("taskId", idi);
  yformData.append("userId", `${localStorage.getItem("id")}`);
  return (
    <div className={`${styles.file_wrapper} ${styles.flie_wrapper_area}`}>
      <form id="form">
        <div className={styles.task}>
          <h2
            style={{
              width: "100%",
              fontSize: "20px",
              paddingLeft: "10px",
              padding: "17px 20px",
              // color: "white",
              color: "#49277f",
              // backgroundColor: "#D3D3D3",
              marginBottom: "0px",
              fontWeight: "bold",
              cursor: "default",
            }}
            className={styles.tasktitle}
          >
            {tasks.taskname}
          </h2>
          <TaskChoise />
        </div>
        <div className="notice">
          ※ 파일을 업로드 중 페이지를 나가시면 업로드가 중단됩니다.
        </div>
        <div className="checkbox1">
          <div className="firstcheck">1. </div>
          {firstData.map((item) => (
            <label key={item.id} className="innerBox">
              <input
                type="checkbox"
                name="check1"
                className="checkrec"
                value={item.name}
                onChange={(e) => checkHandler1(e)}
                disabled=""
              />
              <div className="checkname">{item.name}</div>
            </label>
          ))}
        </div>

        <div className="checkbox2">
          <div className="secondcheck">2. </div>
          {secondData.map((item) => (
            <label key={item.id} className="innerBox">
              <input
                type="checkbox"
                name="check2"
                className="checkrec"
                value={item.name}
                onChange={(e) => checkHandler2(e)}
                disabled=""
              />
              <div className="checkname">{item.name}</div>
            </label>
          ))}
        </div>

        <div className={styles.float_left}>
          <span className={styles.label_plus}>
            <i className={`${styles.fas} ${styles.fa_plus}`}></i>
          </span>

          <div className={styles.files}>
            <div className={styles.filebox} id="filebox1">
              <div className={styles.btns1}>
                <label htmlFor="xfile">XFile Upload</label>
                <div id="preview1"></div>
                <div
                  className={styles.file_edit_icon1}
                  id="file_edit_icon1"
                ></div>
              </div>
              <input
                type="file"
                name="file"
                id="xfile"
                className={`${styles.upload_box} ${styles.upload_plus}`}
                multiple="multiple"
                disabled=""
              />
              <div className="xfile-list"></div>
            </div>

            <div className={styles.filebox} id="filebox2">
              <div className={styles.btns1}>
                <label id="yfile_label" htmlFor="yfile">
                  YFile Upload
                </label>
                <div id="preview2"></div>
                <div
                  className={styles.file_edit_icon1}
                  id="file_edit_icon2"
                ></div>
              </div>
              <input
                type="file"
                name="file"
                id="yfile"
                className={`${styles.upload_box} ${styles.upload_plus}`}
                multiple="multiple"
                disabled=""
              />

              {/* <input
                type="file"
                name="file"
                id="yfile"
                className={`${styles.upload_box} ${styles.upload_plus}`}
                multiple="multiple"
                disabled="" */}
              {/* /> */}
              <div className="yfile-list"></div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={styles.ok__btn}
              id="ok__btn"
              disabled=""
            >
              SEND
            </button>
            <button id="reset_btn" className="resetbtn" disabled="disabled">
              CANCEL
            </button>
            <Link to={`/${state}/task/${tasks.id}/process`}>
              <button id="ok_btn" className="okbtn" disabled="disabled">
                Running AI
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Upload);

$(function () {
  var fileinput = $("#xfile");
  xfileNo = 0;
  n = 0;
  fileinput.on("change", function () {
    var input = this;
    for (var i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      if (input.files && input.files.length) {
        var reader = new FileReader();
        this.enabled = false;
        reader.onload = function (e) {
          xstate[n] = 0;
          n++;
          xfilesArr.push(file);
          $("#ok__btn").attr("disabled", false);

          let htmlData = "";
          htmlData +=
            '<div id="xfile' +
            xfileNo +
            '" class="filebox" style="display:flex;">';
          htmlData +=
            '<p class="name" style="overflow:auto; width:350px; white-space:nowrap;";>' +
            file.name +
            "</p>";
          htmlData +=
            '   <button class="delete" style="border:none; background-color:transparent; padding-bottom:1em;" id=xdel' +
            xfileNo +
            ' ;><i class="far fa-minus-square" style="color:red;"></i></button>';
          htmlData += "</div>";
          $(".xfile-list").append(htmlData);
          $("#xdel" + xfileNo).on("click", { xparam: xfileNo }, xdeleteFile);
          xfileNo++;
        };
        reader.readAsDataURL(file);
      }
    }
    document.querySelector("input[id=xfile]").value = "";
    // $("#xfile").val = "";
  });
});

$(function () {
  var fileinput = $("#yfile");
  yfileNo = 0;
  m = 0;
  fileinput.on("change", function () {
    var input = this;
    for (var i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      if (input.files && input.files.length) {
        var reader = new FileReader();
        this.enabled = false;
        reader.onload = function (e) {
          ystate[m] = 0;
          m++;
          yfilesArr.push(file);
          $("#ok__btn").attr("disabled", false);

          let htmlData = "";
          htmlData +=
            '<div id="yfile' +
            yfileNo +
            '" class="filebox" style="display:flex;">';
          htmlData +=
            '<p class="name" style="overflow:auto; width:350px; white-space:nowrap;";>' +
            file.name +
            "</p>";
          htmlData +=
            '   <button class="delete" style="border:none; background-color:transparent; padding-bottom:1em;" id=ydel' +
            yfileNo +
            ' ;><i class="far fa-minus-square" style="color:red;"></i></button>';
          htmlData += "</div>";
          $(".yfile-list").append(htmlData);
          $("#ydel" + yfileNo).on("click", { yparam: yfileNo }, ydeleteFile);
          yfileNo++;
        };
        reader.readAsDataURL(file);
      }
    }
    document.querySelector("input[id=yfile]").value = "";
    // $("#yfile").val = "";
  });
});

function xdeleteFile(event) {
  document.querySelector("#xfile" + event.data.xparam).remove();
  xfilesArr[event.data.xparam].is_delete = true;
  xstate[event.data.xparam] = 3;
  xdel++;
  var delcnt = 0;
  for (var i = 0; i < xfilesArr.length; i++) {
    if (!xfilesArr[i].is_delete) {
    } else {
      delcnt++;
    }
  }
  if (delcnt === xfilesArr.length) {
  }
}

function ydeleteFile(event) {
  document.querySelector("#yfile" + event.data.yparam).remove();
  yfilesArr[event.data.yparam].is_delete = true;
  ystate[event.data.yparam] = 3;
  ydel++;
  var delcnt = 0;
  for (var i = 0; i < yfilesArr.length; i++) {
    if (!yfilesArr[i].is_delete) {
    } else {
      delcnt++;
    }
  }
  if (delcnt === yfilesArr.length) {
  }
}

$(function () {
  $(".xprogressbar").hide();
  $(".yprogressbar").hide();
  $(".resetbtn").hide();
  $(".label").hide();
  const form = document.getElementById("form");
  form.addEventListener(
    "submit",
    (window.onload = function (e) {
      axios
        .delete(`http://192.168.123.2:6600/api/File/${idi}`, {})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(xfilesArr);
      console.log(yfilesArr);
      const CancelToken = axios.CancelToken;
      let source = CancelToken.source();
      var xdeletefile = 0;
      var ydeletefile = 0;

      e.preventDefault();
      z = 0;
      w = 0;
      for (var i = 0; i < xfilesArr.length; i++) {
        if (!xfilesArr[i].is_delete) {
          xformData.append("fileInput", xfilesArr[i]);
          xformData.append("FileType", "X");
          const xlabel = document.createElement("label");
          xlabel.setAttribute("htmlFor", `xprogress-bar[${i}]`);
          xlabel.setAttribute("class", "xlabel");
          xlabel.innerText = "0%";
          const xprogress = document.createElement("progress");
          xprogress.setAttribute("style", "width:40%; height:25px;");
          xprogress.setAttribute("id", `xprogress-bar[${i}]`);
          xprogress.setAttribute("class", "xprogressbar");
          xprogress.setAttribute("value", "0");
          xprogress.setAttribute("max", "100");
          $(`#xfile${i}`).append(xlabel);
          $(`#xfile${i}`).append(xprogress);

          if (xfilesArr.length !== 0 && xdeletefile !== xfilesArr.length) {
            const xconfig = {
              onUploadProgress: function (xprogressEvent) {
                const xpercentCompleted = Math.round(
                  (xprogressEvent.loaded / xprogressEvent.total) * 100
                );
                if (xpercentCompleted !== 100 || xpercentCompleted > 0) {
                  $(".xprogressbar").show();
                  $(".resetbtn").show();
                  $(".label").show();
                  $("#ok__btn").attr("disabled", true);
                }
                xprogress.setAttribute("value", xpercentCompleted);
                xprogress.previousElementSibling.textContent = `${xpercentCompleted}%`;
                if (xpercentCompleted === 100) {
                  xprogress.previousElementSibling.textContent = `Upload complete!`;
                  $("#ok__btn").attr("disabled", false);
                  // $(".resetbtn").remove();
                }
              },

              cancelToken: source.token,
            };

            axios
              .post(
                // `http://192.168.123.2:6600/api/Testing/${companyid}/${idi}`,
                `http://192.168.123.2:6600/api/File/${idi}`,
                xformData,
                xconfig,
                { headers: { "Content-Type": "multipart/form-data" } }
              )
              .then((res) => {
                console.log(res);
                xstate[z] = 1;
                if (xstate[z] === 1) {
                  xsuc++;
                }
                z++;
                if (
                  xsuc + xdel === xstate.length &&
                  ysuc + ydel === ystate.length
                ) {
                  xcomplete = 1;
                  // window.location.replace(`/task/${idi}/process`);
                  $("#ok__btn").attr("disabled", false);
                  $("#ok__btn").attr("disabled", false);
                  if (xcomplete + ycomplete === 1) {
                    $(".resetbtn").remove();
                    $("#ok__btn").remove();
                    $("#ok_btn").attr("disabled", false);
                    $(".xprogress-bar").remove();
                  }
                }
              })
              .catch((err) => {
                console.log(err);
                xcomplete = 0;
                xsuc = 0;
                ysuc = 0;
                xstate[w] = 0;
                w++;
              });
          }
        } else {
          xdeletefile++;
        }
      }

      k = 0;
      v = 0;
      for (var j = 0; j < yfilesArr.length; j++) {
        if (!yfilesArr[j].is_delete) {
          yformData.append("fileInput", yfilesArr[j]);
          yformData.append("FileType", "Y");
          const ylabel = document.createElement("label");
          ylabel.setAttribute("htmlFor", `yprogress-bar[${j}]`);
          ylabel.setAttribute("class", "ylabel");
          ylabel.innerText = "0%";
          const yprogress = document.createElement("progress");
          yprogress.setAttribute("style", "width:40%; height:25px;");
          yprogress.setAttribute("id", `yprogress-bar[${j}]`);
          yprogress.setAttribute("class", "yprogressbar");
          yprogress.setAttribute("value", "0");
          yprogress.setAttribute("max", "100");
          $(`#yfile${j}`).append(ylabel);
          $(`#yfile${j}`).append(yprogress);

          if (yfilesArr.length !== 0 && ydeletefile !== yfilesArr.length) {
            const yconfig = {
              onUploadProgress: function (progressEvent) {
                const ypercentCompleted = Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                if (ypercentCompleted !== 100 || ypercentCompleted > 0) {
                  $(".yprogressbar").show();
                  $(".resetbtn").show();
                  $(".label").show();
                  $("#ok__btn").attr("disabled", true);
                }
                yprogress.setAttribute("value", ypercentCompleted);
                yprogress.previousElementSibling.textContent = `${ypercentCompleted}%`;
                if (ypercentCompleted === 100) {
                  yprogress.previousElementSibling.textContent = `Upload complete!`;
                  $(".yprogress-bar").remove();
                  // $(".resetbtn").remove();
                }
              },

              cancelToken: source.token,
            };
            axios
              .post(
                // `http://192.168.123.2:6600/api/Testing/${companyid}/${idi}`,
                `http://192.168.123.2:6600/api/File/${idi}`,
                yformData,
                yconfig,
                { headers: { "Content-Type": "multipart/form-data" } }
              )
              .then((res) => {
                console.log(res);
                ystate[k] = 1;
                if (ystate[k] === 1) {
                  ysuc++;
                }
                k++;
                if (
                  xsuc + xdel === xstate.length &&
                  ysuc + ydel === ystate.length
                ) {
                  ycomplete = 1;
                  // window.location.replace(`/task/${idi}/process`);
                  $("#ok__btn").attr("disabled", false);
                  if (xcomplete + ycomplete === 1) {
                    $(".resetbtn").remove();
                    $("#ok__btn").remove();
                    $("#ok_btn").attr("disabled", false);
                    $(".yprogress-bar").remove();
                  }
                }
              })
              .catch((err) => {
                console.log(err);
                ycomplete = 0;
                ystate[v] = 0;
                xsuc = 0;
                ysuc = 0;
                v++;
              });
          }
        } else {
          ydeletefile++;
        }
      }

      $("#reset_btn").on("click", function () {
        source.cancel("Operation canceled by the user.");
        source = CancelToken.source();
        console.log(`${idi}`);

        $(".xprogressbar").remove();
        $(".yprogressbar").remove();
        $(".xlabel").remove();
        $(".ylabel").remove();
        $("#reset_btn").attr("disabled", true);
        $(".resetbtn").hide();
        $(".delete").show();
        $(".delete").attr("disabled", false);
        $("#xfile").attr("disabled", false);
        $("#yfile").attr("disabled", false);
        $("#ok__btn").attr("disabled", false);
        $(".checkrec").attr("disabled", false);
      });
      if (xfilesArr.length !== 0 && xdeletefile !== xfilesArr.length) {
        $(".delete").attr("disabled", true);
        $(".delete").hide();
        $("#reset_btn").attr("disabled", false);
        $("#xfile").attr("disabled", true);
      }

      if (yfilesArr.length !== 0 && ydeletefile !== yfilesArr.length) {
        $(".delete").attr("disabled", true);
        $(".delete").hide();
        $("#reset_btn").attr("disabled", false);
        $("#yfile").attr("disabled", true);
      }
    })
  );
});

$(function () {
  checkcnt1 = 0;
  checkcnt2 = 0;
  var xdelfile = 0;
  var ydelfile = 0;
  $("#ok__btn").on("click", function () {
    ydelfile = 0;
    xdelfile = 0;
    // if (xcomplete + ycomplete === 2) {

    // $("#reset_btn").remove();
    // }
    for (let i = 0; i < checkboxes1.length; i++) {
      if (checkboxes1[i].checked === false) {
        checkcnt1++;
      }
    }
    for (let i = 0; i < checkboxes2.length; i++) {
      if (checkboxes2[i].checked === false) {
        checkcnt2++;
      }
    }
    console.log(checkcnt1, checkcnt2);
    if (checkcnt1 === 3) {
      checkcnt1 = 0;
      checkcnt2 = 0;
      alert("첫번째 checkbox를 선택해주세요");
      return false;
    } else if (checkcnt2 === 2) {
      checkcnt2 = 0;
      checkcnt1 = 0;
      alert("두번째 checkbox를 선택해주세요");
      return false;
    } else {
      checkcnt1 = 0;
      checkcnt2 = 0;
      $(".checkrec").attr("disabled", true);
    }
    console.log(ydelfile);
    // if (checkcnt2 === 2) {
    //   console.log("hi");
    //   checkcnt2 = 0;
    //   alert("두번째 checkbox를 선택해주세요");
    //   return false;
    // } else {
    //   checkcnt2 = 0;
    //   $(".checkrec").attr("disabled", true);
    // }

    for (var i = 0; i < xfilesArr.length; i++) {
      if (xfilesArr[i].is_delete) {
        xdelfile++;
      }
    }
    for (var j = 0; j < yfilesArr.length; j++) {
      if (yfilesArr[j].is_delete) {
        ydelfile++;
      }
    }
    // if (yfilenone === 0) {
    //   $(".yfile-list").empty();
    //   yfilesArr = [];
    //   console.log(yfilesArr);
    //   ystate = [];
    //   yfileNo = 0;
    //   ydel = 0;
    //   ysuc = 0;
    //   k = 0;
    //   v = 0;
    //   m = 0;
    //   ystate.length = 0;
    // }
    if (!yfilesArr.length || yfilesArr.length === ydelfile) {
      //alert("파일을 첨부해주세요.");
      //$(".checkrec").attr("disabled", false);
      if (yfilenone === 1) {
        alert("파일을 첨부해주세요.");
        $(".checkrec").attr("disabled", false);
        return false;
      } else {
        return true;
      } //return false;
    } else if (!xfilesArr.length || xfilesArr.length === xdelfile) {
      alert("파일을 첨부해주세요.");
      $(".checkrec").attr("disabled", false);
      return false;
    } else {
      $(".checkrec").attr("disabled", true);
      return true;
    }
  });
});
