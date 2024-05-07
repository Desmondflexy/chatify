import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatApp from "./components/ChatApp";
import NotFound from "./components/NotFound";
import AuthPage from "./components/AuthPage";

export default function App() {
  return <div>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Navigate to="chat" replace />} /> {/* redirect to chat page */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="chat/*" element={<ChatApp />} />
          <Route path="*" element={< NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider >
  </div>
}