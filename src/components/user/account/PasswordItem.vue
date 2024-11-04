<template>
    <Transition name="form">
      <div class="row form" v-if="show">
        <h4><slot name="header"></slot></h4>
        <div class="button">
          <button
            class="btn btn-primary"
            type="button"
            @click="showPasswordModal = true"
          >
            Thay đổi mật khẩu
          </button>
          <Teleport to=".formPass">
            <PasswordModal
              :show="showPasswordModal"
              @close="showPasswordModal = false"
            />
          </Teleport>
        </div>
      </div>
    </Transition>
  </template>
  
  <script>
  import { ref } from "vue";
  import PasswordModal from "./PasswordModal.vue";
  
  export default {
    props: {
      show: {
        type: Boolean,
        required: false,
      },
    },
    components: {
      PasswordModal,
    },
    setup() {
      const showPasswordModal = ref(false);
      const closePasswordModal = () => {
        showPasswordModal.value = false;
      };
      return { showPasswordModal, closePasswordModal };
    },
    emits: ["close"],
  };
  </script>
  
  <style scoped>
  h4 {
    margin-bottom: 30px;
  }
  .button {
    margin-top: 30px;
    text-align: right;
    padding-right: 10%;
  }
  </style>
  