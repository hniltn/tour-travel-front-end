import axios from "axios";

const API_URL = "http://localhost:3000/categories";
const API_URL_AREAS = "http://localhost:3000/areas";
const categoriesService = {
  async getAllCategory() {
    try {
      const categories = await axios.get(API_URL);
      return categories.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getCategoryById(id) {
    try {
      const category = await axios.get(`${API_URL}/${id}`);
      return category.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getAreaByCategoryId(categoryId) {
    try {
      const areas = await axios.get(`${API_URL_AREAS}?categoryId=${categoryId}`);
      return areas.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default categoriesService;
