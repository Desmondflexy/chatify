import React from 'react';
import Styles from "./ChatApp.module.css";
import { useNavigate } from "react-router-dom";
import viteImg from "../../public/vite.svg";
import socket from "../utils/socket";
import { formatDate } from '../utils';


export default function UserChatList({ userId, setModalVisibility }: { userId: string; setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [chats, setChats] = React.useState<Chat[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        socket.emit("fetchChats", { userId });
        socket.on("receivedChats", (data: Chat[]) => {
            setChats(data);
        });
        socket.on("receiveMessage", () => {
            setChats(chats);
        })
        return () => {
            socket.off("receivedChats");
            socket.off("receiveMessage");
        }
    }, [userId, chats]);

    const chatsList = chats.map(function (chat) {
        return <li key={chat.id} onClick={() => showChatPage(chat.id)}>
            <img src={viteImg} alt="AB" />
            <div>
                <h3>{chat.chatName}</h3>
                <div>
                    <span>{chat.lastMessage}</span>
                    <span>{formatDate(chat.time)}</span>
                </div>
            </div>
        </li>
    });
    function showChatPage(chatId: string) {
        navigate(chatId.toString());
    }
    return (
        <ul className={Styles.chatList}>
            <li>
                <button onClick={() => setModalVisibility(true)}>New chat</button>
                <input type="search" placeholder='Search a chat' />
            </li>
            {chatsList}
        </ul>
    )
}

interface Chat {
    chatName: string;
    id: string;
    lastMessage: string;
    time: string;
    picture: string;

}