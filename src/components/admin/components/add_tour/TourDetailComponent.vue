<template>
    <form @submit.prevent="handleSubmit">
        <div v-for="(day, dayIndex) in tourDays" :key="dayIndex" class="day-entry">
            <div class="day-header">
                <span>{{ day.name || `Ngày ${dayIndex + 1}` }}</span>
                <button type="button" @click="toggleDayVisibility(dayIndex)">
                    {{ day.visible ? 'Ẩn' : 'Hiện' }}
                </button>
            </div>
            <div v-if="day.visible">
                <div class="form-group">
                    <label for="dayName">Tên Ngày</label>
                    <input type="text" v-model="day.name" placeholder="Nhập tên ngày" required />
                </div>
                <div v-for="(timeline, index) in day.timeline" :key="index" class="timeline-entry">
                    <div class="form-group">
                        <label for="time">Thời gian</label>
                        <input type="text" v-model="timeline.time" placeholder="Nhập thời gian" />
                    </div>
                    <div class="form-group">
                        <label for="description">Mô tả</label>
                        <textarea v-model="timeline.description" placeholder="Nhập mô tả" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="image">Hình ảnh</label>
                        <input type="text" v-model="timeline.image" placeholder="Nhập URL hình ảnh" />
                    </div>
                    <button type="button" @click="removeTimelineEntry(dayIndex, index)">Xóa</button>
                </div>
                <button type="button" style="background-color: #003c71;" @click="addTimelineEntry(dayIndex)">Thêm lịch trình</button>
                <button type="button" @click="removeDay(dayIndex)">Xóa Ngày</button>
            </div>
        </div>
        <button type="button" style="background-color: #003c71;" @click="addNewDay">Thêm Ngày</button>
        <!-- <router-link to="/confirmation"> -->
            <button type="submit">Xác nhận</button>
        <!-- </router-link> -->
    </form>
</template>
<script>
import { mapState } from 'vuex';
export default {
    props: ['tourDetail'],
    computed: {
        ...mapState('tours', ['tourData'])
    },
    data() {
        return {
            tourDays: this.tourData?.tour_details?.length ? this.tourData.tour_details : [
                {
                    id: 1,
                    name: '',
                    timeline: [
                        { time: '', description: '', image: '' }
                    ]
                }
            ]
        }
    },
    methods: {
        addNewDay() {
            this.tourDays.push({
                id: this.tourDays.length + 1,
                name: '',
                timeline: [
                    { time: '', description: '', image: '' }
                ]
            });
        },
        toggleDayVisibility(dayIndex) {
            this.tourDays[dayIndex].visible = !this.tourDays[dayIndex].visible;
        },
        addTimelineEntry(dayIndex) {
            this.tourDays[dayIndex].timeline.push({ time: '', description: '', image: '' });
        },
        removeTimelineEntry(dayIndex, index) {
            this.tourDays[dayIndex].timeline.splice(index, 1);
        },
        removeDay(dayIndex) {
            this.tourDays.splice(dayIndex, 1);
        },
        handleSubmit() {
            this.$store.commit('tours/setTourDetails', this.tourDays);
            this.$emit('next');
            this.$router.push('/confirmation');
        }
    }
}
</script>
<style scoped>
form {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    text-align: left;
}

.day-entry {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    
}

button[type="button"] {
    background-color: #e74c3c;
    margin-right: 10px;
}

button:hover {
    background-color: #5a4db2;
}

button[type="button"]:hover {
    background-color: #c0392b;
}

.timeline-entry {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 4px;
}

.timeline-entry .form-group {
    margin-bottom: 10px;
}

.timeline-entry button {
    background-color: #e74c3c;
    margin-top: 5px;
}

.timeline-entry button:hover {
    background-color: #c0392b;
}
</style>