<template>
    <header>
      <div class="container1">
        <div class="header-left">
          <router-link to="/">
            <img src="https://static.vecteezy.com/system/resources/previews/002/953/630/original/travel-tour-logo-template-design-illustration-vector.jpg" alt="Logo" class="rounded-circle"/>
          </router-link>
        </div>
        <div class="header-center">
          <div class="item" v-for="category in allCategories" :key="category.id" :class="{active:category.id === selectedCategory}">
            <router-link :to="{ name: 'category', params: { id: category.id } }" class="link" @click="selectCategory(category.id)">{{ category.name }}</router-link>
          </div>
        </div>
        <div class="header-right">
          <div class="item container-user" @click="toggleDropdown" v-if="shouldShowUserInfo">
            <img :src="userImage" alt="" />
            <router-link to="/account" class="fullName">
              <span class="text">{{ user.fullname || user.username }}</span>
            </router-link>
            <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
            <div class="content">
              <router-link to="/booked" class="button-login">
                <button>Tour đã đặt</button>
              </router-link>
              <router-link to="/login" class="button-login">
                <button @click="handleLogout">Đăng xuất</button>
              </router-link>
            </div>
          </div>
          <div class="item container-user" @click="toggleDropdown" v-else>
            <font-awesome-icon icon="fa-solid fa-circle-user" class="icon icon-user"/>
            <span class="text">Tài khoản</span>
            <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
            <div class="content">
              <router-link to="/login" class="button-login">
                <button>Đăng nhập</button>
              </router-link>
              <div> Chưa có tài khoản?
                <router-link to="/register">Đăng ký</router-link> ngay
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    data() {
      return {
        selectedCategory: null
      }
    },
    computed: {
      ...mapGetters("auth", ["isAuthenticated", "user"]),
      ...mapGetters("categories", ["allCategories"]),
      userImage() {
        return this.user && this.user.img
          ? this.user.img
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-JzZERgnXj2s418pV61L5J-AYU7n45FxNQ&s";
      },
      shouldShowUserInfo() {
        return this.isAuthenticated && this.user.role !== "1" && this.$route.path !== "/login";
      }
    },
    created() {
      this.getAllCategory();
      console.log(this.isAuthenticated);
      if (this.isAuthenticated) {
        this.fetchUserInfo();
      }
    },
    methods: {
      ...mapActions("auth", ["logout", "fetchUserInfo"]),
      ...mapActions("categories", ["getAllCategory"]),
      async handleLogout() {
        await this.logout();
        this.$router.push("/login");
      },
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
      }
    },
  };
  </script>
  <style scoped>
  header {
    width: 100%;
    height: 5rem;
    background-color: #003c71;
    display: flex;
  }
  .container1 {
    width: 90%;
    display: flex;
    flex-direction: row;
    margin: 0 5%;
  }
  .header-left {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-left img {
    width: 70px;
    justify-content: center;
  }
  .header-center {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
  }
  .item {
    margin-left: 24px;
  }
  .item .link {
    font-size: 20px;
    color: #fff;
    text-decoration: none;
  }
  .item:hover .link,
  .item.active .link {
    cursor: pointer;
    color: #ffc709;
  }
  .header-right {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .container-user {
    position: relative;
    margin-right: 0px 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .container-user img {
    width: 50px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
  }
  .container-user .fullName {
    text-decoration: none;
    margin: 0 5px;
  }
  .item .icon {
    color: #fff;
    font-size: 24px;
    margin-right: 8px;
  }
  .item .text {
    font-size: 18px;
    color: white;
  }
  .item:hover .icon,
  .item:hover .text {
    cursor: pointer;
    color: #f79321;
  }
  .container-user .content {
    display: none;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    flex-direction: column;
    width: 220px;
    padding: 12px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: #000;
    justify-content: left;
    top: 100%;
    left: 0;
  }
  .container-user .content .button-login {
    margin: 10px 0;
    border: none;
  }
  .container-user .content .button-login button {
    width: 100%;
    border: none;
    margin-top: 10px;
    background-color: #003c71;
    color: #ccc;
    font-weight: 600;
    border-radius: 4px;
    padding: 8px;
  }
  .container-user .content .button-login:hover button {
    opacity: 0.8;
    cursor: pointer;
  }
  .container-user .content div {
    margin-top: 8px;
    font-size: 14px;
    color: #000;
  }
  .container-user:hover .content {
    display: block;
  }
  </style>