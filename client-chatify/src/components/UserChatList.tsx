import { useEffect, useState } from "react";
import Styles from "./UserChatList.module.css";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UserChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchUserChats()
      .then(res => {
        setChats(res);
      }).catch(err => {
        console.error(err);
      })
  }, [])

  return <ul className={Styles["chats"]}>
    {chats.map(chat => <li onClick={() => navigate(chat.id)} key={chat.id}>{chat.chatName}</li>)}
  </ul>
}

interface Chat {
  chatName: string;
  id: string;
}