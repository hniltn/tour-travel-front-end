<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>Chọn dịch vụ mà tour sẽ cung cấp</label>
            <div class="services-container">
                <div class="checkbox" v-for="(service, index) in services" :key="index">
                    <input type="checkbox" :id="'service-' + index" :value="service.name" v-model="selectedServices">
                    <label :for="'service-' + index">{{ service.name }}</label><br>
                </div>
                <div class="checkbox1">
                    <input type="checkbox" id="" name="" value="">
                    <label for="completed">Khách sạn</label>
                    <select name="" id="">
                        <option value="">Chọn khách sạn</option>
                        <option value="1">Khách sạn 1*</option>
                        <option value="2">Khách sạn 2*</option>
                        <option value="3">Khách sạn 3*</option>
                        <option value="4">Khách sạn 4*</option>
                        <option value="5">Khách sạn 5*</option>
                    </select>
                    <br>
                </div>
                <div class="form-group-item" v-for="(newService, index) in newServices" :key="'new-' + index">
                    <label for="serviceName">Tên dịch vụ</label>
                    <input type="text" v-model="newServices[index]" placeholder="Nhập tên dịch vụ" required>
                    <button type="button" @click="removeServiceSelect(index)" class="remove-service-button">
                        Xóa
                    </button>
                </div>
            </div>
        </div>
        <div class="add-service">
            <button type="button" class="add-service-button" @click="addNewService">
                <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                Thêm dịch vụ
            </button>
        </div>
        <button type="submit">Tiếp theo</button>
    </form>
</template>
<script>
export default {
    props: ['serviceTour'],
    data() {
        return {
            services: [
                { id: 1, name: 'Bảo hiểm', selected: false },
                { id: 2, name: 'Xe đưa đón', selected: false },
                { id: 3, name: 'Hướng dẫn viên', selected: false },
                { id: 4, name: 'Bữa ăn', selected: false },
                { id: 5, name: 'Vé tham quan', selected: false },
                { id: 6, name: 'Vé máy bay', selected: false },
                { id: 7, name: 'Homestay', selected: false },
            ],
            selectedServices: [],
            newServices: []
        }
    },
    methods: {
        addNewService() {
            this.newServices.push('');
        },
        addServices() {
            console.log('Dịch vụ đã chọn:', this.selectedServices);
            console.log('Dịch vụ mới:', this.newServices);
        },
        removeServiceSelect(index) {
            this.newServices.splice(index, 1);
        },
        handleSubmit() {
            this.$store.commit('tours/setTourServices', {
                selected: this.selectedServices,
                new: this.newServices
            });
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
    font-size: 20px;
    padding: 10px 2.5%;
}

.form-group label {
    display: block;
    text-align: center;
    font-weight: bold;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 28px;
}

.form-group-item {
    display: flex;
    width: 100%;
    font-size: 20px;
    padding: 10px 0px;
    margin-bottom: 10px;
    margin-left: 0px;
    align-items: end;
}

.services-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    justify-content: left;
    line-height: 2;
    margin-left: 5%;
}

.services-container .checkbox {
    width: 48%;
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
}

.services-container {
    margin-right: 0;
}

.services-container .checkbox1 {
    width: 100%;
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
}

.services-container .checkbox input,
.services-container .checkbox1 input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
}

.services-container .form-group-item label {
    margin-bottom: 0;
    width: 20%;
    text-align: left;
    font-size: 20px;
}

.services-container .form-group-item input {
    margin-bottom: 0;
    width: 60%;
    font-size: 20px;
    height: 100%;
    padding: 10px 10px;
}
.remove-service-button {
    display: flex;
    width: 20%;
    align-items: start;
    justify-content: center;
    margin-top: 0px;
    padding: 5px 0px;
    margin-left: 5%;
}
.services-container .checkbox label,
.services-container .checkbox1 label {
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 0;
}

.services-container .checkbox1 select {
    margin-left: 10px;
    width: 30%;
    height: 100%;
    padding: 5px 10px;
}

.add-service-button {
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