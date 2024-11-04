import categoriesService from "@/services/categories.service";
const state = {
  categories: [],
  areas: [],
  selectedCategory: null,
};
const mutations = {
  setCategories: (state, categories) => (state.categories = categories),
  setSelectedCategory: (state, category) => (state.selectedCategory = category),
  setAreas: (state, areas) => (state.areas = areas),
};
const getters = {
  allCategories: (state) => state.categories,
  categoryById: (state) => (id) =>
    state.categories.find((category) => category.id === id),
  selectedCategory: (state) => state.selectedCategory,
  allAreas: (state) => state.areas,
  areasByCategoryId: (state) => (categoryId) =>
    state.areas.filter((area) => area.categoryId === categoryId),
};
const actions = {
  async getAllCategory({ commit }) {
    try {
      const categories = await categoriesService.getAllCategory();
      commit("setCategories", categories);
      return categories;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getCategoryById({ commit, getters }, id) {
    try {
      const cachedCategory = getters.categoryById(id);
      if (cachedCategory) {
        commit("setSelectedCategory", cachedCategory);
        return cachedCategory;
      }
      const selectedCategory = await categoriesService.getCategoryById(id);
      commit("setSelectedCategory", selectedCategory);
      localStorage.setItem("category: " + id, JSON.stringify(selectedCategory));
      return selectedCategory;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getAreaByCategoryId({ commit }, categoryId) {
    const areas = await categoriesService.getAreaByCategoryId(categoryId);
    commit("setAreas", areas);
    return areas;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
