import { IoIosArrowBack } from 'react-icons/io'
import style from './ChatApp.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../utils/api';

export default function UserProfile({ userId }: { userId: string }) {
    const navigate = useNavigate();
    useEffect(() => {
        api.getUser(userId)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error.d);
            });
    })
    return <div className={style['user-profile']}>
        <div>
            <IoIosArrowBack onClick={() => navigate("/chat")} />
            <h2>User Profile</h2>
        </div>
        <div>
            <img src="" alt="" />

        </div>
    </div>
}