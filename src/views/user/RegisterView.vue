<template>
    <div class="container1">
      <div class="wrapper">
        <div class="title">Đăng ký</div>
        <form @submit.prevent="handleRegister" class="formRegister">
          <div class="inputValue">
            <input
              type="text"
              name="username"
              placeholder="username"
              v-model="username"
              class="form-control"
            />
          </div>
          <div class="inputValue">
            <input
              type="text"
              name="fullname"
              placeholder="Họ tên"
              v-model="fullname"
              class="form-control"
            />
          </div>
          <div class="inputValue">
            <input
              type="email"
              name="email"
              placeholder="Email"
              v-model="email"
              class="form-control"
            />
          </div>
          <div class="inputValue">
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              v-model="phone"
              class="form-control"
            />
          </div>
          <div class="inputValue">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              v-model="password"
              class="form-control"
            />
          </div>
          <div class="inputValue">
            <input
              type="password"
              name="repeatPassword"
              placeholder="Nhập lại mật khẩu"
              v-model="repeatPassword"
              class="form-control"
            />
          </div>
  
          <button variant="primary" class="buttonRegister" type="submit">
            Tạo tài khoản
          </button>
        </form>
        <p class="mt-3" style="text-align: center">
          Bạn đã có tài khoản ?
          <router-link to="/login" class="link">Đăng nhập</router-link>
        </p>
      </div>
    </div>
  </template>
  <script>
  import { mapActions } from "vuex";
  export default {
    name: "RegisterView",
    data() {
      return {
        username: "",
        fullname: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        img: "",
        role: "0"
      };
    },
    computed: {
      samePassword() {
        return this.password === this.repeatPassword;
      },
    },
    methods: {
      ...mapActions("auth", ["register"]),
      async handleRegister() {
        if (
          !this.username ||
          !this.fullname ||
          !this.email ||
          !this.phone ||
          !this.password ||
          !this.repeatPassword
        )
          return alert("Vui lòng điền đầy đủ thông tin");
        if (!this.samePassword) {
          return alert("Mật khẩu không trùng khớp");
        }
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(this.email)) {
          return alert("Email không hợp lệ");
        }
        await this.register({
          id: this.id,
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          phone: this.phone,
          password: this.password,
          img: this.img,
          role: this.role
        });
        this.$router.push("/login");
      },
    },
    constructor() {
  this.generateToken = this.generateToken.bind(this);
}

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
  }
  .wrapper {
    width: 40%;
    padding: 20px;
    background-color: white;
    border-radius: 2.5%;
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 36px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .formRegister {
    display: flex;
    flex-wrap: wrap;
  }
  
  .inputValue {
    flex: 1;
    min-width: 40%;
    margin: 10px 10px;
  }
  .inputValue input {
    width: 100%;
    padding: 15px;
  }
  .agreement {
    font-size: 15px;
    margin: 10px 10px;
    text-align: center;
  }
  .linkAgree {
    font-size: 15px;
    color: #006680;
    display: inline;
  }
  .buttonRegister {
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: #006680;
    color: white;
    cursor: pointer;
  }
  .buttonRegister .link {
    color: white;
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
  