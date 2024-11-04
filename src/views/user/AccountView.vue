<template>
  <div class="containerAcc">
    <div class="wrapper">
      <div class="profile">
        <div class="avatar">
          <img :src="userImage" alt="" />
          <h4 class="text-center">{{ user.fullname }}</h4>
        </div>
        <hr />
        <div class="nav-pills">
          <nav class="nav-link" @click="activeTab = 'user'" :class="{active: activeTab === 'user'}">
            <font-awesome-icon icon="fa-solid fa-user" class="icon"/>
            <li class="nav-link-title">Thông tin tài khoản</li>
          </nav>
          <hr />
          <nav class="nav-link" @click="activeTab = 'password'" :class="{active: activeTab === 'password'}" >
            <font-awesome-icon icon="fa-solid fa-key" class="icon"/>
            <li class="nav-link-title">Mật khẩu</li>
          </nav>
        </div>
      </div>
      <div class="content">
        <UserInfo
          v-if="activeTab === 'user'"
          :show="true"
          @close="activeTab = ''"
        >
          <template #header>
            <h4 style="color: #000">Thông tin tài khoản</h4>
          </template>
        </UserInfo>
        <PasswordItem
          v-if="activeTab === 'password'"
          :show="true"
          @close="activeTab = ''"
        >
          <template #header>
            <h4 style="color: #000">Mật khẩu</h4>
          </template>
        </PasswordItem>
      </div>
    </div>
    <div class="formPass"></div>
  </div>
</template>
<script>
import PasswordItem from "@/components/user/account/PasswordItem.vue";
import UserInfo from "@/components/user/account/UserInfo.vue";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    UserInfo,
    PasswordItem,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user"]),
    userImage() {
      return this.user && this.user.img
        ? this.user.img
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-JzZERgnXj2s418pV61L5J-AYU7n45FxNQ&s";
    },
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    ...mapActions("auth", ["fetchUserInfo"]),
  },
  setup() {
    const activeTab = ref("");
    return { activeTab };
  },
};
</script>
<style scoped>
.containerAcc {
  background-color: #f9f9f9;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 2;
}
.containerAcc .wrapper {
  display: flex;
  flex-direction: row;
  padding: 5% 5%;
  width: 100%;
}
.profile {
  float: left;
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}
.profile .avatar {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.profile .avatar img,
.profile .avatar .icon {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 5px solid #fff;
}
.avatar .text-center {
  font-weight: 700;
  font-size: 24px;
  padding: 20px 0px 0px;
  color: #000;
  text-align: center;
}
hr {
  margin: 0;
}
.nav-pills .nav-link {
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 15px 0;
}
.nav-pills .nav-link .icon {
  margin-left: 10px;
}
.nav-pills .nav-link:hover,
.nav-pills .nav-link:active,
.nav-pills .nav-link:focus {
  background-color: #003c71;
  color: #fff;
}
.nav-link li {
  padding-left: 30px;
  list-style-type: none;
  font-size: 20px;
}
.content {
  float: right;
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  justify-content: space-between;
}
.content h4 {
  font-size: 40px;
  font-weight: 600;
  text-align: center;
}
</style>