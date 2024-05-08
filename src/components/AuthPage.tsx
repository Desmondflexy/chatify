import GoogleButton from "./GoogleButton";
import ManualLogin from "./ManualLogin";


export default function AuthPage() {
  return <div className="Home">
    <h1>Chatify</h1>
    <p>Sign in with Google to continue</p>
    <GoogleButton />
    <ManualLogin />
  </div>
}