import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./upload.module.css";
import $ from "jquery";
import axios from "axios";
import "./upload.css";

var xfilesArr = [];
var yfilesArr = [];
var xstate = [];
var ystate = [];
var xdel = 0;
var ydel = 0;
var xsuc = 0;
var ysuc = 0;
// var checkcnt = 0;
const xformData = new FormData();
const yformData = new FormData();
const checkboxes = document.getElementsByName("check");
export default function Upload() {
  const Data = [
    { id: 1, name: "First" },
    { id: 2, name: "Second" },
    { id: 3, name: "Third" },
    { id: 4, name: "Fourth" },
    { id: 5, name: "Fifth" },
  ];

  const [isChecked, setisChecked] = useState(false);
  // const [checkeditemes, setCheckeditemes] = useState(new Set());

  const checkHandler = ({ target }) => {
    setisChecked(!isChecked);
    checkeditemHandler(target.parentNode, target.value, target.checked);
    // console.log(target.parentNode, target.value, target.checked);
    console.log(target.value);
    // console.log(checkeditemes);
    xformData.append("Checkbox", target.value);
    yformData.append("Checkbox", target.value);
  };

  const checkeditemHandler = (box, id, isChecked) => {
    // const checkboxes = document.getElementsByName("check");
    // console.log("child", box.childNodes[0]);
    if (isChecked) {
      // console.log(isChecked);
      // checkeditemes.add(id);
      // setCheckeditemes(checkeditemes);
      // console.log(check);
      // console.log(checkboxes.length);
      // checkcnt = 1;
      // console.log(checkcnt);
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== box.childNodes[0]) {
          checkboxes[i].checked = false;
        }
        // else if (checkboxes[i] === box.childNodes[0]) {
        //   checkcnt = 0;
        //   console.log(checkcnt);
        // }
      }
      // if (box.childNodes[0].checked === true) {
      //   alert("fjasd");
      // }
      // console.log(box.childNodes[0]);
      // for (let i = 0; i < checkboxes.length; i++) {
      //   if (checkboxes[i].checked === true) {
      //     alert("no");
      //   }
      // }
      // if (checkboxes[id].checked === true) {
      //   alert("no");
      // }
      // box.style.backgroundColor = "#F6CB44";
    }
    // else if (!isChecked && checkeditemes.has(id)) {
    // checkeditemes.delete(id);
    // setCheckeditemes(checkeditemes);
    // box.style.backgroundColor = "#fff";
    // }

    // return checkeditemes;
  };
  // xformData.append("Writing", checkeditemes);
  // yformData.append("Writing", target.value);
  return (
    <div className={`${styles.file_wrapper} ${styles.flie_wrapper_area}`}>
      <div className="checkbox">
        {Data.map((item) => (
          <label key={item.id} className="innerBox">
            <input
              type="checkbox"
              name="check"
              className="checkrec"
              value={item.name}
              onChange={(e) => checkHandler(e)}
            />
            <div className="checkname">{item.name}</div>
          </label>
        ))}
      </div>

      <div className={styles.float_left}>
        <span className={styles.label_plus}>
          <i className={`${styles.fas} ${styles.fa_plus}`}></i>
        </span>
        <form id="form">
          <div className={styles.files}>
            {/* <form id="xform"> */}
            <div className={styles.filebox} id="filebox1">
              <div className={styles.btns1}>
                <label htmlFor="xfile">XFile Upload</label>
                {/* <button id="reset_btn" className="resetbtn" disabled="disabled">
                  취소
                </button> */}
                <div id="preview1"></div>
                <div
                  className={styles.file_edit_icon1}
                  id="file_edit_icon1"
                ></div>
              </div>
              {/* <form id="xform"> */}
              <input
                type="file"
                name="file"
                id="xfile"
                className={`${styles.upload_box} ${styles.upload_plus}`}
                multiple="multiple"
                disabled=""
              />
              <div className="xfile-list"></div>
              {/* </form> */}
            </div>
            <div className={styles.filebox} id="filebox2">
              <div className={styles.btns1}>
                <label htmlFor="yfile">YFile Upload</label>
                <div id="preview2"></div>
                <div
                  className={styles.file_edit_icon1}
                  id="file_edit_icon2"
                ></div>
              </div>
              {/* <form id="yform"> */}
              <input
                type="file"
                name="file"
                id="yfile"
                className={`${styles.upload_box} ${styles.upload_plus}`}
                multiple="multiple"
                disabled=""
              />
              <div className="yfile-list"></div>
              {/* </form> */}
            </div>
          </div>
          {/* <div className="go"> */}

          <div>
            {/* <Link to="" id="link"> */}
            <button
              type="submit"
              className={styles.ok__btn}
              id="ok__btn"
              disabled=""
            >
              SEND
            </button>
            {/* </Link> */}
            <button id="reset_btn" className="resetbtn" disabled="disabled">
              CANCEL
            </button>
          </div>
          {/* </div> */}
        </form>
        {/* <Link to="/process"> */}
        {/* <button className={styles.ok__btn} id="ok__btn">
          확인
        </button> */}
        {/* </Link> */}
      </div>
    </div>
  );
}

