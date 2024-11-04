<template>
    <form @submit.prevent="handleSubmit">
        <div v-for="(vehicle, index) in selectedVehicles" :key="vehicle.id" class="form-group">
            <label :for="'vehicle-' + vehicle.id">Chọn phương tiện di chuyển</label>
            <select v-model="selectedVehicles[index]" required>
                <option v-for="option in vehicles" :key="option.id" :value="option.vehicleName">{{ option.vehicleName }}
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
export default {
    props: ['vehicleTour'], 
    data() {
        return {
            vehicles: [
                { id: 1, vehicleName: 'Ô tô' },
                { id: 2, vehicleName: 'Máy bay' },
                { id: 3, vehicleName: 'Tàu hỏa' },
                { id: 4, vehicleName: 'Xe Limousine' },
                { id: 5, vehicleName: 'Xe lửa' },
                { id: 6, vehicleName: 'Ca nô' },
                { id: 7, vehicleName: 'Xuồng chèo' },
                { id: 8, vehicleName: 'Du thuyền' }
            ],
            selectedVehicles: [''],
        }
    },
    methods: {
        addVehicleSelect() {
            this.selectedVehicles.push('');
        },
        addVehicle() {
            this.selectedVehicles.push('');
        },
        removeVehicleSelect(index) {
            this.selectedVehicles.splice(index, 1);
        },
        handleSubmit() {
            this.$store.commit('tours/setVehicle', this.selectedVehicles);
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