import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/Home";
import ChatApp from "./components/ChatApp";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/AuthPage";

export default function App() {
  return <div>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          {/* <Route path="" element={<HomePage />} /> */}
          <Route path="" element={<ChatApp />} />
          <Route path="*" element={< NotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider >
  </div>
}