import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleButton from "./components/GoogleButton"
import ManualLogin from "./components/ManualLogin"
import {useAuthenticator} from "./hooks";

export default function App() {
  return <div>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="chats" element={<ChatListPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider >
  </div>
}

function HomePage() {
  return <div className="Home">
    <h1>Chatify</h1>
    <p>Sign in with Google to continue</p>
    <GoogleButton />
    <ManualLogin/>
  </div>
}

function ChatListPage() {
  // bounce user if not authenticated
  useAuthenticator();
  return <div className="ChatList">
    <h1>Chat List</h1>
    <p>Chat list goes here</p>
    <p>Create a new chat room</p>
  </div>
}