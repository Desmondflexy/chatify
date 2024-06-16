import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../utils/hooks';
import api from '../utils/api';


function GoogleButton() {
    const navigate = useNavigate();
    const { setToken } = useToken();
    const googleLogin = useGoogleLogin({ onSuccess, onError });

    function onSuccess(codeResponse: { access_token: string }) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`)
            .then(res => {
                const { id, name, email } = res.data;
                api.googleLogin({ id, name, email })
                    .then(res => {
                        setToken(res.token);
                        navigate('/');
                    }).catch(error => {
                        console.error(error);
                        alert(error)
                    });
            }).catch(error => {
                console.error(error);
            })
    }

    function onError(error: unknown) {
        console.error(error);
    }


    return <button onClick={() => googleLogin()}>Sign in with Google</button>
}

export default GoogleButton;