import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import styles from "./ChatPanel.module.css";

export default function ChatPanel() {
  const [state, setState] = useState<State>({
    messages: []
  });
  const { chatId } = useParams();

  useEffect(() => {
    api.fetchChatMessages(chatId as string)
      .then(res => {
        setState(s => ({ ...s, messages: res }))
      }).catch(err => {
        console.error(err.message);
      });
  }, [chatId]);

  return <article className={styles["chat-panel"]}>
    <h2>Your chat with {''}</h2>
    <ul>
      {state.messages.map(i => <li>
        <h4>{i.sender.displayName} ({i.createdAt})</h4>
        <p>{i.text}</p>
      </li>)}
    </ul>
    <form>
      <textarea >type here</textarea>
      <input type="button" value="Send" />
    </form>
  </article>
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