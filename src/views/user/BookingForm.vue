<template>
  <div class="booking-form">
    <div class="modal1" v-if="!isSubmitted">
      <h2>Yêu cầu đặt</h2>
      <p>Quý khách vui lòng nhập thông tin liên hệ bên dưới</p>
      <form @submit.prevent="submitBooking">
        <div class="form-group">
          <label for="name">Họ và tên <p> * (bắt buộc)</p></label>
          <input type="text" v-model="form.fullname" placeholder="Họ và tên" required />
        </div>
        <div class="form-group">
          <label for="phone">Điện thoại <p> * (bắt buộc)</p></label>
          <input type="text" v-model="form.phone" placeholder="Điện thoại" required />
        </div>
        <div class="form-group">
          <label for="email">Email <p>(nếu có)</p></label>
          <input type="text" v-model="form.email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="request">Yêu cầu khác <p>(nếu có)</p></label>
          <textarea v-model="form.content" rows="3"></textarea>
        </div>
        <div class="button">
          <button class="submit-button" type="submit">Gửi yêu cầu</button>
          <button class="close-button" type="button" @click="$emit('close')">Đóng</button>
        </div>
      </form>
    </div>
    <div class="success-message" v-if="isSubmitted">
      <font-awesome-icon class="icon" icon="fa-solid fa-circle-check" style="color: #003c71;" />
      <p>Đã đặt tour thành công</p>
      <button class="close-button" @click="$emit('close')">Đóng</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    tourId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    adultQuantity: {
      type: Number,
      required: true
    },
    childQuantity: {
      type: Number,
      required: true
    },
    kidQuantity: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    selectedDate: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      form: {
        fullname: "",
        phone: "",
        email: "",
        content: "",
        tourId: this.tourId,
        userId: this.userId,
        adultQuantity: this.adultQuantity,
        childQuantity: this.childQuantity,
        kidQuantity: this.kidQuantity,
        total: this.total,
        selectedDate: this.selectedDate,
        paymentId: "",
        isStatus: "",
        isComfirmed: ""
      },
      isSubmitted: false
    };
  },
  computed: {
    ...mapGetters('auth', ["user"])
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.form.fullname = newUser.fullname || "";
          this.form.phone = newUser.phone || "";
          this.form.email = newUser.email || "";
        }
      }
    }
  },
  methods: {
    ...mapActions('booking', ['createBookingRequest']),
    async submitBooking() {
      const bookingData = {
        fullname: this.form.fullname,
        phone: this.form.phone,
        email: this.form.email,
        content: this.form.content,
        tourId: this.form.tourId,
        userId: this.form.userId,
        adultQuantity: this.form.adultQuantity,
        childQuantity: this.form.childQuantity,
        kidQuantity: this.form.kidQuantity,
        total: this.form.total,
        dateBookingRequest: this.formatDate(new Date().toLocaleDateString()),
        selectedDate: this.form.selectedDate,
        paymentId: this.form.paymentId,
        isStatus: this.form.isStatus,
        isComfirmed: this.form.isComfirmed
      }
      await this.createBookingRequest(bookingData);
      this.isSubmitted = true;
      this.resetForm();
    },
    resetForm() {
      this.form.fullname = this.user.fullname || "";
      this.form.phone = this.user.phone || "";
      this.form.email = this.user.email || "";
      this.form.content = "";
    },
    formatDate(date) {
      const [month, day, year] = date.split('/');
      return `${day}/${month}/${year}`;
    }
  },
};
</script>

<style scoped>
.booking-form {
  position: fixed;
  top: 0;                                                                                                                                                                                                                
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal1 {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  border-top: 5px solid #003c71;
  border-bottom: 5px solid #003c71;
}
.modal1 h2 {
    text-align: center;
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: flex;
  margin-bottom: 5px;
}
label p {
    font-size: 12px;
    color: red;
    font-style: italic;
    padding-left: 5px;
    padding-top: 3px;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.submit-button {
  background-color: orange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
}
.submit-button:hover {
  background-color: darkorange;
}
.close-button {
    background-color: gray;
    padding: 10px;
    border: none;
    color: white;
    cursor: pointer;
    width: 30%;
    margin-left: 10px;
    border-radius: 4px;
}
.icon {
  color: #003c71;
}
.success-message {
  text-align: center;
  color: green;
  font-weight: 600;
  background: #fff;
  padding: 30px 80px;
  border-radius: 8px;
}
.success-message .icon {
  font-size: 60px;
  padding-bottom: 15px;
}
.success-message .close-button {
  width: 50%;
  margin-left: 0px;
}
</style>