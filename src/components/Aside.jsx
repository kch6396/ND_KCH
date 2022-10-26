import styles from "./css/aside.module.scss";
import TaskList from "../containers/TaskList";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateTask() {
  const [isValid, setIsValid] = useState(false);
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
    try {
      await axios
        .post("http://112.221.126.139:10000/api/NeuralDrops/", {
          config,
          Taskname: name,
          company_id: `${localStorage.getItem("id")}`,
          state: "Upload",
        })
        .then((res) => {
          setIsValid(true);
          window.location.replace("/mainpage");
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }

  if (isValid === true) {
    console.log("asdlkfnoiwef");
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
        <label>이름</label>
        <input
          onChange={onChange}
          value={name}
          name="name"
          type="text"
          required
        />
        <button onClick={Save}>저장</button>
      </div>
    </form>
  );
}

function ChangeName() {
  const id = useParams().id;
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

  async function edit() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      await axios
        .put(
          `http://112.221.126.139:10000/api/Testing/${localStorage.getItem(
            "id"
          )}/${id}`,
          {
            config,
            Taskname: name,
          }
        )
        .then((res) => {
          window.location.replace("/mainpage");
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>이름</label>
        <input
          onChange={onChange}
          value={name}
          name="name"
          type="text"
          required
        />
        <button onClick={edit}>저장</button>
      </div>
    </form>
  );
}

export default function Aside() {
  const id = useParams().id;
  console.log(id);
  const [put, setPut] = useState(false);
  function putOnClick() {
    setPut(!put);
  }

  const [create, setCreate] = useState(false);
  function createOnClick() {
    setCreate(!create);
  }

  async function deleteOnClick() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      console.log(localStorage.getItem("id"));
      await axios
        .delete(
          `http://112.221.126.139:10000/api/Testing/${localStorage.getItem(
            "id"
          )}/${id}`,
          {
            config,
            company_id: localStorage.getItem("id"),
            id: id,
          }
        )
        .then((res) => {
          window.location.replace("/mainpage");
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <aside>
        <div className={styles.table} id="table2">
          <div className={styles.task}>
            <h2>Task Management</h2>
          </div>
          <TaskList />
          {create ? <CreateTask /> : null}
          {put ? <ChangeName /> : null}
        </div>
        <div className={styles.btn}>
          <button onClick={createOnClick} id="create" type="button">
            Create
          </button>
          <button onClick={putOnClick} type="button">
            Edit
          </button>
          <button onClick={deleteOnClick} type="button">
            Delete
          </button>
        </div>
      </aside>
      {/* <Upload /> */}
    </>
  );
}
