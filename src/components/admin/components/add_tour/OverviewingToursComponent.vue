<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group ">
            <label for="name">Tên Tour</label>
            <input type="text" v-model="name" placeholder="Nhập tên tour" required />
        </div>
        <div class="form-group">
            <label for="image">Hình Ảnh</label>
            <input type="text" v-model="image" placeholder="Nhập URL hình ảnh" class="img-url" />
        </div>
        <div class="form-group">
            <div class="form-group-item">
                <label for="categoryId">Loại Tour</label>
                <select v-model="categoryId" required>
                    <option v-for="category in allCategories" :key="category.id" :value="category.id"> {{ category.name}} </option>
                </select>
            </div>
            <div class="form-group-item">
                <label for="areaId" style="margin-left: 20px;">Khu Vực</label>
                <select v-model="areaId" required>
                    <option v-for="area in filteredAreas" :key="area.id" :value="area.id"> {{ area.name }} </option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="form-group-item">
                <label for="price_adult">Giá</label>
                <input type="number" v-model="price_adult" required style="width: 50%;" />
                <span style="width: 10%; text-align: right; font-weight: bold;">VND</span>
            </div>
            <div class="form-group-item">
                <label for="quantity_date" style="margin-left: 20px;">Thời Gian:</label>
                <input type="text" v-model="quantity_date" required />
            </div>
        </div>
        <div class="form-group">
            <label for="start_location">Điểm Khởi Hành</label>
            <input type="text" v-model="start_location" required />
        </div>
        <div class="form-group">
            <label for="end_location">Điểm Kết Thúc</label>
            <input type="text" v-model="end_location" required />
        </div>
        <button type="submit">Tiếp theo</button>
    </form>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
    props: ['overviewingTour'],
    computed: {
        ...mapGetters('categories', ['allCategories']),
        ...mapGetters('categories', ['areasByCategoryId']),
        ...mapState('tours', ['tourData']),
        filteredAreas() {
            return this.areasByCategoryId(this.categoryId);
        }
    },
    data() {
        return {
            name: this.tourData?.name || '',
            image: this.tourData?.image || '',
            categoryId: this.tourData?.categoryId || '',
            areaId: this.tourData?.areaId || null,
            price_adult: this.tourData?.price_adult || null,
            quantity_date: this.tourData?.quantity_date || '',
            start_location: this.tourData?.start_location || '',
            end_location: this.tourData?.end_location || ''
        }
    },
    methods: {
        ...mapActions('categories', ['getAllCategory']),
        ...mapActions('categories', ['getAreaByCategoryId']),
        handleSubmit() {
            this.$store.commit('tours/setOverview', {
                name: this.name,
                image: this.image,
                categoryId: this.categoryId,
                areaId: this.areaId,
                price_adult: this.price_adult,
                quantity_date: this.quantity_date,
                start_location: this.start_location,
                end_location: this.end_location
            });
            this.$emit('next');
        }
    },
    watch: {
        'newTour.categoryId': function (newVal) {
            if (newVal) {
                this.getAreaByCategoryId(newVal);
            }
        }
    },
    created() {
        this.getAllCategory();
        this.getAreaByCategoryId(this.categoryId);
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
    align-items: center;
    font-size: 20px;
    justify-content: space-between;
    padding: 10px 2.5%;
}

.form-group label {
    width: 20%;
    display: block;
    text-align: left;
    font-weight: bold;
    justify-content: left;
}

.form-group input {
    width: 80%;
    padding: 5px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid gray;
}

.form-group input:focus {
    outline: #003c71;
    border-bottom: 2px solid #003c71;
    transition: all 0.3s ease;
    transform: scale(1.01);
}

.form-group-item {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.form-group-item label {
    width: 40%;
    text-align: left;
    font-weight: bold;
    justify-content: left;
}

.form-group-item select,
.form-group-item input {
    width: 60%;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid gray;
}

.form-group-item select:focus {
    outline: #003c71;
    border-bottom: 2px solid #003c71;
    transition: all 0.3s ease;
    transform: scale(1.01);
}

.form-group-item select option {
    font-size: 16px;
    position: relative;
    top: 10px;
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