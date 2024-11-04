import userService from "@/services/user.service";
const state = {
  token: localStorage.getItem("token") || null,
  user: null,
  allUsers: [],
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  CLEAR_AUTHDATA(state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem("token");
  },
  UPDATE_USER(state, updatedUser) {
    state.user = { ...state.user, ...updatedUser };
  },
  UPDATE_USER_PASSWORD(state, newPassword) {
    if (state.user) {
      state.user.password = newPassword;
    }
  },
  SET_ALL_USERS(state, users) {
    state.allUsers = users;
  },
};

const actions = {
  async login({ commit }, { username, password, router }) {
    const { user, token } = await userService.login(username, password);
    commit("SET_USER", user);
    commit("SET_TOKEN", token);
    if (user.role === "0") {
      router.push("/");
    } else {
      router.push("/admin");
    }
    return user;
  },
  async logout({ commit }) {
    await userService.logout();
    commit("CLEAR_AUTHDATA");
  },
  async register({ commit }, userData) {
    const existingUsers = await userService.checkUsername(userData.username);
    if (existingUsers.length > 0) {
      return alert("Tên người dùng đã tồn tại. Vui lòng chọn tên khác.");
    }
    const newUser = await userService.register(userData);
    console.log("New user data:", newUser);
    if(newUser.id && newUser){
      const token = userService.generateToken(newUser);
      console.log("Token:", token);
      commit("SET_USER", newUser);
      commit("SET_TOKEN", token);
      return newUser;
    } else {
      throw new Error("Đăng ký thất bại");
    }
    
  },
  async updateUserInfo({ commit }, updatedInfo) {
    const updatedUser = await userService.updateUserInfo(updatedInfo);
    if (updatedUser) {
      commit("UPDATE_USER", updatedUser);
    }
    return updatedUser;
  },
  async changePassword({ commit, state }, { oldPassword, newPassword }) {
    const result = await userService.changePassword(
      state.user.id,
      oldPassword,
      newPassword
    );
    if (result.success) {
      commit("UPDATE_USER_PASSWORD", newPassword);
      return result;
    } else {
      throw new Error(result.message || "Đổi mật khẩu thất bại");
    }
  },
  async fetchUserInfo({ commit }) {
    try {
      const user = await userService.getUserInfo();
      console.log("user info in store", user);
      commit("SET_USER", user);
    } catch (error) {
      console.error("Không thể lấy thông tin người dùng:", error);
    }
  },
  async initializeAuth({ commit }) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await userService.getUserInfo();
        commit("SET_USER", user);
        commit("SET_TOKEN", token);
      } catch (error) {
        console.error("Không thể khởi tạo xác thực:", error);
        commit("CLEAR_AUTHDATA");
      }
    }
  },
  async getAllUsers({ commit }) {
    const users = await userService.getAllUsers();
    commit("SET_ALL_USERS", users);
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user || {},
  token: (state) => state.token,
  userImage: (state) => {
    return state.user && state.user.img
      ? state.user.img
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-JzZERgnXj2s418pV61L5J-AYU7n45FxNQ&s";
  },
  allUsers: (state) => state.allUsers || [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
