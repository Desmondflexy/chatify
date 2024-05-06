import { useAuthenticator } from "../utils/hooks";
import MiniHeader from "./MiniHeader";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import Modal from "./Modal";
import Styles from "./ChatApp.module.css";
import UserChatList from "./UserChatList";
import FindFriendForm from "./FindFriendForm";
import ChatPanel from "./ChatPanel";

export default function ChatApp() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const user = useAuthenticator();

  if (!user) return <BiLoaderAlt />;

  return <div className={Styles.chatApp}>
    <MiniHeader user={user} />

    <aside>
      <button onClick={() => setModalVisibility(true)}>New chat</button>
      <UserChatList />
    </aside>

    <ChatPanel />


    {/* ====================================================================== */}

    {/* modal: search for a friend to chat with */}
    {modalVisibility &&
      <Modal setVisibility={setModalVisibility} >
        <FindFriendForm setVisibility={setModalVisibility} />
      </Modal>}

  </div>
}

