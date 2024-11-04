<template>
    <div class="history-tour" v-if="isAuthenticated">
      <div class="container2">
        <div class="row1">
          <h2 class="title" v-if=" recentTours.length >0">Đã xem gần đây</h2>
        </div>
        <div class="tour-grid">
          <div class="tour-item" v-for="tour in recentTours" :key="tour.id">
            <TourItems  :tour="tour"></TourItems>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters } from 'vuex';
  import TourItems from '../tours/TourItems.vue';
  export default {
    components: {
      TourItems
    },
    computed: {
    ...mapGetters("auth", ["isAuthenticated", "user"]),
    recentTours() {
      const userId = this.user.id;
      const tours = sessionStorage.getItem(`recentTours_${userId}`);
      const parsedTour =  tours ? JSON.parse(tours) : [];
      return parsedTour
      }
    }
  }
  </script>
  <style scoped>
  .container2  {
    width: 90%;
      margin-left: 5%;
  }
  .row1 {
    width: 100%;
    padding: 16px;
    align-items: center;
  }
  .title {
    text-align: justify;
  }
  .tour-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    width: 100%;
  }
  .tour-item {
    width: 100%;
  }
  </style>
  