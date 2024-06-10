import React from 'react';
import Styles from "./ChatApp.module.css";
import { useNavigate } from "react-router-dom";
import viteImg from "/vite.svg";
import socket from "../utils/socket";
import { formatDate } from '../utils';
import { useSearch } from '../utils/hooks';


export default function UserChatList({ userId, setModalVisibility }: { userId: string; setModalVisibility: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [chats, setChats] = React.useState<Chat[]>([]);
    const navigate = useNavigate();
    const {query, setQuery, filteredData} = useSearch(chats);

    React.useEffect(() => {
        socket.emit("fetchChats", { userId });
        socket.on("receivedChats", (data: Chat[]) => {
            setChats(data);
        });
        socket.on("receiveMessage", () => {
            setChats(() => chats);
        })
        return () => {
            socket.off("receivedChats");
            socket.off("receiveMessage");
        }
    // }, [userId]);
    }, [userId, chats]);

    const chatsList = filteredData.map(function (chat) {
        return <li key={chat.id} onClick={() => navigate(chat.id)}>
            <img src={viteImg} alt="AB" />
            <div>
                <h3>{chat.chatName}</h3>
                <div>
                    <span>{chat.lastMessage}</span>
                    <span>{formatDate(chat.time, 'short')}</span>
                </div>
            </div>
        </li>
    });

    return (
        <ul className={Styles.chatList}>
            <li>
                <button onClick={() => setModalVisibility(true)}>New chat</button>
                <input type="search" placeholder='Search a chat' value={query} onChange={e => setQuery(e.target.value)} />
            </li>
            {chats.length? chatsList: <li style={{backgroundColor: "grey", cursor:"default", margin: "40px"}}>You dont have any chat, click the 'new chat' button to start a new new start.</li>}
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