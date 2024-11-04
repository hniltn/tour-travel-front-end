import axios from "axios";

const API_URL = "http://localhost:3000/bookingTours";
const API_URL_ADVISING = "http://localhost:3000/advisingRequest";
const API_URL_ADVISING_RESPONSE = "http://localhost:3000/advisingResponse";

const bookingService = {
    async createBookingRequest(bookingData) {
        const bookingRequest = await axios.post(`${API_URL}`, bookingData);
        return bookingRequest.data;
    },
    async createAdvisingRequest(advisingData) {
        const advisingRequest = await axios.post(`${API_URL_ADVISING}`, advisingData);
        return advisingRequest.data;
    },
    async getAllAdvisingRequests() {
        const advisingRequests = await axios.get(`${API_URL_ADVISING}`);
        return advisingRequests.data;
    },
    async createAdvisingResponse(advisingResponseData) {
        const advisingResponse = await axios.post(`${API_URL_ADVISING_RESPONSE}`, advisingResponseData);
        return advisingResponse.data;
    },
    async getAllAdvisingResponses() {
        const advisingResponses = await axios.get(`${API_URL_ADVISING_RESPONSE}`);
        return advisingResponses.data;
    },
    async updateAdvisingRequest({ id, isReplied }) {
        const currentRequest = await axios.get(`${API_URL_ADVISING}/${id}`);
        const updatedRequest = { ...currentRequest.data, isReplied };
        const response = await axios.put(`${API_URL_ADVISING}/${id}`, updatedRequest);
        return response.data;
    }
}
export default bookingService;