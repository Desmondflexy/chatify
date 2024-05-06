import { useEffect, useState } from "react";
import myApi from "../api.config";
import Styles from "./UserChatList.module.css";

interface Chat {
  chatName: string;
  id: string;
}

export default function UserChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  async function getChats() {
    try {
      const response = await myApi.get("/chat");
      console.log(response.data.chats);
      setChats(response.data.chats);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChats();
  }, [])

  return <div>
    <ul className={Styles["chats"]}>
      {chats.map(chat => <li key={chat.id}>
        <h3>{chat.chatName}</h3>
        <p>Chat preview</p>
      </li>)}
    </ul>
  </div>
}