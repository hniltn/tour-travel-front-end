<template>
    <div class="card" :title="tour.name">
      <router-link :to="{ name: 'tourDetails', params: { id: tour.id } }" class="nav-link">
        <img :src="tour.image" class="card-img-top" :alt="tour.name || 'Tour image'" />
        <div class="card-body">
          <h5 class="card-title">{{ tour.name }}</h5>
          <p class="card-text">{{ tour.description.content }}</p>
        </div>
      </router-link>
    </div>
  </template>
  <script>
  export default {
    props: {
      tour: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #fff;
    overflow: hidden;
    width: 100%;
    flex: 1 1 calc(33.333% - 32px);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  .nav-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .card-body {
    color: black;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 15px;
  }
  h5.card-title {
    margin: 0 0 10px;
    font-weight: 600;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p.card-text {
    margin: 0;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>