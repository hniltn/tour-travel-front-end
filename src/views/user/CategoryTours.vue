<template>
    <div class="container1">
      <div class="title p-8 pb-0 text-orange-500" style="margin-top: 50px">
        <h4>{{ title }}</h4>
      </div>
      <div class="tour-grid">
        <div class="tour-item" v-for="tour in paginatedTours" :key="tour.id">
          <TourItems :tour="tour"></TourItems>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
        <span>Trang {{ currentPage }} / {{ totalPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPage">Sau</button>
      </div>
    </div>
  </template>
  <script>
  import TourItems from "@/components/user/tours/TourItems.vue";
  import { mapGetters } from "vuex";
  export default {
    components: {
      TourItems,
    },
    data() {
      return {
        currentPage: 1,
        itemPerPage: 8,
      };
    },
    computed: {
      ...mapGetters("tours", ["toursByCategory"]),
      ...mapGetters("categories", ["categoryById"]),
      title() {
        const categoryId = this.$route.params.id;
        const category = this.categoryById(categoryId);
        return category && category.name
          ? `Du lịch ${category.name}`
          : "Danh sách tour";
      },
      paginatedTours() {
        const start = (this.currentPage - 1) * this.itemPerPage;
        return this.toursByCategory(this.$route.params.id).slice(start, start + this.itemPerPage);
      },
      totalPage() {
        return Math.ceil(this.toursByCategory(this.$route.params.id).length / this.itemPerPage);
      },
    },
    async created() {
      await this.fetchTourByCategory();
    },
    watch: {
      "$route.params.id": function() {
        this.fetchTourByCategory();
        this.currentPage = 1;
      },
    },
    methods: {
      // ...mapActions("tours", ["getAllTour"]),
      async fetchTourByCategory() {
        const categoryId = this.$route.params.id;
        try {
          await this.$store.dispatch("tours/getAllTour");
        } catch (error) {
          console.error("Lỗi khi tải danh sách tour:", error);
        }
        return categoryId
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
        }
      },
    },
  };
  </script>
  <style scoped>
  .container1 {
    width: 90%;
    margin-left: 5%;
  }
  .title {
    width: 100%;
    padding: 16px;
    display: flex;
    text-align: center;
    justify-content: center;
    margin-bottom: 30px;
  }
  h4 {
    text-align: center;
    color: #000;
    font-size: 36px;
    font-weight: 600;
    width: 70%;
    align-items: center;
  }
  .pagination {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  .pagination span {
    margin: 0 10px;
  }
  .pagination button {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background-color: #fff;
  }
  .pagination button:hover {
    color: #003c71;
  }
  .pagination button:disabled {
    cursor: not-allowed;
  }
  </style>
  