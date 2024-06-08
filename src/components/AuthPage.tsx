import GoogleButton from "./GoogleButton";
import ManualLogin from "./ManualLogin";
import styles from "./AuthPage.module.css";


export default function AuthPage() {

    return <div className={styles.div}>
        <h1>WELCOME TO CHATIFY</h1>
        <GoogleButton />
        {import.meta.env.VITE_APP_NODE_ENV === 'development' && <ManualLogin />}
    </div>
}