<template>
    <div class="container1">
        <h1>Advising Requests</h1>
        <div class="tabs">
            <button class="tab-links" @click="setActiveTab('all')" :class="{ active: activeTab === 'all' }">Tất cả</button>
            <button class="tab-links" @click="setActiveTab('pending')" :class="{ active: activeTab === 'pending' }">Đang chờ xử lý</button>
            <button class="tab-links" @click="setActiveTab('replied')" :class="{ active: activeTab === 'replied' }">Đã xử lý</button>
        </div>
        <AdvisingComponent :items="filteredData" :headers="fields" :activeTab="activeTab" />
    </div>
</template>
<script>
import AdvisingComponent from "@/components/admin/components/AdvisingComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        AdvisingComponent,
    },
    data() {
        return {
            activeTab: 'all',
            fields: [
                { label: 'ID', field: 'id' },
                { label: 'Họ tên', field: 'fullname' },
                { label: 'Số điện thoại', field: 'phone' },
                { label: 'Email', field: 'email' },
                { label: 'Tên tour', field: 'tourName' },
                { label: 'Ngày tạo', field: 'dateAdvisingRequest' },
                { label: 'Trạng thái', field: 'status' },
            ],
        };
    },
    computed: {
        ...mapGetters('booking', ['allAdvisingRequests']),
        ...mapGetters('tours', ['tourById']),
        mappedAdvisingRequests() {
            return this.allAdvisingRequests.map(request => {
                const tour = this.tourById(request.tourId);
                return {
                    ...request,
                    tourName: tour ? tour.name : "Unknown Tour",
                    status: request.isReplied === '1' ? 'Đã xử lý' : 'Đang chờ xử lý'
                };
            });
        },
        filteredData() {
            if (this.activeTab === 'all') {
                return this.mappedAdvisingRequests;
            } else if (this.activeTab === 'pending') {
                return this.mappedAdvisingRequests.filter(item => item.isReplied === '0');
            } else if (this.activeTab === 'replied') {
                return this.mappedAdvisingRequests.filter(item => item.isReplied === '1');
            }
            return [];
        }
    },
    methods: {
        ...mapActions('booking', ['getAllAdvisingRequests']),
        ...mapActions('tours', ['getAllTour']),
        setActiveTab(tab) {
            this.activeTab = tab;
        }
    },
    async created() {
        await Promise.all([
            this.getAllAdvisingRequests(),
            this.getAllTour()
        ]);
    }
};
</script>
<style scoped>
.container1 {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 10px;
}

.tabs {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 20px;
}

.tab-links {
    margin-right: 20px;
    padding: 10px 0;
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.3s, color 0.3s;
}

.tab-links:active,
.tab-links:focus {
    opacity: 1.2;
    color: #003c71;
    font-weight: bold;
}
.tab-links.active {
    color: #003c71;
    font-weight: bold;
}
</style>