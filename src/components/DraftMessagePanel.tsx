import {useForm} from "react-hook-form";
import styles from "./ChatPanel.module.css";
import api from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
// import { Socket } from "socket.io-client";

export default function DraftMessagePanel() {
  const {handleSubmit, register} = useForm<ChatForm>();
  const {friendId} = useParams();
  const navigate = useNavigate();

  function startMessage(data: ChatForm) {
    api.startMessage(friendId as string, data.text).then(res => {
      navigate(`/chat/${res.chatId}`);
    }).catch(err => {
      console.error(err.message);
    })
  }

  return <article className={styles["chat-panel"]}>
    <ul></ul>
    <form onSubmit={handleSubmit(startMessage)}>
      <input {...register("text")} placeholder="type your message here..." />
      <button>Send</button>
    </form>
  </article>
}

interface ChatForm {
  text: string;
}