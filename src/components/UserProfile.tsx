import { IoIosArrowBack } from 'react-icons/io'
import style from './ChatApp.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import viteImg from "/vite.svg";
import { useForm } from 'react-hook-form';

export interface IResponseUser {
    cPin: string;
    displayName: string;
    email: string;
    phone: string;
    picture: string;
}

interface IDataEdit {
    displayName: string;
    phone: string;
    picture: string;
}

export default function UserProfile({ userId }: { userId: string }) {
    const [user, setUser] = useState({
        cPin: '',
        displayName: '',
        email: '',
        phone: '',
        picture: ''
    });
    const [isEditting, setIsEditting] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        api.getUser(userId)
            .then((data: IResponseUser) => {
                const { cPin, displayName, email, phone, picture } = data;
                setUser(s => ({ ...s, cPin, displayName, email, phone, picture }))
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId]);

    const ProfilePage = (
        <div>
            <img src={user.picture ? user.picture : viteImg} alt="pic" />
            <ul>
                <li>Display Name: {user.displayName}</li>
                <li>cPin: {user.cPin}</li>
                <li>Phone Number: {user.phone}</li>
                <li>Email: {user.email}</li>
            </ul>
            <button onClick={() => setIsEditting(true)}>Edit info</button>
        </div>
    );

    const { handleSubmit, register } = useForm<IDataEdit>();
    const editProfile = (data: IDataEdit) => {
        const formData = new FormData();
        formData.append('picture', data.picture[0]);
        formData.append('displayName', data.displayName);
        formData.append('phone', data.phone);
        api.updateUser(formData)
            .then(({ displayName, phone, picture }) => {
                setUser(s => ({ ...s, displayName, phone, picture }));
                setIsEditting(false);
            })
            .catch(error => {
                console.error(error.message);
                alert(error.message);
            });
    }
    const ProfileEditPage = (
        <form>
            <ul>
                <li>
                    <label htmlFor="displayName">Display Name</label>
                    <input type="text" {...register('displayName')} defaultValue={user.displayName} />
                </li>
                <li>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" {...register('phone')} defaultValue={user.phone} />
                </li>
                <li>
                    <label htmlFor="picture">Picture</label>
                    <input type="file" {...register('picture')} />
                </li>
                <li>
                    <button onClick={handleSubmit(editProfile)}>Confirm Edit</button>
                    <button type='button' onClick={() => setIsEditting(false)}>Cancel</button>
                </li>
            </ul>
        </form>
    )

    return (
        <div className={style['user-profile']}>
            <div>
                <IoIosArrowBack onClick={() => navigate("/chat")} />
                <h2>User Profile</h2>
            </div>
            {!isEditting ? ProfilePage : ProfileEditPage}
        </div>
    )
}