import styles from "./css/aside.module.scss";
import TaskList from "../containers/TaskList";
import { useState, useRef, forwardRef, createRef, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const CreateTask = forwardRef(() => {
  // function CreateTask({ CreateRef }) {
  const location = useLocation();
  const [isValid, setIsValid] = useState(false);
  // const CreateRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
  });
  const { name } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  async function Save() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    console.log(location.pathname);
    if (location.pathname.includes("/modelCreation")) {
      try {
        await axios
          .post(
            // `http://192.168.123.2:6600/api/Task/${localStorage.getItem("id")}`,
            `http://192.168.123.2:6600/api/Task/${localStorage.getItem("id")}`,
            {
              config,
              taskname: name,
              userId: `${localStorage.getItem("id")}`,
              state: "Upload",
            }
          )
          .then((res) => {
            setIsValid(true);
            window.location.replace("/modelCreation");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else if (location.pathname.includes("/modelCompress")) {
      try {
        await axios
          .post(
            // `http://192.168.123.2:6600/api/Task/${localStorage.getItem("id")}`,
            `http://192.168.123.2:6600/api/Compress/${localStorage.getItem(
              "id"
            )}`,
            {
              config,
              taskname: name,
              userId: `${localStorage.getItem("id")}`,
              state: "Upload",
            }
          )
          .then((res) => {
            setIsValid(true);
            window.location.replace("/modelCompress");
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (isValid === true) {
    //setIsValid(false);
    return null;
  }
  if (isValid === true) {
    console.log(isValid, "isvalid");
    setIsValid(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        {/* <label>이름</label> */}
        <input
          onChange={onChange}
          value={name}
          name="name"
          type="text"
          required
          className={styles.modelnamecreate}
          maxLength="50"
        />
        <button onClick={Save} className={styles.createButton}>
          Create
        </button>
      </div>
    </form>
  );
});

// function ChangeName() {
//   const location = useLocation();
//   const id = useParams().id;
//   console.log(id);
//   const [formData, setFormData] = useState({
//     name: "",
//   });
//   const { name } = formData;
//   function onChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     console.log("Fsdasf" + [e.target.name]);
//   }

//   function onSubmit(e) {
//     e.preventDefault();
//   }

//   async function edit() {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     };
//     if (location.pathname.includes("/modelCreation")) {
//       try {
//         await axios
//           .put(`http://192.168.123.2:6600/api/TaskAdmin/${id}`, {
//             config,
//             taskname: name,
//           })
//           .then((res) => {
//             window.location.replace("/modelCreation");
//             console.log(res);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     } else if (location.pathname.includes("/modelCompress")) {
//       try {
//         await axios
//           .put(`http://192.168.123.2:6600/api/CompressAdmin/${id}`, {
//             config,
//             taskname: name,
//           })
//           .then((res) => {
//             window.location.replace("/modelCompress");
//             console.log(res);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         <label>이름</label>
//         <input
//           onChange={onChange}
//           value={name}
//           name="name"
//           type="text"
//           required
//         />
//         <button onClick={edit}>저장</button>
//       </div>
//     </form>
//   );
// }

export default function Aside() {
  const location = useLocation();
  const id = useParams().id;

  const [put, setPut] = useState(false);
  const [disable, setDisable] = useState(false);
  // function putOnClick() {
  //   setPut(!put);
  // }

  // async function deleteOnClick() {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   };
  //   if (location.pathname.includes("/modelCreation")) {
  //     try {
  //       console.log(localStorage.getItem("id"));
  //       await axios
  //         .delete(`http://192.168.123.2:6600/api/TaskAdmin/${id}`, {
  //           config,
  //           company_id: localStorage.getItem("id"),
  //           id: id,
  //         })
  //         .then((res) => {
  //           window.location.replace("/modelCreation");
  //           console.log(res);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else if (location.pathname.includes("/modelCompress")) {
  //     try {
  //       console.log(localStorage.getItem("id"));
  //       await axios
  //         .delete(`http://192.168.123.2:6600/api/CompressAdmin/${id}`, {
  //           config,
  //           company_id: localStorage.getItem("id"),
  //           id: id,
  //         })
  //         .then((res) => {
  //           window.location.replace("/modelCompress");
  //           console.log(res);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
  //style={{ display: "flex", height: "100%" }}

  const [create, setCreate] = useState(false);
  function createOnClick() {
    setCreate(!create);
    setDisable(!disable);
  }
  function Cancel() {
    setCreate(!create);
    setDisable(!disable);
  }

  return (
    <>
      <aside>
        <div style={{ width: "100%" }}>
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
                backgroundColor: "#e9e9e9",
                fontWeight: "600",
                cursor: "default",
              }}
              className={styles.tasktitle}
            >
              Task Management
            </h2>
          </div>
          <div className={styles.btn}>
            <button
              onClick={createOnClick}
              id="create"
              className={styles.createbtn}
              type="button"

              // disabled={disable}
            >
              Create Task
            </button>
            {create ? <CreateTask /> : null}

            {create ? (
              <button onClick={Cancel} className={styles.cancelBtn}>
                Cancel
              </button>
            ) : null}
            {/* <button onClick={putOnClick} type="button">
              Edit
            </button> */}
            {/* <button onClick={deleteOnClick} type="button">
              Delete
            </button> */}
          </div>
          <TaskList />
          {/* <div className={styles.createtask}> */}

          {/* </div> */}
          {/* {put ? <ChangeName /> : null} */}
        </div>
      </aside>
      {/* <div
        style={{
          border: "solid 1px",
          width: "79%",
          borderRadius: "10px",
          margin: "20px 10px 10px 10px",
        }}
      ></div> */}
      {/* <Upload /> */}
    </>
  );
}
