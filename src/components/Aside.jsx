import styles from "./aside.module.scss";

export default function Aside() {
  return (
    <aside>
      <div className={styles.table} id="table2">
        <div className={styles.task}>
          <h2>Task Management</h2>
        </div>
      </div>
      <div className={styles.btn}>
        <button id="create" type="button">
          Create
        </button>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </aside>
  );
}
