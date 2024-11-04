<template>
    <div class="confirmation-container">
        <h1>Xác nhận Thông tin Tour</h1>
        <div class="section">
            <h2>Thông tin Tổng quan</h2>
            <p><strong>Tên Tour:</strong> {{ tourData.overview.name }}</p>
            <p><strong>Hình Ảnh:</strong> <img :src="tourData.overview.image" alt="Tour Image" /></p>
            <p><strong>Loại Tour:</strong> {{ getCategoryName(tourData.overview.categoryId) }}</p>
            <p><strong>Khu Vực:</strong> {{ getAreaName(tourData.overview.areaId) }}</p>
            <p><strong>Giá:</strong> {{ tourData.overview.price_adult }} VND</p>
            <p><strong>Thời Gian:</strong> {{ tourData.overview.quantity_date }}</p>
            <p><strong>Điểm Khởi Hành:</strong> {{ tourData.overview.start_location }}</p>
            <p><strong>Điểm Kết Thúc:</strong> {{ tourData.overview.end_location }}</p>
        </div>
        <div class="section">
            <h2>Mô tả Tour</h2>
            <p><strong>Tiêu đề:</strong> {{ tourData.description.title }}</p>
            <p><strong>Nội dung:</strong> {{ tourData.description.content }}</p>
        </div>
        <div class="section">
            <h2>Phương tiện di chuyển</h2>
            <ul>
                <li v-for="vehicle in tourData.vehicle" :key="vehicle">{{ vehicle }}</li>
            </ul>
        </div>
        <div class="section">
            <h2>Dịch vụ cung cấp</h2>
            <ul>
                <li v-for="service in tourData.services.selected" :key="service">{{ service }}</li>
            </ul>
        </div>
        <div class="section">
            <h2>Chi tiết Tour</h2>
            <div v-for="(day, index) in tourData.details" :key="index" class="day-detail">
                <h3>{{ day.name }}</h3>
                <div class="timeline-detail">
                    <p><strong>Thời gian:</strong> {{ day.timeline[0].time }}</p>
                    <p><strong>Mô tả:</strong> {{ day.timeline[0].description }}</p>
                    <p><strong>Hình ảnh:</strong> <img :src="day.timeline[0].image" alt="Timeline Image" /></p>
                </div>
            </div>
        </div>
        <button @click="confirmTour">Xác nhận</button>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState('tours', ['tourData']),
        ...mapGetters('categories', ['allCategories', 'areasByCategoryId']),
    },
    methods: {
        ...mapActions('categories', ['getAllCategory', 'getAreaByCategoryId']),
        getCategoryName(categoryId) {
            if (!this.allCategories || !Array.isArray(this.allCategories)) {
                return 'Không xác định';
            }
            const category = this.allCategories.find(cat => cat.id === categoryId);
            return category ? category.name : 'Không xác định';
        },
        getAreaName(areaId) {
            const areas = this.areasByCategoryId(this.tourData.overview.categoryId);
            if (!areas || !Array.isArray(areas)) {
                return 'Không xác định';
            }
            const area = areas.find(area => area.id === areaId);
            return area ? area.name : 'Không xác định';
        },
        confirmTour() {
            console.log('Tour đã được xác nhận:', this.tourData);
            // Thực hiện logic xác nhận tour
        }
    },
    created() {
        this.getAllCategory();
        if (this.tourData.overview.categoryId) {
            this.getAreaByCategoryId(this.tourData.overview.categoryId);
        }
    }
}
</script>

<style scoped>
.confirmation-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.section {
    margin-bottom: 20px;
}

.section h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.day-detail {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.timeline-detail {
    margin-bottom: 10px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #5a4db2;
}
</style>