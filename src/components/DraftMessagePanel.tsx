import { useForm } from "react-hook-form";
import styles from "./ChatApp.module.css";
import api from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect } from "react";
import viteImg from "/vite.svg";

export default function DraftMessagePanel() {
    const { handleSubmit, register } = useForm<ChatForm>();
    const [searchParams] = useSearchParams();
    const cPin = searchParams.get("cPin");
    const navigate = useNavigate();

    useEffect(() => {
        api.findChatWithUser(cPin as string)
            .then(data => {
                if (data) navigate(`/chat/${data}`);
            })
            .catch(err => {
                console.error(err.message);
            });
    })

    const sendMessage = (data: ChatForm) => {
        api.startMessage(cPin as string, data.text)
            .then(res => {
                navigate(`/chat/${res.chatId}`);
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    return (
        <article className={styles["chat-panel"]}>
            <div>
                <IoIosArrowBack onClick={() => navigate("/chat")} />
                <img src={viteImg} alt="profile" />
                <h2>{'User'}</h2>
                <SlOptionsVertical />
            </div>
            <ul></ul>
            <form onSubmit={handleSubmit(sendMessage)} style={{height: '61px'}}>
                <textarea {...register("text")} placeholder="type your message here..." ></textarea>
                <button>Send</button>
            </form>
        </article>
    );
}

interface ChatForm {
    text: string;
}