$(function () {
  var fileinput = $("#xfile");
  var fileNo = 0;
  var n = 0;
  fileinput.on("change", function () {
    var input = this;
    for (var i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      console.log(file);
      if (input.files && input.files.length) {
        var reader = new FileReader();
        this.enabled = false;
        reader.onload = function (e) {
          xstate[n] = 0;
          n++;
          xfilesArr.push(file);
          console.log(e);
          console.log(xfilesArr);
          $("#ok__btn").attr("disabled", false);
          console.log(e.total);

          let htmlData = "";
          htmlData +=
            '<div id="xfile' +
            fileNo +
            '" class="filebox" style="display:flex;">';
          htmlData +=
            '<p class="name" style="overflow:auto; width:350px; white-space:nowrap;";>' +
            file.name +
            "</p>";
          htmlData +=
            '   <button class="delete" style="border:none; background-color:transparent; padding-bottom:1em;" id=xdel' +
            fileNo +
            ' ;><i class="far fa-minus-square" style="color:red;"></i></button>';
          htmlData += "</div>";
          $(".xfile-list").append(htmlData);
          $("#xdel" + fileNo).on("click", { xparam: fileNo }, xdeleteFile);
          fileNo++;
        };
        reader.readAsDataURL(file);
      }
    }
  });
  document.querySelector("input[type=file]").value = "";
});

$(function () {
  var fileinput = $("#yfile");
  var fileNo = 0;
  var n = 0;
  fileinput.on("change", function () {
    var input = this;
    for (var i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      console.log(file);
      if (input.files && input.files.length) {
        var reader = new FileReader();
        this.enabled = false;
        reader.onload = function (e) {
          ystate[n] = 0;
          n++;
          yfilesArr.push(file);
          console.log(e);
          console.log(yfilesArr);
          $("#ok__btn").attr("disabled", false);
          console.log(e.total);

          let htmlData = "";
          htmlData +=
            '<div id="yfile' +
            fileNo +
            '" class="filebox" style="display:flex;">';
          htmlData +=
            '<p class="name" style="overflow:auto; width:350px; white-space:nowrap;";>' +
            file.name +
            "</p>";
          htmlData +=
            '   <button class="delete" style="border:none; background-color:transparent; padding-bottom:1em;" id=ydel' +
            fileNo +
            ' ;><i class="far fa-minus-square" style="color:red;"></i></button>';
          htmlData += "</div>";
          $(".yfile-list").append(htmlData);
          $("#ydel" + fileNo).on("click", { yparam: fileNo }, ydeleteFile);
          fileNo++;
        };
        reader.readAsDataURL(file);
      }
    }
  });
  document.querySelector("input[type=file]").value = "";
});

function xdeleteFile(event) {
  console.log(event.data.xparam);
  document.querySelector("#xfile" + event.data.xparam).remove();
  xfilesArr[event.data.xparam].is_delete = true;
  console.log(xfilesArr);

  var delcnt = 0;
  console.log(xfilesArr.length);
  for (var i = 0; i < xfilesArr.length; i++) {
    if (!xfilesArr[i].is_delete) {
    } else {
      delcnt++;
    }
  }
  console.log(delcnt);
  if (delcnt === xfilesArr.length) {
    // $("#ok__btn").attr("disabled", true);
  }
}

