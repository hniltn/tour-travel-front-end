<template>
  <div class="confirmation-container">
    <h1>Xác nhận Thông tin Tour</h1>
    <div class="row1">
      <div class="left_section">
        <div class="section">
          <h2>Thông tin Tổng quan</h2>
          <div class="item">
            <span class="title">Loại Tour</span>
            <span class="value">{{ tourData?.name }}</span>
          </div>
          <div class="item">
            <span class="title">Hình Ảnh</span>
            <span class="value"
              ><img :src="tourData?.image" alt="Tour Image"
            /></span>
          </div>
          <div class="item">
            <span class="title">Loại Tour</span>
            <span class="value">
              {{ getCategoryName(tourData?.categoryId) }}
            </span>
          </div>
          <div class="item">
            <span class="title">Khu Vực</span>
            <span class="value"
              >{{ getAreaName(tourData?.areaId) }}
            </span>
          </div>
          <div class="item">
            <span class="title">Giá</span>
            <span class="value">{{ tourData?.price_adult }} VND</span>
          </div>
          <div class="item">
            <span class="title">Thời Gian</span>
            <span class="value">{{ tourData?.quantity_date }}</span>
          </div>
          <div class="item">
            <span class="title">Điểm Khởi Hành</span>
            <span class="value">{{ tourData?.start_location }} </span>
          </div>
          <div class="item">
            <span class="title">Điểm Kết Thúc</span>
            <span class="value">{{ tourData?.end_location }} </span>
          </div>
        </div>
        <div class="section">
          <h2>Mô tả Tour</h2>
          <div class="item">
            <span class="title">Tiêu đề</span>
            <span class="value">{{ tourData.description.title }}</span>
          </div>
          <div class="item">
            <span class="title">Nội dung</span>
            <span class="value">{{ tourData.description.content }}</span>
          </div>
        </div>
        <div class="section">
          <h2>Phương tiện di chuyển</h2>
          <ul>
            <li v-for="vehicle in tourData.vehicle" :key="vehicle.id">
              {{ vehicle.nameVehicle }}
            </li>
          </ul>
        </div>
        <div class="section">
          <h2>Dịch vụ cung cấp</h2>
          <ul>
            <li
              v-for="service in tourData.tour_services.selected"
              :key="service"
            >
              {{ service.nameService }}
            </li>
          </ul>
        </div>
      </div>
      <div class="right_section">
        <div class="section">
          <h2>Chi tiết Tour</h2>
          <div
            v-for="(day, index) in tourData.tour_details"
            :key="index"
            class="day-detail"
          >
            <h3>{{ day.name }}</h3>
            <div
              class="timeline-detail"
              v-for="(timeline, tIndex) in day.timeline"
              :key="tIndex"
            >
              <div class="item" v-if="timeline.time.length > 0">
                <span class="title">Thời gian</span>
                <span class="value">{{ timeline.time }}</span>
              </div>
              <div class="item">
                <span class="title">Mô tả</span>
                <span class="value">{{ timeline.description }}</span>
              </div>
              <div class="item" v-if="timeline.image.length > 0">
                <span class="title">Hình ảnh</span>
                <span class="value"
                  ><img :src="timeline.image" alt="Timeline Image"
                /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="confirmTour">Xác nhận</button>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("tours", ["tourData"]),
    ...mapGetters("categories", ["allCategories", "areasByCategoryId"]),
  },
  methods: {
    ...mapActions("categories", ["getAllCategory", "getAreaByCategoryId"]),
    ...mapActions("tours", ["addTour"]),
    getCategoryName(categoryId) {
      if (!this.allCategories || !Array.isArray(this.allCategories)) {
        return "Không xác định";
      }
      const category = this.allCategories.find((cat) => cat.id === categoryId);
      return category ? category.name : "Không xác định";
    },
    getAreaName(areaId) {
      const areas = this.areasByCategoryId(this.tourData.categoryId);
      if (!areas || !Array.isArray(areas)) {
        return "Không xác định";
      }
      const area = areas.find((area) => area.id === areaId);
      return area ? area.name : "Không xác định";
    },
    confirmTour() {
      const tourData = {
        id: this.generateId(),
        name: this.tourData.name,
        image: this.tourData.image,
        categoryId: this.tourData.categoryId,
        areaId: this.tourData.areaId,
        price_adult: this.tourData.price_adult,
        quantity_date: this.tourData.quantity_date,
        start_location: this.tourData.start_location,
        end_location: this.tourData.end_location,
        star: this.tourData.star || "Chưa có đánh giá",
        start_date: this.tourData.start_date || new Date().toLocaleDateString(),
        vehicle: this.tourData.vehicle,
        tour_services: this.tourData.tour_services.selected.map(service => ({
                id: service.id,
                nameService: service.nameService // Đảm bảo lấy nameService đúng cách
            })),
        description: this.tourData.description,
        tour_details: this.tourData.tour_details
      }
      this.addTour(tourData);
      this.$router.push('/admin/tours');
    },
    generateId() {
      return Math.floor(Math.random() * 1000000).toString();
    }
  },
  created() {
    this.getAllCategory();
    const categoryId = this.tourData?.categoryId || '';
    if (categoryId) {
      this.getAreaByCategoryId(categoryId);
    }
  },
};
</script>
<style scoped>
.confirmation-container {
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.row1 {
  display: flex;
  width: 100%;
  line-height: 1.5;
}
.left_section,
.right_section {
  width: 48%;
}
h1 {
  font-size: 36px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  margin: 20px 0px 50px 0px;
}

.section {
  margin-bottom: 20px;
  font-size: 18px;
}

.section h2 {
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: 400;
}

.section img {
  width: 400px;
}
.section .item {
  display: flex;
  margin-bottom: 10px;
  text-align: left;
  line-height: 2;
}
.item .title {
  font-weight: 600;
  width: 20%;
}
.item .value {
  width: 80%;
}
li {
  list-style-type: none;
}
.day-detail {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.timeline-detail {
  margin-bottom: 10px;
}

button {
  width: 30%;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  justify-content: center;
  margin-left: 65%;
}

button:hover {
  background-color: #5a4db2;
}
</style>
