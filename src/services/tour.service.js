import axios from "axios";

const API_URL = "http://localhost:3000/tours";

const tourService = {
    async getAllTour() {
        const tours = await axios.get(API_URL);
        return tours.data;        
    },
    async getTourById(id) {
        const tour = await axios.get(`${API_URL}/${id}`);
        return tour.data;
    },
    async addTour(tourData) {
        const response = await axios.post(API_URL, tourData);
        return response.data;
    }
}
export default tourService;