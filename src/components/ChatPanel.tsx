import React, { useRef, useState } from "react";
import api from "../utils/api";
import styles from "./ChatPanel.module.css";
import { useAuthenticator, useScrollToElement } from "../utils/hooks";
import { useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { Socket } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

export default function ChatPanel({ socket }: { socket: Socket }) {
    const [state, setState] = useState<State>({ messages: [] });
    const { chatId } = useParams();
    const { register, handleSubmit, reset } = useForm<ChatForm>();
    const user = useAuthenticator();
    const navigate = useNavigate();

    // load chat messages
    React.useEffect(() => {
        api.fetchChatMessages(chatId as string)
            .then(res => {
                setState(s => ({ ...s, messages: res }))
            }).catch(err => {
                console.error(err.message);
                navigate('/chat')
            });
    }, [chatId, navigate]);

    React.useEffect(() => {
        // join chat room
        socket.emit('joinChat', chatId);
        // receive messages from the server
        socket.on('receiveMessage', data => {
            console.log(data);
            const {_id, createdAt, sender, text} = data;
            setState(s => ({ ...s, messages: [...s.messages, {_id, createdAt, sender, text}] }));
        });

        return () => {
            socket.off('receiveMessage');
            socket.emit('leaveChat', chatId);
        }
    }, [chatId, socket])


    const msgRef = useRef<HTMLParagraphElement | null>(null);
    useScrollToElement(msgRef);

    if (!user) return <BiLoaderAlt size={50} />;

    return <article className={styles["chat-panel"]}>
        <div className={styles["header"]}>
            <h3>User</h3>
        </div>
        <ul>
            {state.messages.map((msg, index) => <li className={isFirstPerson(msg.sender._id) ? styles.user1 : styles.user2} key={msg._id}>
                <h4>{msg.sender.displayName} ({msg.createdAt})</h4>
                <p ref={isLastMessage(index) ? msgRef : null}>{msg.text}</p>
            </li>)}
        </ul>
        <form onSubmit={handleSubmit(sendMessage)}>
            <input {...register("text")} placeholder="type your message here..." />
            <button>Send</button>
        </form>
    </article>

    function isFirstPerson(userId: string) {
        return userId === user?.id;
    }


    function sendMessage(data: ChatForm) {
        console.log('calling sendMessage function...')
        if (data.text) {
            socket.emit('sendMessage', {chatId, userId: user?.id, text: data.text});
            reset();
        }
    }

    function isLastMessage(index: number) {
        return index === state.messages.length - 1;
    }
}

interface IMessage {
    text: string;
    sender: IUser;
    createdAt: string
    _id: string;
}

interface State {
    messages: IMessage[];
}

interface ChatForm {
    text: string;
}

interface IUser {
    email: string;
    displayName: string;
    picture: string;
    phone: string;
    _id: string;
}