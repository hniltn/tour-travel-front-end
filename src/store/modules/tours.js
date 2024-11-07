import tourService from "@/services/tour.service";
const state = {
  tours: [],
  selectedTour: [],
  tourData: {
    id: '',
    name: '',
    image: '',
    categoryId: '',
    areaId: null,
    price_adult: null,
    quantity_date: '',
    start_location: '',
    end_location: '',
    star: '',
    start_date: '',
    vehicle: [],
    tour_services: {
      selected: [],
      new: []
    },
    description: {
      title: '',
      content: ''
    },
    tour_details: []
  }
};
const mutations = {
  setTours: (state, tours) => (state.tours = tours),
  setSelectedTour: (state, tour) => (state.selectedTour = tour),
  setTourData: (state, tourData) => (state.tourData = tourData),
  setOverview (state, overview) {
    Object.assign(state.tourData, overview);
  },
  setDescription: (state, description) => (state.tourData.description = description),
  setVehicle: (state, vehicles) => {
    state.tourData.vehicle = vehicles.map(vehicle => ({
      id: vehicle.id,
      nameVehicle: vehicle.nameVehicle // Cập nhật để lưu tên phương tiện
    }));
  },
  setTourServices: (state, tourServices) => {
    state.tourData.tour_services = {
      selected: tourServices.selected.map(service => ({
          id: service.id,
          nameService: service.nameService // Lưu nameService như giá trị
      })),
      new: tourServices.new.map((service, index) => ({
          id: index + 1, // Gán ID cho dịch vụ mới bắt đầu từ 1
          nameService: service // Lưu nameService như giá trị
      }))
  };
  },
  setTourDetails: (state, tourDetails) => {
    state.tourData.tour_details = tourDetails.map((detail, index) => ({
      id: index + 1, // Gán ID theo thứ tự từ 1
      name: detail.name,
      timeline: detail.timeline
    }));
  },
};
const getters = {
  allTours: (state) => state.tours,
  tourById: (state) => (id) => state.tours.find((tour) => tour.id === id),
  selectedTour: (state) => state.selectedTour,
  toursByCategory: (state) => (categoryId) => {
    return state.tours.filter((tour) => tour.categoryId === categoryId);
  },
};
const actions = {
  async getAllTour({ commit }) {
    const tours = await tourService.getAllTour();
    commit("setTours", tours);
    return tours;
  },
  async getTourById({ commit }, id) {
    const selectedTour = await tourService.getTourById(id);
    commit("setSelectedTour", selectedTour);
    return selectedTour;
  },
  async addTour({ commit }, tourData) {
    const response = await tourService.addTour(tourData);
    commit("setTourData", response);
    return response;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
