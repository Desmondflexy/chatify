import io from "socket.io-client";

let socket = io('http://localhost:3000');
if (import.meta.env.VITE_APP_NODE_ENV === 'production') {
    socket = io(import.meta.env.VITE_APP_SERVER);
}

export default socket;