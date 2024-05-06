/* eslint-disable @typescript-eslint/no-explicit-any */
import myApi from "../api.config";

class MyApi {
  handleError(error: any) {
    console.log(error);
    throw new Error(error.response.data);
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

  async logMeIn(data: {email:string; password:string}) {
    try {
      const response = await myApi.post('/auth/login', data);
      const { token } = response.data;
      return token
    } catch (error) {
      this.handleError(error);
    }
  }

  async googleLogin(data: {id:string;name:string;email:string}) {
    try {
      const response = await myApi.post('/auth/google', data);
      const {token} = response.data;
      return token;
    } catch (error) {
      this.handleError(error);
    }
  }
}


const api = new MyApi();

export default api;