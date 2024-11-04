<template>
  <div class="container-tour" v-if="tour && tour.id">
    <div class="title">{{ tour.name }}</div>
    <div class="rank">
      <span v-for="n in Math.floor(Number(tour.star))" :key="n">
        <font-awesome-icon icon="fa-solid fa-star" class="icon"/>
      </span>
    </div>
    <div class="tour-detail">
      <div class="tour-left">
        <tour-left :id="id"></tour-left>
      </div>
      <div class="tour-right">
        <tour-right :id="id"></tour-right>
      </div>
    </div>
  </div>
</template>
<script>
import TourLeft from "@/components/user/tours/TourLeft.vue";
import TourRight from "@/components/user/tours/TourRight.vue";
import { mapActions } from "vuex";
import tourService from "@/services/tour.service";
export default {
  components: {
    TourLeft,
    TourRight,
  },
  props: ["id"],
  data() {
    return {
      tour: {},
    };
  },
  async created() {
    await this.fetchTour();
    await this.fetchUserInfo();
  },
  methods: {
    ...mapActions("auth", ["fetchUserInfo"]),
    async fetchTour() {
      this.tour = await tourService.getTourById(this.id);
      this.saveRecentTour(this.tour);
    },
    saveRecentTour(tour) {
      const userId = this.getUserId();
      if (!userId) return;
      let recentTours = JSON.parse(sessionStorage.getItem(`recentTours_${userId}`)) || [];
      if (!Array.isArray(recentTours)) {
        recentTours = [];
      }
      const existingTourIndex = recentTours.findIndex(t => t.id === tour.id);
      if (existingTourIndex !== -1) {
        recentTours.splice(existingTourIndex, 1);
      }
      recentTours.unshift(tour);
      if (recentTours.length > 6) {
        recentTours = recentTours.slice(0, 6)
      }
      sessionStorage.setItem(`recentTours_${userId}`, JSON.stringify(recentTours))
    },
    getUserId() {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const decodedToken = JSON.parse(atob(token));
        return decodedToken.id;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
      }
    }
  },
};
</script>
<style scoped>
.container-tour {
  background-color: #eceaea;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.title {
  font-size: 32px;
  color: darkblue;
  font-weight: 600;
  padding-top: 20px;
  text-align: justify;
  margin: 0 5%;
  width: 100%;
}
.rank {
  display: flex;
  flex-direction: row;
  margin: 0 5%;
  align-items: center;
}
.rating-score {
  padding: 2px 6px;
  margin-right: 6px;
  color: white;
  font-size: 16px;
  border-radius: 8px;
}
.icon {
  color: orange;
}
.tour-detail {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding: 20px;
  gap: 20px;
}
.tour-left {
  width: 70%;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; 
  -ms-overflow-style: none;
}
.tour-left::-webkit-scrollbar {
  display: none;
}
.tour-right {
  width: 30%;
  position: sticky;
  top: 20px;
}
</style>