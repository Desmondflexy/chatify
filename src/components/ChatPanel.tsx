import {useEffect, useState, useRef} from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useScrollToElement } from "../utils/hooks";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import style from "./ChatApp.module.css";
import viteImg from "/vite.svg";
import socket from "../utils/socket";
import { IoIosArrowBack } from "react-icons/io";
import { formatDate } from "../utils"

export default function ChatPanel({ userId }: { userId: string }) {
    const navigate = useNavigate();
    const [state, setState] = useState<State>({
        messages: [],
        chatName: ""
    });
    const { chatId } = useParams();
    const { register, handleSubmit, reset } = useForm<ChatForm>();
    useEffect(() => {
        socket.emit("fetchChatMessages", { chatId, userId });
        socket.on("receivedChatMessages", (data: { messages: IMessage[], chatName: string }) => {
            setState(s => ({ ...s, messages: data.messages, chatName: data.chatName }));
        });
        socket.emit("joinChat", chatId);
        socket.on("receiveMessage", (data: IMessage) => {
            setState(s => ({ ...s, messages: [...s.messages, data] }));
        });
        socket.on("error", (errorData: { error: string }) => {
            console.error(errorData.error);
            alert(errorData.error);
        });
        return () => {
            socket.off("receivedChatMessages");
            socket.off("receiveMessage");
            socket.off("error");
        }
    }, [chatId, userId]);

    const msgRef = useRef<HTMLParagraphElement | null>(null);
    useScrollToElement(msgRef);

    const messagesList = state.messages.map((message, index) => (
        <li key={message._id} className={personStyle(message.sender._id)}>
            {/* <h4>{message.sender.displayName}</h4> */}
            <p ref={isLastMessage(index) ? msgRef : null}>{message.text}</p>
            <p>{formatDate(message.createdAt)}</p>
        </li>
    ));

    return (
        <div className={style['chat-panel']}>
            <div>
                <IoIosArrowBack onClick={() => navigate("/chat")} />
                <img src={viteImg} alt="profile" />
                <h2>{state.chatName}</h2>
                <SlOptionsVertical />
            </div>
            <ul>
                {messagesList}
            </ul>
            <form onSubmit={handleSubmit(sendMessage)}>
                <textarea {...register("text")} placeholder="type your message and send..." rows={1} onKeyDown={handleKeyPress}></textarea>
                <button>Send</button>
            </form>
        </div>
    );


    function personStyle(senderId: string) {
        if (userId === senderId) {
            return style.user1;
        } else {
            return style.user2;
        }
    }

    function sendMessage(data: ChatForm) {
        if (data.text) {
            socket.emit('sendMessage', { chatId, userId, text: data.text });
            reset();
        }
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // sendMessage({text: e.currentTarget.value});
            handleSubmit(sendMessage)();
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
    chatName: string;
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