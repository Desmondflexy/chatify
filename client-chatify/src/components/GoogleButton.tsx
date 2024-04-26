import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import myApi from '../api.config';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../hooks';


function GoogleButton() {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const googleLogin = useGoogleLogin({ onSuccess, onError });
  function onSuccess(codeResponse: { access_token: string }) {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`)
      .then(res => {
        const { id, name, email } = res.data;
        myApi.post('/auth/google', { id, name, email })
          .then(res => {
            setToken(res.data);
            navigate('/');
          }).catch(error => {
            alert(':( Error logging in with Google')
            console.error(error);
          });
      }).catch(error => {
        console.error(error);
      })
  }

  function onError(error: unknown) {
    console.error(error);
  }

  function handleGoogleLogin() {
    googleLogin();
  }

  return <button onClick={handleGoogleLogin}>Continue with Google</button>
}

export default GoogleButton;