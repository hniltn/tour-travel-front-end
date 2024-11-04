<template>
    <Transition name="form">
      <div class="row info" v-if="show">
        <h4><slot name="header"></slot></h4>
        <div class="col-md-6">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              disabled="disabled"
              class="form-control"
              :value="user.username"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="fullname">Họ tên</label>
            <input
              type="text"
              disabled="disabled"
              class="form-control"
              :value="user.fullname"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              disabled="disabled"
              class="form-control"
              :value="user.email"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input
              type="text"
              disabled="disabled"
              class="form-control"
              :value="user.phone"
            />
          </div>
        </div>
        <div class="button">
          <button
            class="btn btn-primary"
            id="show-modal"
            @click="showModal = true"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
    </Transition>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      ...mapGetters("auth", ["isAuthenticated", "user"]),
    },
    created() {
      this.fetchUserInfo();
    },
    methods: {
      ...mapActions("auth", ["fetchUserInfo"])
  
    },
    emits: ["close"],
  };
  </script>
  <style scoped>
  h4 {
    margin-bottom: 30px;
    color: #000;
  }
  .form-group {
    flex: 1;
    min-width: 40%;
    margin: 20px 0;
    text-align: left;
    width: 80%;
  }
  .form-group label {
    font-size: 20px;
    font-weight: 500;
    color: black;
    padding-left: 5px;
  }
  .button {
    margin-top: 30px;
    text-align: right;
    padding-right: 10%;
  }
  </style>
  