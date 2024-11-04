<!-- <template>
  <Transition name="modal">
    <div class="modal" v-if="show">
      <div class="modal-content">
        <h4>
          <slot name="header">
            <button @click="$emit('close')" class="close-button">X</button>
          </slot>
        </h4>
        <div class="col-md-6">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
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
              class="form-control"
              :value="user.phone"
            />
          </div>
        </div>
        <div class="button">
          <button
            class="btn btn-primary"
            type="submit"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import { ref, watch } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const form = ref({ ...props.user });
        watch(
      () => props.user,
      (newUser) => {
        form.value = { ...newUser };
      }
    );

    const save = () => {
      console.log("Saved user info:", form.value);
      // After saving, close the modal
      this.$emit("close");
    };

    return { user, form, save };
  },
};
</script> -->
