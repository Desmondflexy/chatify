// import myApi from "../api.config";
import react from 'react';


export default function Form() {
  react.useEffect(() => {
    // myApi.post('auth/login', {
    //   email: "",
    //   password: ""
    // });

  })
  return <form>
    <h3>Login</h3>
    <input placeholder="email"/>
    <input type="password" placeholder={"password"}/>
    <input type="submit"/>
  </form>
}