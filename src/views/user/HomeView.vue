<template>
    <div class="home-view">
      <search-home></search-home>
      <history-tour></history-tour>
      <category-components></category-components>
    </div>
  </template>
  <script>
  import HistoryTour from "@/components/user/account/HistoryTour.vue";
  import CategoryComponents from "@/components/user/categories/CategoryComponents.vue";
  import SearchHome from "@/components/user/layout/SearchHome.vue";
  
  SearchHome
  export default {
    components: {
      CategoryComponents,
      SearchHome,
      HistoryTour,
    },
  };
  </script>
  <style>
  .home-view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  search-home,
  history-tour,
  category-components {
    flex: 1;
    margin: 10px;
  }
  </style>
  