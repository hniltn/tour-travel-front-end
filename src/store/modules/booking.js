import bookingService from "@/services/booking.service";

const state = {
  bookingRequests: [],
  advisingRequests: [],
  advisingResponses: [],
};
const mutations = {
  addBookingRequest(state, request) {
    state.bookingRequests.push(request);
  },
  addAdvisingRequest(state, request) {
    state.advisingRequests.push(request);
  },
  addAdvisingResponse(state, response) {
    state.advisingResponses.push(response);
  },
  setAllRequests(state, requests) {
    state.advisingRequests = requests;
  },
  setAllResponses(state, responses) {
    state.advisingResponses = responses;
  },
  updateAdvisingRequest(state, updatedRequest) {
    const index = state.advisingRequests.findIndex(request => request.id === updatedRequest.id);
    if (index !== -1) {
      state.advisingRequests.splice(index, 1, updatedRequest);
    }
  }
};
const getters = {
  allBookingRequests: (state) => state.bookingRequests,
  allAdvisingRequests: (state) => state.advisingRequests,
  allAdvisingResponses: (state) => state.advisingResponses,
  allAdvisingRequestsByStatus: (state) => (status) =>
    state.advisingRequests.filter((request) => request.isReplied === status),
};
const actions = {
  async createBookingRequest({ commit }, bookingData) {
    const newRequest = await bookingService.createBookingRequest(bookingData);
    commit("addBookingRequest", newRequest);
    return newRequest;
  },
  async createAdvisingRequest({ commit }, advisingData) {
    const newRequest = await bookingService.createAdvisingRequest(advisingData);
    commit("addAdvisingRequest", newRequest);
    return newRequest;
  },
  async createAdvisingResponse({ commit }, advisingResponseData) {
    const newResponse = await bookingService.createAdvisingResponse(advisingResponseData);
    commit("addAdvisingResponse", newResponse);
    return newResponse;
  },
  async getAllAdvisingRequests({ commit }) {
    const requests = await bookingService.getAllAdvisingRequests();
    if (Array.isArray(requests)) {
      commit("setAllRequests", requests);
    } else {
      console.error("Received data is not an array:", requests);
    }
    return requests;
  },
  async updateAdvisingRequest({ commit }, payload) {
    try {
      const updatedRequest = await bookingService.updateAdvisingRequest(payload);
      commit('updateAdvisingRequest', updatedRequest);
      return updatedRequest;
    } catch (error) {
      console.error('Error updating advising request:', error);
      throw error;
    }
  },
  async getAllAdvisingResponses({ commit }) {
    const responses = await bookingService.getAllAdvisingResponses();
    commit("setAllResponses", responses);
    return responses;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};