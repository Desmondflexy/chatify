import styles from "./MiniHeader.module.css";
import { useNavigate } from 'react-router-dom';
import { IUser } from "../utils/types";
import api from "../utils/api";
import { useToken } from "../utils/hooks";
import viteImg from "/vite.svg"

export default function MiniHeader({ user }: { user: IUser }) {
    const { removeToken } = useToken();
    const navigate = useNavigate();

    function logout() {
        api.logout()
            .then(() => {
                removeToken();
                navigate('/auth');
            })
            .catch(err => alert(err));
    }

    return <header className={styles["header"]}>
        <h2>Chatify</h2>
        <div>
            <img src={viteImg} alt="profile-img" />
            <div>
                <p>{user.displayName}</p>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    </header>

}
