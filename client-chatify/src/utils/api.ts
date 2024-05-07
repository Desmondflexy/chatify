/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

function apiSetup() {
  let baseURL = "http://localhost:3000";
  if (import.meta.env.VITE_APP_NODE_ENV === "production") {
    baseURL = import.meta.env.VITE_APP_SERVER;
  }

  const myApi = axios.create({ baseURL, withCredentials: true });

  myApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return myApi;
}

const myApi = apiSetup();


class MyApi {
  handleError(error: any) {
    const {data} = error.response;
    throw new Error(data);
  }

  async getMe() {
    try {
      const response = await myApi.get("/users/me");
      const user = response.data
      return user;
    } catch (err) {
      this.handleError(err);
    }
  }

  async logMeIn(data: { email: string; password: string }) {
    try {
      const response = await myApi.post('/auth/login', data);
      const { token } = response.data;
      return token
    } catch (error) {
      this.handleError(error);
    }
  }

  async googleLogin(data: { id: string; name: string; email: string }) {
    try {
      const response = await myApi.post('/auth/google', data);
      const { token } = response.data;
      return token;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchUserChats() {
    try {
      const response = await myApi.get('/chat');
      const { chats } = response.data;
      return chats;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    try {
      const response = await myApi.get('/auth/logout');
      const { message } = response.data;
      return message;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchChatMessages(chatId: string) {
    try {
      const response = await myApi.get('chat/' + chatId);
      const { messages } = response.data;
      return messages;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await myApi.get(`/users?email=${email}`);
      return user;
    } catch (error) {

      this.handleError(error);
    }
  }
}


const api = new MyApi();

export default api;