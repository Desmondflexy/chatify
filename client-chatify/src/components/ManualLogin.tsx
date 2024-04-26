import {useForm} from 'react-hook-form';
import myApi from '../api.config';
import { useToken } from '../hooks';
import { useNavigate } from 'react-router-dom';
import styles from './ManualLogin.module.css'

type LoginDataType = {
  email: string;
  password: string;
}


export default function Form() {
  const {register, handleSubmit} = useForm<LoginDataType>();
  const {setToken} = useToken();
  const navigate = useNavigate();

  function login(data: LoginDataType) {
    myApi.post('/auth/login', data).then(res => {
      setToken(res.data);
      navigate('/');
    }).catch(err => {
      alert(err.response.data);
    });
  }
  return <form className={styles["form"]} onSubmit={handleSubmit(login)}>
    <h3>Login</h3>
    <input {...register("email")} placeholder="email" autoComplete='on' />
    <input {...register("password")} type="password" placeholder={"password"} autoComplete='current-password'/>
    <input type="submit"/>
  </form>
}
