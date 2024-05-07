import styles from "./MiniHeader.module.css";
import { useNavigate } from 'react-router-dom';
import { User } from "../utils/types";
import api from "../utils/api";
import { useToken } from "../utils/hooks";

export default function MiniHeader({ user }: { user: User }) {
  const { removeToken } = useToken();
  const navigate = useNavigate();

  return <header className={styles["header"]}>
    <h4>Chatify</h4>

    <div className={styles["user-profile"]}>
      <p>{user.displayName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  </header>

  function logout() {
    api.logout()
      .then(() => {
        removeToken();
        navigate('/auth');
      })
      .catch(err => alert(err));
  }
}
