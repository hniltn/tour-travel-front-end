<template>
    <form @submit.prevent="handleSubmit">
        <div v-for="(vehicle, index) in selectedVehicles" :key="index" class="form-group">
            <label :for="'vehicle-' + index">Chọn phương tiện di chuyển</label>
            <select v-model="selectedVehicles[index]" required>
                <option v-for="option in vehicles" :key="option.id" :value="option.id">{{ option.nameVehicle }}
                </option>
            </select>
            <button v-if="selectedVehicles.length > 1" type="button" @click="removeVehicleSelect(index)"
                class="remove-vehicle-button">
                Xóa
            </button>
        </div>
        <div class="add-vehicle">
            <button type="button" class="add-vehicle-button" @click="addVehicleSelect">
                <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                Thêm phương tiện di chuyển </button>
        </div>
        <button type="submit">Tiếp theo</button>
    </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: ['vehicleTour'], 
    computed: {
        ...mapState('tours', ['tourData'])
    },
    data() {
        return {
            vehicles: [
                { id: 1, nameVehicle: 'Ô tô' },
                { id: 2, nameVehicle: 'Máy bay' },
                { id: 3, nameVehicle: 'Tàu hỏa' },
                { id: 4, nameVehicle: 'Xe Limousine' },
                { id: 5, nameVehicle: 'Xe lửa' },
                { id: 6, nameVehicle: 'Ca nô' },
                { id: 7, nameVehicle: 'Xuồng chèo' },
                { id: 8, nameVehicle: 'Du thuyền' }
            ],
            selectedVehicles: this.tourData?.vehicle?.map(vehicle => vehicle.id) || [null], // Khởi tạo với giá trị null
        }
    },
    methods: {
        addVehicleSelect() {
            this.selectedVehicles.push(null); // Thêm một phương tiện mới
        },
        removeVehicleSelect(index) {
            this.selectedVehicles.splice(index, 1); // Xóa phương tiện đã chọn
        },
        handleSubmit() {
            const vehiclesToSave = this.selectedVehicles.map(id => {
                return this.vehicles.find(vehicle => vehicle.id === id);
            }).filter(vehicle => vehicle); // Lọc ra các phương tiện hợp lệ

            // Chuyển đổi định dạng để phù hợp với yêu cầu
            const formattedVehicles = vehiclesToSave.map(vehicle => ({
                id: vehicle.id,
                nameVehicle: vehicle.nameVehicle
            }));

            this.$store.commit('tours/setVehicle', formattedVehicles); // Lưu vào Vuex
            this.$emit('next');
        }
    }
}
</script>
<style scoped>
form {
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
}

.form-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    justify-content: space-between;
    padding: 10px 2.5%;
    align-items: center;
}

.form-group label {
    width: 30%;
    display: block;
    text-align: left;
    font-weight: bold;
}

.form-group select {
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid gray;
}

.form-group select:focus {
    outline: #003c71;
    border-bottom: 2px solid #003c71;
    transition: all 0.3s ease;
    transform: scale(1.01);
}

.remove-vehicle-button {
    display: flex;
    width: 20%;
    align-items: start;
    justify-content: center;
    margin-top: 0px;
    padding: 5px 0px;
    margin-left: 5%;
}

.add-vehicle-button {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    margin-right: 10px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 0;
}
</style>