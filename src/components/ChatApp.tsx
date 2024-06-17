import { useAuthenticator } from "../utils/hooks";
import MiniHeader from "./MiniHeader";
import { BiLoaderAlt } from "react-icons/bi";
import Styles from "./ChatApp.module.css";
import UserChatList from "./UserChatList";
import ChatPanel from "./ChatPanel";
import { Route, Routes } from "react-router-dom";
import DraftMessagePanel from "./DraftMessagePanel";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";

export default function ChatApp() {
    const user = useAuthenticator();

    if (!user) return <BiLoaderAlt size={50} />;

    return <div className={Styles.chatApp}>
        <MiniHeader user={user} />
        <Routes>
            <Route path="" element={<UserChatList userId={user.id} />} />
            <Route path="profile" element={<UserProfile userId={user.id} />} />
            <Route path=":chatId" element={<ChatPanel userId={user.id} />} />
            <Route path="draft" element={<DraftMessagePanel />} />
            <Route path="*" element={< NotFound />} />
        </Routes>
    </div>
}