function ydeleteFile(event) {
  console.log(event.data.yparam);
  document.querySelector("#yfile" + event.data.yparam).remove();
  yfilesArr[event.data.yparam].is_delete = true;
  ystate[event.data.yparam] = 3;
  console.log(yfilesArr);
  ydel++;
  var delcnt = 0;
  console.log(yfilesArr.length);
  for (var i = 0; i < yfilesArr.length; i++) {
    if (!yfilesArr[i].is_delete) {
    } else {
      delcnt++;
    }
  }
  console.log(delcnt);
  if (delcnt === yfilesArr.length) {
    // $("#ok__btn").attr("disabled", true);
  }
}

$(function () {
  // const Filetype = "hello"
  $(".xprogressbar").hide();
  $(".yprogressbar").hide();
  $(".resetbtn").hide();
  $(".label").hide();
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    var xdeletefile = 0;
    var ydeletefile = 0;
    e.preventDefault();
    // const xformData = new FormData();
    // Datatype.append("Filetype", "x");
    var z = 0;
    var w = 0;
    for (var i = 0; i < xfilesArr.length; i++) {
      if (!xfilesArr[i].is_delete) {
        xformData.append("File", xfilesArr[i]);
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
              }
            },

            cancelToken: source.token,
          };

          axios
            .post(
              "http://112.221.126.139:10000/api/Testingkch/",
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
                window.location.replace("/process");
                $("#ok__btn").attr("disabled", false);
              }
            })
            .catch((err) => {
              console.log(err);
              xstate[w] = 0;
              w++;
            });
        }
      } else {
        xdeletefile++;
      }
    }

    // const yformData = new FormData();
    var k = 0;
    var v = 0;
    for (var j = 0; j < yfilesArr.length; j++) {
      if (!yfilesArr[j].is_delete) {
        // state[n] = 0;
        // n++;
        yformData.append("File", yfilesArr[j]);
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
                // state[j]=1;
                // $("#link").on("click", function (e) {
                //   e.preventDefault();
                // });
              }
              yprogress.setAttribute("value", ypercentCompleted);
              yprogress.previousElementSibling.textContent = `${ypercentCompleted}%`;
              if (ypercentCompleted === 100) {
                yprogress.previousElementSibling.textContent = `Upload complete!`;
                // $(".resetbtn").hide();
                $("#yprogress-bar[1]").remove();
              }
            },

            cancelToken: source.token,
          };
          axios
            .post(
              "http://112.221.126.139:10000/api/Testingkch/",
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
                window.location.replace("/process");
                $("#ok__btn").attr("disabled", false);
              }
            })
            .catch((err) => {
              console.log(err);
              ystate[v] = 0;
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
    });
    if (xfilesArr.length !== 0 && xdeletefile !== xfilesArr.length) {
      // $("#ok__btn").attr("disabled", true);
      $(".delete").attr("disabled", true);
      $(".delete").hide();
      $("#reset_btn").attr("disabled", false);
      $("#xfile").attr("disabled", true);
    }

    if (yfilesArr.length !== 0 && ydeletefile !== yfilesArr.length) {
      // $("#ok__btn").attr("disabled", true);
      $(".delete").attr("disabled", true);
      $(".delete").hide();
      $("#reset_btn").attr("disabled", false);
      $("#yfile").attr("disabled", true);
    }
  });
});

$(function () {
  var checkcnt = 0;
  $("#ok__btn").on("click", function () {
    for (let i = 0; i < checkboxes.length; i++) {
      // var checkcnt = 0;
      if (checkboxes[i].checked === false) {
        checkcnt++;
      }
    }
    console.log(checkcnt);
    if (checkcnt === 5) {
      // console.log(checkcnt);
      checkcnt = 0;
      alert("checkbox를 선택해주세요");
      return false;
    } else {
      checkcnt = 0;
    }
    // checkcnt = 0;
    var xdelfile = 0;
    var ydelfile = 0;
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
    if (!yfilesArr.length || yfilesArr.length === ydelfile) {
      alert("파일을 첨부해주세요.");
      return false;
    } else if (!xfilesArr.length || xfilesArr.length === xdelfile) {
      alert("파일을 첨부해주세요.");
      return false;
    } else {
      return true;
    }
  });
});
