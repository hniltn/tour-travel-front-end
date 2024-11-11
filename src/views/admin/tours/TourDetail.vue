<template>
  <div class="container-detail">
    <div class="overview-detail" v-if="selectedTour">
      <div class="section">
        <div class="section-content">
          <div class="overview-item">
            <span class="item_title">Mã tour</span>
            <span class="item-value">{{ categoryName }} - {{ areaName }}</span>
          </div>
          <editable-overview-item
            title="Tên tour"
            :value="selectedTour.name"
            :onUpdate="updateTourName"
          />
          <div class="overview-item">
            <span class="item_title">Hình</span>
            <img :src="selectedTour.image" alt="" />
          </div>
          <editable-overview-item
            title="Giá"
            :value="selectedTour.price_adult"
            :onUpdate="updateTourPriceAdult"
          />
          <div class="overview-item">
            <span class="item_title">Loại tour</span>
            <span class="item-value">{{ categoryName }} - {{ areaName }}</span>
          </div>
          <editable-overview-item
            title="Thời lượng tour"
            :value="selectedTour.quantity_date"
            :onUpdate="updateQuantityDate"
          />
          <editable-overview-item
            title="Điểm khởi hành"
            :value="selectedTour.start_location"
            :onUpdate="updateStartLocation"
          />
          <editable-overview-item
            title="Điểm kết thúc"
            :value="selectedTour.end_location"
            :onUpdate="updateEndLocation"
          />
          <div class="overview-item">
            <span class="item_title">Ngày tạo tour</span>
            <span class="item-value">{{ selectedTour.start_date }}</span>
          </div>
          <editable-overview-item
            title="Trình trạng tour"
            :value="selectedTour.status"
            :onUpdate="updateStatus"
            :class="getStatusClass(selectedTour.status)"
          />
          <div class="overview-item">
            <span class="item_title">Tình trạng tour</span>
            <span :class="getStatusClass(selectedTour.status)">{{
              selectedTour.status === 1 ? "Đang hoạt động" : "Đang tạm dừng"
            }}</span>
          </div>
        </div>
      </div>
      <div class="section" v-if="selectedTour.description">
        <div class="section-title">Mô tả tour</div>
        <div class="section-content">
          <div class="overview-item">
            <span class="item_title">Tiêu đề</span>
            <span class="item-value">{{ selectedTour.description.title }}</span>
          </div>
          <div class="overview-item">
            <span class="item_title">Nội dung</span>
            <span class="item-value">{{
              selectedTour.description.content
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="section"
        v-if="selectedTour.vehicle && selectedTour.vehicle.length"
      >
        <div class="section-title">Phương tiện di chuyển</div>
        <div
          class="section-content"
          v-for="v in selectedTour.vehicle"
          :key="v.id"
        >
          <div class="overview-item">
            <span class="item_title">
              <font-awesome-icon
                :icon="getVehicleIcon(v.nameVehicle)"
                :title="v.nameVehicle"
              />
            </span>
            <span class="item-value">{{ v.nameVehicle }}</span>
          </div>
        </div>
      </div>
      <div class="section" v-if="selectedTour.tour_services">
        <div class="section-title">Dịch vụ cung cấp</div>
        <div
          class="section-content"
          v-for="s in selectedTour.tour_services"
          :key="s.id"
        >
          <div class="overview-item col-4 wrap">
            <span class="item_title">
              <font-awesome-icon icon="fa-solid fa-circle-check" class="icon" />
            </span>
            <span class="item-value">{{ s.nameService }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="schedule-detail"
      v-if="
        selectedTour &&
        selectedTour.tour_details &&
        selectedTour.tour_details.length
      "
    >
      <div class="section" v-if="selectedTour.tour_details">
        <div class="section-title">
          <div class="section-title-left">Chi tiết hành trình</div>
          <span class="see-all" @click="toggleShowAll">{{
            showAll ? "Thu gọn" : "Xem tất cả"
          }}</span>
        </div>
        <div
          class="section-content"
          v-for="d in selectedTour.tour_details"
          :key="d.id"
        >
          <button class="accordion" @click="toggleAccordion(d.id)">
            <div class="content-des-title">{{ d.name }}</div>
            <font-awesome-icon
              icon="fa-solid fa-angle-down"
              class="icon"
              v-if="!isActive(d.id)"
            />
            <font-awesome-icon
              icon="fa-solid fa-angle-up"
              class="icon"
              v-if="isActive(d.id)"
            />
          </button>
          <div class="panel" v-if="isActive(d.id)">
            <div
              class="overview-item-content"
              v-for="t in d.timeline"
              :key="t.time"
            >
              <p>
                <strong v-if="t.time.length > 0"> {{ t.time }}: </strong>
                {{ t.description }}
              </p>
              <img :src="t.image" alt="" v-if="t.image && t.image.length > 0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditableOverviewItem from "@/components/admin/components/tours/EditableOverviewItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    EditableOverviewItem,
  },
  props: ["id"],
  data() {
    return {
      activeIds: new Set(),
      showAll: false,
    };
  },
  computed: {
    ...mapGetters("tours", ["selectedTour"]),
    ...mapGetters("categories", [
      "categoryById",
      "areasByCategoryId",
      "allCategories",
      "allAreas",
    ]),
    categoryName() {
      return (
        this.allCategories.find(
          (cat) => cat.id === this.selectedTour.categoryId
        )?.name || "Không xác định"
      );
    },
    areaName() {
      const areas = this.allAreas.filter(
        (area) => area.categoryId === this.selectedTour.categoryId
      );
      const area = areas.find((area) => area.id === this.selectedTour.areaId);
      return area ? area.name : "Không xác định";
    },
  },
  methods: {
    ...mapActions("tours", ["getTourById"]),
    ...mapActions("categories", ["getAllCategory", "getAreaByCategoryId"]),
    async fetchData() {
      await this.getAllCategory();
      await this.getAreaByCategoryId(this.selectedTour.categoryId);
    },
    getStatusClass(status) {
      return {
        "status-active": status === 1,
        "status-paused": status === 0,
      };
    },
    formatPrice(price_adult) {
      if (price_adult === undefined || price_adult === null) {
        return "0";
      }
      return price_adult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getVehicleIcon(nameVehicle) {
      const vehicleIcons = {
        "Máy bay": "fa-solid fa-plane-departure",
        "Ô tô": "fa-solid fa-car",
        "Xe lửa": "fa-solid fa-train",
        "Ca nô": "fa-solid fa-ship",
        "Xuồng chèo": "fa-solid fa-ship",
        "Xe Limousine": "fa-solid fa-bus",
        "Du thuyền": "fa-solid fa-sailboat",
      };
      return vehicleIcons[nameVehicle] || "fa-solid fa-question"; // icon mặc định nếu không tìm thấy
    },
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
        this.selectedTour.tour_details.forEach((detail) =>
          this.activeIds.add(detail.id)
        );
      } else {
        this.activeIds.clear();
      }
    },
  },
  created() {
    this.getTourById(this.id);
    this.fetchData();
  },
};
</script>
<style scoped>
.container-detail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  overflow-y: auto;
  height: 100%;
}
.overview-detail {
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.section {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
}
.section-title {
  text-align: left;
  font-size: 30px;
}
.section-content .overview-item {
  display: flex;
  margin-bottom: 10px;
  text-align: left;
  line-height: 2;
  width: 100%;
}
.section-content .overview-item .item_title {
  font-weight: bold;
  width: 25%;
}
.section-content .overview-item .item-value {
  width: 75%;
  font-weight: 600;
}
img {
  width: 500px;
}
.status-paused {
  padding: 5px 10px;
  background-color: orange;
  color: white;
  border: 1px solid orange;
  border-radius: 8px;
  font-weight: bold;
  font-style: italic;
}
.status-active {
  padding: 5px 10px;
  background-color: green;
  color: white;
  border: 1px solid green;
  border-radius: 8px;
  font-weight: bold;
  font-style: italic;
}
.icon {
  color: green;
}
.schedule-detail {
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  line-height: 2;
  text-align: left;
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
.schedule-detail .section-content {
  margin-bottom: 10px;
}
.schedule-detail .section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.see-all {
  cursor: pointer;
  font-weight: 600;
  color: rgb(9, 121, 226);
  font-style: italic;
  font-size: 18px;
}
</style>
