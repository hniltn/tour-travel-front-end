<template>
    <the-header></the-header>
    <div class="user-layout">
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </template>
  
  <script>
import TheFooter from '@/components/user/layout/TheFooter.vue';
import TheHeader from '@/components/user/layout/TheHeader.vue';

  export default {
    components: {
      TheHeader,
      TheFooter,
    },
  };
  </script>