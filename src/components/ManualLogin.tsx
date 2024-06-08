import { useForm } from 'react-hook-form';
import { useToken } from '../utils/hooks';
import { useNavigate } from 'react-router-dom';
import styles from './ManualLogin.module.css'
import api from '../utils/api';


export default function Form() {
    const { register, handleSubmit } = useForm<LoginDataType>();
    const { setToken } = useToken();
    const navigate = useNavigate();

    function login(data: LoginDataType) {
        api.login(data).then(res => {
            setToken(res.token);
            navigate('/');
        }).catch(err => {
            alert(err);
        });
    }
    return <form className={styles["form"]} onSubmit={handleSubmit(login)}>
        <hr />
        <h3>Or login with your email</h3>
        <input {...register("email")} placeholder="email" autoComplete='on' required />
        <input {...register("password")} type="password" placeholder={"password"} autoComplete='current-password' required />
        <input type="submit" value="Login" />
    </form>
}


interface LoginDataType {
    email: string;
    password: string;
}