import { useUserContext } from "../hooks";
import styles from "./MiniHeader.module.css";


export default function MiniHeader() {
  const user = useUserContext();

  return <header className={styles["header"]}>
    <h4>Chatify</h4>
    <p>{user.displayName}</p>
  </header>
}
