<template>
    <div class="tour-collection">
      <div class="title p-8 pb-0 text-orange-500" style="margin-top: 50px">
        <h4>{{ title }}</h4>
        <router-link class="nav-link" :to="{name: 'category', params: {id: categoryId}}">Xem thêm >>></router-link>
      </div>
      <div class="container1">
        <div class="tour-grid">
          <div class="tour-item" v-for="tour in displayTours" :key="tour.id">
            <TourItems :tour="tour"></TourItems>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import TourItems from "./TourItems.vue";
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    components: {
      TourItems,
    },
    props: {
      categoryId: {
        type: String,
      },
    },
    data() {
      return {
        loading: true,
        error: null,
      };
    },
    computed: {
      ...mapGetters("tours", ["allTours", "toursByCategory"]),
      ...mapGetters("categories", ["categoryById"]),
      displayTours() {
        return this.categoryId
          ? this.toursByCategory(this.categoryId).slice(0, 8)
          : this.allTours.slice(0, 8);
      },
      title() {
        if (this.categoryId) {
          const category = this.categoryById(this.categoryId);
          return `Du lịch ${category.name}`;
        }
        return "Tất cả các tour";
      },
    },
    async created() {
      try {
        await this.getAllTour();
      } catch (error) {
        this.error = "Lỗi khi tải dữ liệu: " + error.message;
      } finally {
        this.loading = false;
      }
    },
    methods: {
      ...mapActions("tours", ["getAllTour"]),
    }, 
  };
  </script>
  <style>
  .tour-collection {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .tour-collection .title {
    background-color: #003c71;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 16px;
  }
  h4 {
    text-align: justify;
    color: #fff;
    width: 70%;
  }
  .title .nav-link {
    color: #fff;
    text-align: right;
    width: 30%;
    font-style: italic;
  }
  .container1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tour-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
  }
  .tour-item {
    width: 100%;
  }
  </style>
  