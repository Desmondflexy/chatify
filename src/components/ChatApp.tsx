import { useAuthenticator } from "../utils/hooks";
import MiniHeader from "./MiniHeader";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import Modal from "./Modal";
import Styles from "./ChatApp.module.css";
import UserChatList from "./UserChatList";
import FindFriendForm from "./FindFriendForm";
import ChatPanel from "./ChatPanel";
import { Route, Routes } from "react-router-dom";
import DraftMessagePanel from "./DraftMessagePanel";
import UserProfile from "./UserProfile";

export default function ChatApp() {
    const [modalVisibility, setModalVisibility] = useState(false);
    const user = useAuthenticator();

    if (!user) return <BiLoaderAlt size={50} />;

    return <div className={Styles.chatApp}>
        <MiniHeader user={user} />
        <Routes>
            <Route path="" element={<UserChatList userId={user.id} setModalVisibility={setModalVisibility} />} />
            <Route path="profile" element={<UserProfile userId={user.id} />} />
            <Route path=":chatId" element={<ChatPanel userId={user.id} />} />
            <Route path="draft/:friendId" element={<DraftMessagePanel />} />
        </Routes>


        {/* modal: search for a friend to chat with */}
        {modalVisibility &&
            <Modal setVisibility={setModalVisibility} >
                <FindFriendForm setVisibility={setModalVisibility} />
            </Modal>}
    </div>
}


