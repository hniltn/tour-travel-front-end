<template>
    <div class="search-home container-fluid p-0 position-relative" ref="searchHome">
      <img class="w-100" :class="{ 'd-none': image }" src="https://img.freepik.com/free-vector/flat-design-travel-agency-template_23-2149348003.jpg?w=1380&t=st=1726641611~exp=1726642211~hmac=00d0d9cd368803babae14d80e556429d18aaa8fa607f46c8d745c678762ddaae" alt="..."/>
      <div class="container container-search position-absolute translate-middle">
        <div class="row container-wrap justify-content-center">
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3 col equal-size-input">
            <div class="d-flex flex-row group-input">
              <span class="input-group-text bg-icon">
                <font-awesome-icon icon="fa-solid fa-location-dot" />
              </span> 
              <div class="d-flex flex-column flex-group">
                <label class="title">Điểm đến</label>
                <input type="text" v-model="destination" @input="filterTour" class="input" placeholder="Nhập điểm đến" @focus="showSuggestions = true"/>
                <ul v-if="showSuggestions && filteredTours.length > 0" class="suggestions">
                  <li v-for="tour in filteredTours" :key="tour.id" @click="selectTour(tour)">
                    <div class="tour-img">
                      <img :src="tour.image" alt="">
                    </div>
                    <div class="tour-name">
                      <h4>{{ tour.name }}</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="button-search" @click="handleSearch">
            <div class="wrap-icon_search" >
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        tours: [],
        destination: "",
        showSuggestions: false
      };
    },
    async created() {
      await this.getAllTour();
      this.tours = this.$store.getters["tours/allTours"];
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.handleClickOutside)
    },
    computed: {
      filteredTours() {
        return this.tours.filter((tour) => {
          return tour.end_location
            .toLowerCase()
            .includes(this.destination.toLowerCase());
        });
      },
    },
    methods: {
      ...mapActions("tours", ["getAllTour"]),
      async handleSearch() {
      },
      filterTour() {
      },
      selectTour(tour) {
        this.$router.push({ name: "tourDetails", params: { id: tour.id } });
      },
      handleClickOutside(event) {
        const searchHome = this.$refs.searchHome;
        if (searchHome) {
          const suggestions = searchHome.querySelector('suggestions');
          if (suggestions && !suggestions.contains(event.target) && !this.$refs.searchHome.contains(event.target)) {
          this.showSuggestions = false;
        } else {
          this.showSuggestions = true;
        }
        }
      }
    },
  };
  </script>
  <style scoped>
  .search-home {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  img {
    height: 400px;
    object-fit: cover;
  }
  .container-search {
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    border-radius: 15px;
    height: 200px;
    padding: 20px;
  }
  .container-search .container-wrap {
    padding: 36px 24px;
  }
  .container-wrap .col {
    margin-top: 12px;
  }
  .container-wrap .button-search {
    margin-top: 12px;
    width: 30%;
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: #f0ad4e;
    border: solid 4px #f0ad4e;
    align-items: center;
    border-radius: 8px;
    padding: 14px;
    cursor: pointer;
  }
  .container-wrap .group-input {
    border: solid 4px #f0ad4e;
    border-radius: 8px;
    margin-top: 12px;
  }
  .container-wrap .group-input .icon {
    font-size: 24px;
  }
  .container-wrap .group-input .flex-group {
    width: 100%;
  }
  .container-wrap .group-input .flex-group label {
    flex: 1;
    font-size: 16px;
    opacity: 0.8;
    padding: 8px 6px 0px;
    margin: 0px;
    display: flex;
    color: #000;
    font-weight: 500;
  }
  .container-wrap .group-input .flex-group input {
    width: 100%;
    flex: 2;
    border: none;
    font-size: 18px;
    padding: 4px;
    cursor: pointer;
  }
  .container-wrap .group-input .flex-group input:focus {
    outline: none;
  }
  .suggestions {
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    z-index: 1000;
    width: 58%;
    margin-top: 70px;
    overflow-y: auto;
    max-height: 200px
  }
  .suggestions li {
    padding: 10px;
    cursor: pointer;
    width: 100%;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .suggestions li:hover {
    background-color: #f0f0f0;
  }
  .suggestions li .tour-img {
    width: 30%;
  }
  .suggestions li .tour-img img {
    width: 70px;
    height: 70px;
    margin-right: 30px
  }
  .suggestions li h4 {
    width: 70%;
    color: #000;
    font-size: 16px;
  }
  .translate-middle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .equal-size-input {
    flex: 1;
  }
  .bg-icon {
    background-color: #f0f0f0;
  }
  </style>