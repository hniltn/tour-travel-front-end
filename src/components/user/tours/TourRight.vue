<template>
  <div class="tour-right1">
    <div class="top">
      <h1 class="title">Lịch khởi hành & giá</h1>
      <p>Chọn ngày khởi hành:</p>
      <div class="input">
        <input placeholder="dd/mm/yyyy" type="date" :min="today" @change="formatDate($event.target.value)" />
      </div>
      <div class="couter">
        <div class="p-1 ">
          <div class="des">Người lớn</div>
          <span class="note-des ml-1"> > 12 tuổi</span>
        </div>
        <div class="p-1 couter-price"> {{ formatCurrency(selectedTour.price_adult) }}</div>
        <span>VND</span>
        <div class="wrap-couter">
          <div class="prev" @click="decreaseAdultCount">&#8722;</div>
          <div class="number">{{ adultCount }}</div>
          <div class="next" @click="increaseAdultCount">&#43;</div>
        </div>
      </div>
      <div class="couter">
        <div class="p-1">
          <div class="des">Trẻ em</div>
          <span class="note-des ml-1"> 2 - 12 tuổi</span>
        </div>
        <div class="p-1 couter-price"> {{ formatCurrency(selectedTour.price_adult * 0.9) }}</div>
        <span>VND</span>
        <div class="wrap-couter">
          <div class="prev" @click="decreaseChildCount">&#8722;</div>
          <div class="number">{{ childCount }}</div>
          <div class="next" @click="increaseChildCount">&#43;</div>
        </div>
      </div>
      <div class="couter">
        <div class="p-1">
          <div class="des">Trẻ em</div>
          <span class="note-des ml-1"> 0 - 2 tuổi </span>
        </div>
        <div class="p-1 couter-price"> {{ formatCurrency(selectedTour.price_adult * 0.3) }}</div>
        <span>VND</span>
        <div class="wrap-couter">
          <div class="prev" @click="decreaseKidCount">&#8722;</div>
          <div class="number">{{ kidCount }}</div>
          <div class="next" @click="increaseKidCount">&#43;</div>
        </div>
      </div>
      <div class="note-des ml-1" v-if="childCount > adultCount || kidCount > adultCount">
        <span>Số lượng trẻ em không được lớn hơn số lượng người lớn</span>
      </div>
      <div class="wrap-price">
        <div class="name">Tổng cộng</div>
        <div class="content">
          <div class="price"> {{ formatCurrency(totalPrice) }}</div>
          <span>VND</span>
        </div>
      </div>
      <div class="wrap-button">
        <button class="button_1 button btn pt-2 pb-2" @click="handleAdvising">Liên hệ tư vấn</button>
        <button class="button_2 button btn pt-2 pb-2" @click="handleBooking">Đặt tour</button>
      </div>
    </div>
    <advising-form v-if="showAdvisingForm" @close="showAdvisingForm = false" :tourId="selectedTour.id"
      :userId="userId"></advising-form>
    <booking-form v-if="showBookingForm" @close="showBookingForm = false" :tourId="selectedTour.id" :userId="userId"
      :adultQuantity="adultCount" :childQuantity="childCount" :kidQuantity="kidCount" :total="totalPrice" 
      :selectedDate="selectedDate"></booking-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import BookingForm from '@/views/user/BookingForm.vue'
