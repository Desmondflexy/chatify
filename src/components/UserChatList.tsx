import { useState, useEffect } from 'react';
import Styles from "./ChatApp.module.css";
import { useNavigate } from "react-router-dom";
import viteImg from "/vite.svg";
import socket from "../utils/socket";
import { formatDate } from '../utils';
import { useSearch } from '../utils/hooks';
import FindFriendForm from './FindFriendForm';
import Modal from './Modal';


export default function UserChatList({ userId }: { userId: string }) {
    const [chats, setChats] = useState<Chat[]>([]);
    const navigate = useNavigate();
    const { query, setQuery, filteredData } = useSearch(chats);
    const [isModalVisible, setIsModalVisible] = useState(false); // find friend modal is not visible by default

    useEffect(() => {
        // Fetch chats initially when component mounts or userId changes
        const fetchChats = () => {
            socket.emit("fetchChats", { userId });
        };

        fetchChats(); // Initial fetch

        // Define a handler for receivedChats
        const handleReceivedChats = (data: Chat[]) => {
            setChats(data);
        };

        // Define a handler for receiveMessage
        const handleReceiveMessage = () => {
            fetchChats();
        };

        // Set up the listeners
        socket.on("receivedChats", handleReceivedChats);
        socket.on("receiveMessage", handleReceiveMessage);

        // Cleanup the listener when the component unmounts or userId changes
        return () => {
            socket.off("receivedChats", handleReceivedChats);
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [userId]);


    const chatsList = filteredData.map((chat) => (
        <li key={chat.id} onClick={() => navigate(chat.id)}>
            <img src={viteImg} alt="AB" />
            <div>
                <h3>{chat.chatName}</h3>
                <div>
                    <span>{chat.lastMessage}</span>
                    <span>{formatDate(chat.time, 'short')}</span>
                </div>
            </div>
        </li>
    ));

    const findFriendModal = (
        <Modal showModal={setIsModalVisible}>
            <FindFriendForm showModal={setIsModalVisible} />
        </Modal>
    );

    return (
        <>
            <ul className={Styles.chatList}>
                <li>
                    <button onClick={() => setIsModalVisible(true)}>New chat</button>
                    <input type="search" placeholder='Search a chat' value={query} onChange={e => setQuery(e.target.value)} />
                </li>
                {chats.length ? chatsList : <li style={{ backgroundColor: "grey", cursor: "default", margin: "40px" }}>You dont have any chat, click the 'new chat' button to start a new new start.</li>}
            </ul>

            {isModalVisible && findFriendModal}
        </>
    );
}

interface Chat {
    chatName: string;
    id: string;
    lastMessage: string;
    time: string;
    picture: string;

}