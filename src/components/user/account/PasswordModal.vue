<template>
    <Transition name="modal" class="modal">
      <div class="modal-content w3-modal-content w3-card-4 w3-animate-zoom" v-if="show">
        <h3 class="modal-title">Thay đổi mật khẩu</h3>
        <form @submit.prevent="submitForm" class="modal-body">
          <div class="form-group">
            <label for="oldPassword">Mật khẩu cũ:</label>
            <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" />
          </div>
          <div class="form-group">
            <label for="newPassword">Mật khẩu mới:</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword" />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Nhập lại mật khẩu mới:</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" />
          </div>
          <div class="button">
            <button class="btn btn-primary" type="submit">Lưu</button>
            <button class="btn btn-danger" type="button" @click="closeModal">Hủy bỏ</button>
          </div>
        </form>
      </div>
    </Transition>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    show: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["close"],
  setup(props, {emit}) {
    const store = useStore();
    const oldPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');

    const submitForm = async() => {
      if (newPassword.value !== confirmPassword.value) {
        alert("Mật khẩu mới không trùng khớp");
        return;
      }
      try {
        await store.dispatch('auth/changePassword', {
          oldPassword: oldPassword.value,
          newPassword: newPassword.value
        });
        alert("Đổi mật khẩu thành công!");
        emit('close');
        resetModal();
      } catch (error) {
        alert("Đổi mật khẩu thất bại!", error.message);
      }
    };

    const closeModal = () => {
      emit('close')
      resetModal();
    }
    const resetModal = () => {
      oldPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    }
    return { oldPassword, newPassword, confirmPassword, submitForm, closeModal };
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  z-index: 9998;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s ease;
  background-color: white;
}
.modal-content {
  padding: 30px;
}
.modal-title {
  font-size: 30px;
  font-weight: 600;
}
.modal-body {
  text-align: justify;
  line-height: 2;
}
.button {
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: justify;
}
.button button {
  width: 30%;
  margin: 5px 10px 5px 0;
}
</style>
