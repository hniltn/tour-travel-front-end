<template>
    <div class="container1">
      <div class="title">Tour chưa xác nhận</div>
      <!-- <hr/> -->
      <book-tour-history></book-tour-history>
    </div>
    <div class="container1">
      <div class="title">Tour đã xác nhận</div>
      <!-- <hr/> -->
      <book-tour-history></book-tour-history>
    </div>
    <div class="container1">
      <div class="title">Tour bị hủy</div>
      <!-- <hr/> -->
      <book-tour-history></book-tour-history>
    </div>
  </template>
  <script>
  import BookTourHistory from '@/components/user/tours/BookTourHistory.vue';
  export default {
    components: {
      BookTourHistory
    }
  }
  </script>
  <style scoped>
  .container1 {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0 5%;
  }
  .title {
    font-size: 32px;
    margin: 20px 0 10px;
    color: #003c71;
    width: 100%;
    text-align: justify;
  }
  </style>
  