import axios, { AxiosInstance } from "axios";

class MyApi {
  private server: AxiosInstance;

  constructor() {
    let baseURL = "http://localhost:3000";
    if (import.meta.env.VITE_APP_NODE_ENV === "production") {
      baseURL = import.meta.env.VITE_APP_SERVER;
    }

    const server = axios.create({ baseURL, withCredentials: true });

    server.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.server = server;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any) {
    throw new Error(error.response.data);
  }

  async getMe() {
    try {
      const response = await this.server.get("/users/me");
      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const response = await this.server.post('/auth/login', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async googleLogin(data: { id: string; name: string; email: string }) {
    try {
      const response = await this.server.post('/auth/google', data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchUserChats() {
    try {
      const response = await this.server.get('/chat');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    try {
      const response = await this.server.get('/auth/logout');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchChatMessages(chatId: string) {
    try {
      const response = await this.server.get('chat/' + chatId);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const response = await this.server.get(`/users?email=${email}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async sendMessage(chatId: string, text: string) {
    try {
      const response = await this.server.post(`/chat/${chatId}/send`, { text });
      return response.data;
    } catch (error) {
      console.error(error)
      this.handleError(error);
    }
  }

  async startMessage(friendId: string, text: string) {
    try {
      const response = await this.server.post(`chat/friend/${friendId}`, { text });
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 409) {
        return error.response.data;
      }
      this.handleError(error);
    }
  }
}

const api = new MyApi();
export default api;