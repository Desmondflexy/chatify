import { useEffect, useRef, useState } from "react";
import {useParams } from "react-router-dom";
import api from "../utils/api";
import styles from "./ChatPanel.module.css";
import { useAuthenticator, useScrollToElement } from "../utils/hooks";
import { useForm } from "react-hook-form";

export default function ChatPanel() {
  const [state, setState] = useState<State>({
    messages: []
  });
  const { chatId } = useParams();
  const { register, handleSubmit } = useForm<ChatForm>();
  const user = useAuthenticator();
  console.log(user);

  useEffect(() => {
    api.fetchChatMessages(chatId as string)
      .then(res => {
        setState(s => ({ ...s, messages: res }))
      }).catch(err => {
        console.error(err.message);
      });
  }, [chatId]);

  const msgRef = useRef<HTMLParagraphElement | null>(null);
  useScrollToElement(msgRef);

  return <article className={styles["chat-panel"]}>
    <h2>Your chat with {''}</h2>
    <ul>
      {state.messages.map((msg, index) => <li key={msg._id}>
        <h4>{msg.sender.displayName} ({msg.createdAt})</h4>
        <p ref={isLastMessage(index) ? msgRef : null}>{msg.text}</p>
      </li>)}
    </ul>
    <form onSubmit={handleSubmit(sendMessage)}>
      <textarea {...register("text")} placeholder="type your message here..." rows={1} />
      <button>Send</button>
    </form>
  </article>


  function sendMessage(data: ChatForm) {
    api.sendMessage(chatId as string, data.text)
      .then(res => {
        setState(s => ({ ...s, messages: [...s.messages, res] }));
      }).catch(err => {
        console.error(err.message);
      });
  }

  function isLastMessage(index: number) {
    return index === state.messages.length - 1;
  }
}

interface Message {
  createdAt: string;
  sender: {
    _id: string;
    displayName: string;
  };
  text: string;
  _id: string;
}

interface State {
  messages: Message[];
}

interface ChatForm {
  text: string;
}