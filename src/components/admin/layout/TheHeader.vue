<template>
  <div id="app">
    <aside class="sidebar">
      <div class="brand-logo">
        <router-link to="/admin" class="link">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/953/630/original/travel-tour-logo-template-design-illustration-vector.jpg"
            alt="NutFlix" />
          <h2>NutFlix</h2>
        </router-link>
      </div>
      <router-link to="/add-new-tour" class="link">
        <button class="submit-movie-btn">Submit New Tour</button>
      </router-link>
      <ul class="menu">
        <router-link to="/admin" class="link">
          <font-awesome-icon icon="fa-solid fa-house" class="icon" />
          <li class="nav-link-title">Home</li>
        </router-link>
        <hr />
        <router-link to="/advising-requests" class="link">
          <font-awesome-icon icon="fa-solid fa-file-contract" class="icon" />
          <li class="nav-link-title">Advising Request</li>
        </router-link>
        <hr />
        <router-link to="booking-requests" class="link">
          <font-awesome-icon icon="fa-solid fa-receipt" class="icon" />
          <li class="nav-link-title">Booking Request</li>
        </router-link>
        <hr />
        <router-link to="/admin/tours" class="link">
          <font-awesome-icon icon="fa-solid fa-location-dot" class="icon" />
          <li class="nav-link-title">Tours</li>
        </router-link>
        <hr />
        <router-link to="/admin/categories" class="link">
          <font-awesome-icon icon="fa-solid fa-layer-group" class="icon" />
          <li class="nav-link-title">Categories</li>
        </router-link>
        <hr />
        <router-link to="/admin/users" class="link">
          <font-awesome-icon icon="fa-solid fa-user" class="icon" />
          <li class="nav-link-title">Users</li>
        </router-link>
        <hr />
        <router-link to="/admin/charts" class="link">
          <font-awesome-icon icon="fa-solid fa-chart-pie" class="icon" />
          <li class="nav-link-title">Charts</li>
        </router-link>
      </ul>
    </aside>
    <header class="header">
      <div class="header-left">
        <button class="menu-toggle-btn">
          <font-awesome-icon icon="fa-solid fa-bars" class="icon" />
        </button>
        <router-link to="/admin" class="link">
          <button class="back-home-btn">
            <font-awesome-icon icon="fa-solid fa-house" class="icon" />
            Back Home
          </button>
        </router-link>
      </div>
      <div class="header-right">
        <div class="notifications">
          <router-link to="/admin/notifications" class="link">
            <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
          </router-link>
        </div>
        <div class="user-profile">
          <font-awesome-icon icon="fa-solid fa-user" class="icon" />
          <span class="user-name"> {{ user.fullname || "User" }}</span>
        </div>
        <div class="logout-btn">
          <button @click="handleLogout" class="button-login">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="icon" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: "AdminLayout",
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
#app {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.icon {
  color: #003c71;
  font-size: 1.5rem;
}
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.link {
  text-decoration: none;
  color: #000;
}
.brand-logo {
  margin-bottom: 20px;
}
.brand-logo .link {
  display: flex;
  align-items: center;
}
.brand-logo img {
  width: 70px;
  margin-right: 10px;
  border-radius: 50%;
}
.brand-logo h2 {
  font-size: 1.5rem;
  color: #6c5ce7;
  font-weight: 600;
}
.submit-movie-btn {
  background: linear-gradient(90deg, #6c5ce7, #00b894);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 30px;
  cursor: pointer;
}
.menu {
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.menu hr {
  margin: 0;
}
.menu .link {
  margin: 0;
  padding: 15px 0;
  display: flex;
  align-items: center;
}
.menu .link .icon {
  margin-left: 10px;
}
.menu .link li {
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  display: block;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background 0.3s ease;
}
.menu .link:hover {
  background-color: #6c5ce7;
  color: white;
  border-radius: 4px;
}
.header {
  width: calc(100% - 250px);
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgb(224, 220, 220);
}
.header-left,
.header-right {
  display: flex;
  align-items: center;
}
.header-right {
  width: 15%;
}
.menu-toggle-btn,
.back-home-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 20px;
}
.notifications {
  margin-right: 20px;
  position: relative;
  display: flex;
  align-items: center;
}
.notifications .link {
  display: flex;
  align-items: center;
}
.notifications .link .icon {
  width: 100%;
}
.user-profile {
  display: flex;
  align-items: center;
}
.user-name {
  font-size: 1rem;
  font-weight: 600;
  margin-left: 10px;
}
.logout-btn {
  margin-left: 20px;
}
</style>