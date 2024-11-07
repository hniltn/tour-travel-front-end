<template>
  <div class="add-tour">
    <h1>Thêm Tour Mới</h1>
    <div class="tabs">
      <button class="tab-links" @click="setActiveTab('overview')" :class="{ active: activeTab === 'overview' }">Tổng
        quan</button>
      <button class="tab-links" @click="setActiveTab('descriptions')" :class="{ active: activeTab === 'descriptions', disabled: !canAccessDescriptions }">Mô tả</button>
      <button class="tab-links" @click="setActiveTab('vehicles')" :class="{ active: activeTab === 'vehicles', disabled: !canAccessVehicles }">Phương
        tiện</button>
      <button class="tab-links" @click="setActiveTab('services')" :class="{ active: activeTab === 'services', disabled: !canAccessServices }">Dịch
        vụ</button>
      <button class="tab-links" @click="setActiveTab('details')" :class="{ active: activeTab === 'details', disabled: !canAccessDetails }">Chi
        tiết</button>
    </div>
    <div v-if="activeTab === 'overview'" class="container-overview">
      <overviewing-tours-component @next="unlockTab('descriptions')" :activeTab="activeTab"></overviewing-tours-component>
    </div>
    <div v-if="activeTab === 'descriptions'" class="container-description" >
      <description-tour-component @next="unlockTab('vehicles')" @prev="setActiveTab('overview')"></description-tour-component>
    </div>
    <div v-if="activeTab === 'vehicles'" class="container-vehicle">
      <vehicle-component @next="unlockTab('services')"></vehicle-component>
    </div>
    <div v-if="activeTab === 'services'" class="container-service">
      <service-tour-component @next="unlockTab('details')"></service-tour-component>
    </div>
    <div v-if="activeTab === 'details'" class="container-detail">
      <tour-detail-component></tour-detail-component>
    </div>
  </div>
</template>
<script>
import OverviewingToursComponent from '@/components/admin/components/add_tour/OverviewingToursComponent.vue';
import DescriptionTourComponent from '@/components/admin/components/add_tour/DescriptionTourComponent.vue';
import VehicleComponent from '@/components/admin/components/add_tour/VehicleComponent.vue';
import ServiceTourComponent from '@/components/admin/components/add_tour/ServiceTourComponent.vue';
import TourDetailComponent from '@/components/admin/components/add_tour/TourDetailComponent.vue';
export default {
  components: {
    OverviewingToursComponent,
    DescriptionTourComponent,
    VehicleComponent,
    ServiceTourComponent,
    TourDetailComponent
  },
  data() {
    return {
      activeTab: 'overview',
      tourData: {
        name: '',
        image: '',
        categoryId: null,
        areaId: null,
        price_adult: 0,
        quantity_date: '',
        start_location: '',
        end_location: '',
        star: '',
        start_date: '',
        description: [],
        vehicle: [],
        tour_services: [],
        tour_details: []
      },
      canAccessDescriptions: false,
      canAccessVehicles: false,
      canAccessServices: false,
      canAccessDetails: false,
    };
  },
  methods: {
    setActiveTab(tab) {
      if (this[`canAccess${tab.charAt(0).toUpperCase() + tab.slice(1)}`] || tab === 'overview') {
        this.activeTab = tab;
      }
    },
    unlockTab(tab) {
      this[`canAccess${tab.charAt(0).toUpperCase() + tab.slice(1)}`] = true;
      this.activeTab = tab;
    }
  }
};
</script>
<style scoped>
.add-tour {
  position: fixed;
  top: 70px;
  left: 250px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 270px);
  height: calc(100% - 90px);
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.add-tour h1 {
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: bold;
}

.tabs {
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: left;
  width: 90%;
}

.tab-links {
  width: 20%;
  padding: 10px 0;
  border: none;
  font-size: 20px;
  color: #000;
  background-color: white;
  transition: background-color 0.3s, color 0.3s;
}

.tab-links.active {
  color: #ccc;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #003c71;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.tab-links.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.tab-links:hover:not(.disabled) {
  color: #fff;
  background-color: #003c71;
  font-weight: bold;
  opacity: 1.2;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.container-overview {
  width: 90%;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.container-description,
.container-vehicle,
.container-service {
  width: 90%;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.container-detail {
  width: 90%;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
