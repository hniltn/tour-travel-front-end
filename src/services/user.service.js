import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:3000/users";
const axiosInstance = axios.create({
  baseURL: API_URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const userService = {
  async getAllUsers() {
    const response = await axiosInstance.get("/");
    return response.data;
  },
  async login(username, password) {
    try {
      const response = await axiosInstance.get(`?username=${username}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === password) {
          const token = btoa(
            JSON.stringify({ id: user.id, username: user.username })
          );
          localStorage.setItem("token", token);
          console.log("Đăng nhập thành công: ", user);
          return { user, token };
        } else {
          throw new Error("Mật khẩu không hợp lệ.");
        }
      } else {
        throw new Error("Tên người dùng không tồn tại.");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error.message);
      throw error;
    }
  },
  async logout() {
    localStorage.removeItem("token");
  },
  async checkUsername(username) {
    const response = await axiosInstance.get(`?username=${username}`);
    return response.data;
  },
  async register(user) {
    try {
      const result = await axiosInstance.post(API_URL, user);
      console.log("result data", result.data); 
      if (result.status === 201) {
        if (!result.data.id) {
          throw new Error("User object or ID is missing");
        }
        const token = this.generateToken(result.data);
        console.log("Generated Token:", token);
        localStorage.setItem("token", token);
        return result.data;
      } else {
        console.error("Registration failed with status:", result.status);
        throw new Error("Đăng ký thất bại với status: ", result.status);
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  },
  async changePassword(userId, oldPassword, newPassword) {
    try {
      const response = await axiosInstance.get(`/${userId}`);
      const user = response.data;

      if (user.password != oldPassword) {
        throw new Error("Mật khẩu cũ không đúng");
      }

      const updateResponse = await axiosInstance.patch(`/${userId}`, {
        password: newPassword,
      });

      if (updateResponse.status === 200) {
        return { success: true, message: "Đổi mật khẩu thành công" };
      } else {
        throw new Error("Đổi mật khẩu thất bại");
      }
    } catch (error) {
      console.error("Đổi mật khẩu thất bại", error.message);
      throw error;
    }
  },
  generateToken(user) {
    console.log("user object in generateToken:", user); // Add this to check what `user` is
    if (!user || !user.id) {
      throw new Error("User object or ID is missing");
    }
    return btoa(
      JSON.stringify({
        id: user.id,
        username: user.username,
        exp: new Date().getTime() + 3600000,
      })
    );
  },
  isTokenValid() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp > new Date().getTime();
    } catch {
      return false;
    }
  },
  async getUserInfo() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = JSON.parse(atob(token));
      const userId = decodedToken.id;
      const response = await axiosInstance.get(`/${userId}`);
      console.log("user info", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      throw error;
    }
  },
};
export default userService;