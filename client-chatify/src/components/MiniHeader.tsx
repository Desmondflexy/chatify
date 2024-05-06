import styles from "./MiniHeader.module.css";
import { Link } from 'react-router-dom';
import { User } from "../utils/types";

export default function MiniHeader({ user }: { user: User }) {

  return <header className={styles["header"]}>
    <h4>Chatify</h4>
    <div>
      <Link to={""}>Home</Link>
      <Link to={"/chats"}>My Chats</Link>
    </div>
    <p>{user.displayName}</p>
  </header>
}
