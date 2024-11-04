<template>
  <div class="tour-left1">
    <div class="container">
      <div class="container-image">
        <img :src="selectedTour.image" alt="" class="img-fluid" />
      </div>
      <div class="tour-header-info">
        <div class="top">
          <div class="left">
            <div class="wrap">
              <div class="icon">
                <font-awesome-icon icon="fa-solid fa-location-dot" />
              </div>
              <div class="content">{{ selectedTour.start_location }}</div>
            </div>
            <div class="wrap">
              <div class="icon">
                <font-awesome-icon icon="fa-solid fa-clock" />
              </div>
              <div class="content">{{ selectedTour.quantity_date }}</div>
            </div>
            <div class="wrap">
              <div class="content">Phương tiện</div>
              <div class="icon" v-for="vehicle in selectedTour.vehicle" :key="vehicle.id">
                <font-awesome-icon icon="fa-solid fa-plane-departure" :title="vehicle.nameVehicle"
                  v-if="vehicle.nameVehicle === 'Máy bay'" />
                <font-awesome-icon icon="fa-solid fa-car" :title="vehicle.nameVehicle"
                  v-if="vehicle.nameVehicle === 'Ô tô'" />
                <font-awesome-icon icon="fa-solid fa-train" :title="vehicle.nameVehicle"
                  v-if="vehicle.nameVehicle === 'Xe lửa'" />
                <font-awesome-icon icon="fa-solid fa-ship" :title="vehicle.nameVehicle" v-if="
                  vehicle.nameVehicle === 'Ca nô' ||
                  vehicle.nameVehicle === 'Xuồng chèo'
                " />
                <font-awesome-icon icon="fa-solid fa-bus" :title="vehicle.nameVehicle"
                  v-if="vehicle.nameVehicle === 'Xe Limousine'" />
                <font-awesome-icon icon="fa-solid fa-sailboat" :title="vehicle.nameVehicle"
                  v-if="vehicle.nameVehicle === 'Du thuyền'" />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="name">Mã tour:</div>
            <div class="id">{{ selectedTour.id }}</div>
          </div>
        </div>
        <hr />
        <div class="bottom">
          <div class="row">
            <h4>Dịch vụ bao gồm</h4>
            <div class="col-4 wrap" v-for="services in selectedTour.tour_services" :key="services.id">
              <font-awesome-icon icon="fa-solid fa-circle-check" class="icon" />
              <span>{{ services.nameService }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="wrap-des" v-if="selectedTour && selectedTour.description">
          <div class="des-title">
            {{ selectedTour.description.title }}
          </div>
          <div class="content">{{ selectedTour.description.content }}</div>
        </div>
      </div>
      <div class="description">
        <div class="wrap-des">
          <div class="wrap-des-header">
            <div class="des-title" v-if="selectedTour && selectedTour.tour_details">
              Chương trình tour
            </div>
            <span class="see-all" @click="toggleShowAll">{{ showAll ? "Thu gọn" : "Xem tất cả" }}</span>
          </div>
          <div class="detail-content" v-for="detail in selectedTour.tour_details" :key="detail.id">
            <button class="accordion" @click="toggleAccordion(detail.id)">
              <div class="content-des-title">{{ detail.name }}</div>
              <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" v-if="!isActive(detail.id)"/>
              <font-awesome-icon icon="fa-solid fa-angle-up" class="icon" v-if="isActive(detail.id)" />
            </button>
            <div class="panel" v-if="isActive(detail.id)">
              <div class="content" v-for="t in detail.timeline" :key="t.time">
                <p>
                  <strong v-if="t.time.length > 0"> {{ t.time }}: </strong>
                  {{ t.description }}
                </p>
                <img :src="t.image" alt="" v-if="t.image.length > 0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="wrap-des">
          <div class="des-title">Thông tin visa</div>
          <div class="content">
            - Quý khách chỉ cần hộ Việt Nam còn nguyên vẹn và có hạn sử dụng ít
            nhất 6 tháng tính từ ngày kết thúc tour.
          </div>
          <div class="content">- Miễn Visa cho khách Việt Nam.</div>
        </div>
      </div>
      <div class="description">
        <div class="wrap-des">
          <div class="des-title">Hướng dẫn viên</div>
          <div class="content">
            Trước 1 ngày hoặc 2 ngày đi sẽ gửi thông tin họp đoàn cho quý khách
            hàng, trước ngày khởi hành Hướng Dẫn Viên sẽ liên hệ trao đổi một số
            thông tin trong chuyến hành trình. 
            Hướng dẫn viên sẽ hỗ trợ làm thủ tục hàng không, nhận phòng và sắp xếp bữa ăn.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      activeIds: new Set(),
      showAll: false,
    };
  },
  computed: {
    ...mapGetters("tours", ["selectedTour"]),
  },
  created() {
    this.getTourById(this.id);
  },
  methods: {
    ...mapActions("tours", ["getTourById"]),
    toggleAccordion(id) {
      if (this.activeIds.has(id)) {
        this.activeIds.delete(id);
      } else {
        this.activeIds.add(id);
      }
    },
    isActive(id) {
      return this.activeIds.has(id);
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
      if (this.showAll) {
        this.selectedTour.tour_details.forEach(detail => this.activeIds.add(detail.id));
      } else {
        this.activeIds.clear();
      }
    },
  },
};
</script>
<style scoped>
.tour-left1 {
  display: flex;
  flex-direction: column;
  text-align: justify;
  line-height: 2;
}
.container {
  width: 90%;
}
.container-image {
  display: flex;
  justify-content: center;
}
.container-image img {
  width: 100%;
  height: 350px;
}
.tour-header-info {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 12px;
}
.tour-header-info .top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tour-header-info .left {
  display: flex;
  flex-direction: row;
}
.tour-header-info .left .wrap {
  display: flex;
  flex-direction: row;
  margin-right: 36px;
}
.tour-header-info .left .wrap .content {
  font-weight: 600;
  color: gray;
  align-content: center;
}
.tour-header-info .left .wrap .icon {
  font-size: 24px;
  margin: 0 5px;
  color: rgb(49, 49, 49);
}
.tour-header-info .right {
  display: flex;
  flex-direction: row;
}
.tour-header-info .right .name {
  margin-right: 4px;
  color: gray;
  align-content: center;
  font-weight: 600;
}
.tour-header-info .right .id {
  color: blue;
  font-weight: 600;
  align-content: center;
}
.tour-header-info .bottom {
  margin-top: 12px;
  color: black;
}
.bottom h4 {
  color: rgb(9, 121, 226);
  font-size: 25px;
  font-weight: 600;
}
.bottom .wrap {
  font-size: 15px;
}
.bottom .icon {
  color: green;
}
.bottom span {
  margin-left: 3px;
}
.description {
  margin-top: 6px;
  background-color: white;
  border-radius: 8px;
  padding: 12px;
}
.description .wrap-des-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.description .wrap-des-header .see-all {
  cursor: pointer;
  font-weight: 600;
  color: rgb(9, 121, 226);
  font-style: italic;
}
.description .wrap-des .des-title {
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(9, 121, 226);
}
.description .wrap .content {
  padding: 12px;
  color: black;
}
.content-des-title {
  font-size: 18px;
  font-weight: 600;
  color: rgb(9, 121, 226);
}
.content img {
  width: 80%;
  margin: 0 10%;
}
.accordion {
  background-color: #f1f1f1;
  color: #444;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel {
  padding: 0 18px;
  background-color: white;
  overflow: hidden;
}
hr {
  margin: 0;
}
.detail-content {
  margin-top: 15px;
  border-radius: 8px;
  border: 1px solid rgb(235, 235, 235);
}
.detail-content:active,
.detail-content:hover {
  transform: scale(1.015);
}
.accordion .icon {
  color: rgb(9, 121, 226);
}
</style>
