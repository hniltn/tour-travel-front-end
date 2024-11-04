<template>
    <div>
      <div v-for="category in categories" :key="category.id">
        <TourComponents :categoryId="category.id"></TourComponents>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters, mapActions } from "vuex";
  import TourComponents from "../tours/TourComponents.vue";
  
  export default {
    components: {
      TourComponents,
    },
    computed: {
      ...mapGetters("categories", ["allCategories"]),
      categories() {
        return this.allCategories;
      },
    },
    async created() {
      await this.getAllCategory();
    },
    methods: {
      ...mapActions("categories", ["getAllCategory"]),
    },
  };
  </script>
  