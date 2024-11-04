import tourService from "@/services/tour.service";
const state = {
  tours: [],
  selectedTour: [],
  tourData: {
    overview: {},
    description: {},
    vehicle: [],
    tour_services: [],
    tour_details: []
  }
};
const mutations = {
  setTours: (state, tours) => (state.tours = tours),
  setSelectedTour: (state, tour) => (state.selectedTour = tour),
  setTourData: (state, tourData) => (state.tourData = tourData),
  setOverview (state, overview) {
    state.tourData.overview = overview;
  },
  setDescription: (state, description) => (state.tourData.description = description),
  setVehicle: (state, vehicle) => (state.tourData.vehicle = vehicle),
  setTourServices: (state, tourServices) => (state.tourData.tour_services = tourServices),
  setTourDetails: (state, tourDetails) => (state.tourData.tour_details = tourDetails),
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
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
