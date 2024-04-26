import { useAuthenticator, ChatPageContext } from "../hooks";
import MiniHeader from "./MiniHeader";
import { BiLoaderAlt } from "react-icons/bi";
import CreateGroupForm from "../modals/CreateGroup";
import { useState } from "react";

export default function ChatApp() {
  const [formVisible, setFormVisible] = useState(false);
  const user = useAuthenticator();

  function showForm() {
    setFormVisible(true);
  }

  if (!user) return <BiLoaderAlt />;
  return <div className="ChatList">
    <ChatPageContext.Provider value={user}>
      <MiniHeader />
      <h2>Hi, {user.displayName}!</h2>
      <button>Click to start a new chat</button>
      {/* <p>Chat list goes here</p> */}
      {/* <button onClick={showForm}>Create a new chat room</button>
      {formVisible && <CreateGroupForm setFormVisible={setFormVisible} />} */}
    </ChatPageContext.Provider>
  </div>
}