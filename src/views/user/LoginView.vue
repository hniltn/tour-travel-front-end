<template>
    <div class="container1">
      <div class="wrapper">
        <div class="title">Đăng nhập</div>
        <form @submit.prevent="handleLogin" class="formLogin">
          <div class="inputValue">
            <input
              type="username"
              name="username"
              placeholder="username"
              v-model="username"
            />
          </div>
          <div class="inputValue">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              v-model="password"
            />
          </div>
          <button variant="primary" class="buttonLogin" type="submit">
            Đăng nhập
          </button>
        </form>
        <div class="linktext">
          <router-link to="/forgetPassword" class="link"
            >Quên mật khẩu</router-link
          >
          <router-link to="/register" class="link">Tạo tài khoản mới</router-link>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapActions } from "vuex";
  export default {
    name: "LoginView",
    data() {
      return {
        username: "",
        password: "",
        error: null,
      };
    },
    methods: {
      ...mapActions("auth", ["login"]),
      async handleLogin() {
        if (!this.username || !this.password)
          return alert("Vui lòng điền đầy đủ thông tin");
        try {
          await this.login({ username: this.username, password: this.password, router: this.$router });
        } catch (err) {
          this.error = "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập"
          console.error(err);
        }
      },
    },
  };
  </script>
  <style scoped>
  .container1 {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url("https://ma.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  
  .wrapper {
    width: 40%;
    padding: 50px;
    background-color: white;
    border-radius: 2.5%;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 36px;
    text-align: center;
    font-weight: 600;
  }
  .formLogin {
    display: flex;
    flex-direction: column;
  }
  
  .inputValue input {
    width: 100%;
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
  }
  
  /* .inputValue input: {
    border: solid 1px darkblue;
  } */
  
  .buttonLogin {
    border: none;
    padding: 15px 20px;
    background-color: #006680;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    width: 100%;
  }
  
  .linktext {
    display: flex;
    justify-content: space-between;
  }
  
  .link {
    margin: 5px 0px;
    font-size: 18px;
    text-decoration: none;
    cursor: pointer;
    /* color: #006680; */
  }
  </style>
  