import AdvisingForm from '@/views/user/AdvisingForm.vue';
export default {
  props: ["id"],
  components: {
    BookingForm,
    AdvisingForm
  },
  data() {
    return {
      adultCount: 0,
      childCount: 0,
      kidCount: 0,
      selectedDate: '',
      showBookingForm: false,
      showAdvisingForm: false,
      today: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    ...mapGetters("tours", ['selectedTour']),
    ...mapGetters("auth", ['isAuthenticated', 'user']),
    userId() {
      return this.user.id;
    },
    totalPrice() {
      return (this.adultCount * this.selectedTour.price_adult) + (this.childCount * this.selectedTour.price_adult * 0.9) + (this.kidCount * this.selectedTour.price_adult * 0.3)
    }
  },
  created() {
    this.getTourById(this.id)
  },
  methods: {
    ...mapActions("tours", ['getTourById']),
    formatDate(date) {
      const [year, month, day] = date.split('-');
      this.selectedDate = `${day}/${month}/${year}`;
    },
    formatCurrency(value) {
      if (value === undefined || value === null) {
        return "0";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    increaseAdultCount() {
      this.adultCount++;
    },
    decreaseAdultCount() {
      if (this.adultCount > 0) {
        this.adultCount--;
      }
    },
    increaseChildCount() {
      this.childCount++;
    },
    decreaseChildCount() {
      if (this.childCount > 0) {
        this.childCount--;
      }
    },
    increaseKidCount() {
      this.kidCount++;
    },
    decreaseKidCount() {
      if (this.kidCount > 0) {
        this.kidCount--;
      }
    },
    handleBooking() {
      if (!this.selectedDate) {
        alert("Vui lòng chọn ngày khởi hành");
        return;
      }
      if (this.adultCount === 0) {
        alert("Vui lòng chọn số lượng người lớn để đặt tour");
        return;
      }
      if (this.isAuthenticated) {
        if (this.childCount > this.adultCount || this.kidCount > this.adultCount) {
          alert("Số lượng trẻ em không được lớn hơn số lượng người lớn");
          return;
        }
        this.showBookingForm = true
      } else {
        alert("Vui lòng đăng nhập để đặt tour");
        this.$router.push("/login")
      }
    },
    handleAdvising() {
      if (this.isAuthenticated) {
        this.showAdvisingForm = true
      } else {
        alert("Vui lòng đăng nhập để đặt tour");
        this.$router.push("/login")
      }
    }
  },
};
</script>
<style scoped>
.tour-right1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: justify;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-right: 5%;
  line-height: 1.6;
}
.top {
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 10px;
}
.title {
  font-size: 25px;
  font-weight: 600;
  text-transform: capitalize;
}
.input {
  width: 100%;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: solid 1px #ccc;
  cursor: pointer;
}
input:focus {
  outline: solid 2px darkblue;
  border: none;
}
.couter {
  margin-top: 6px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: solid 1px #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.couter span {
  color: rgb(9, 121, 226);
  font-size: 16px;
  font-weight: 400;
}
.p-1 {
  font-size: 16px;
  margin: 0 5px;
  width: 100px;
}
.p-1 .note-des {
  font-size: 12px;
  font-weight: 100;
  line-height: 1;
  color: gray;
}
.couter-price {
  font-size: 16px;
  margin: 0 10px;
  color: rgb(9, 121, 226);
}
.wrap-couter {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}
.prev,
.next {
  align-items: center;
  font-size: 18px;
  padding: 0 10px;
  cursor: pointer;
}
.number {
  font-size: 18px;
  padding: 0 10px;
  width: 40px;
  text-align: center;
  border: solid 1px #ccc;
  border-radius: 3px;
  min-width: 40px;
}
.note-des {
  color: red;
  text-align: justify;
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  font-size: 13px;
  font-style: italic;
}
.wrap-price {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}
.wrap-price .content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.wrap-price span {
  color: rgb(9, 121, 226);
  font-size: 12px;
  margin-left: 6px;
}
.wrap-price .name {
  font-size: 18px;
}
.wrap-price .price {
  color: rgb(9, 121, 226);
  font-size: 24px;
  font-weight: 600;
}
.wrap-button {
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.wrap-button .button {
  font-size: 16px;
  padding: 8px 6px;
  font-weight: normal;
  border-radius: 5px;
  background-color: white;
  text-transform: none;
  width: 45%;
}
.button_1 {
  width: 40%;
  border: solid 1px orange;
  color: orange;
}
.button_1:hover {
  background-color: orange;
  color: white;
}
.button_2 {
  width: 40%;
  border: solid 1px rgb(9, 121, 226);
  color: rgb(9, 121, 226);
}
.button_2:hover {
  background-color: rgb(9, 121, 226);
  color: white;
  opacity: 0.8;
}
</style>