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
        const { data } = error.response;
        throw new Error(data.error);
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

    async logout() {
        try {
            const response = await this.server.get('/auth/logout');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async findUserByCPin(cPin: string) {
        try {
            const response = await this.server.get(`/users?cPin=${cPin}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async findChatWithUser(cPin: string) {
        try {
            const response = await this.server.get(`/chat?cPin=${cPin}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async startMessage(cPin: string, text: string) {
        try {
            const response = await this.server.post(`chat/new?cPin=${cPin}`, { text });
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.response);
            if (error.response.status === 409) {
                return error.response.data;
            }
            this.handleError(error);
        }
    }

    async getUser(userId: string) {
        try {
            const response = await this.server.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateUser(data: FormData) {
        try {
            const response = await this.server.put('/users/me', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export default new MyApi();