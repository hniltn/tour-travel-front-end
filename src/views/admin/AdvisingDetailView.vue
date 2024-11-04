<template>
    <div class="container2">
        <div class="request-detail" v-if="advisingDetail">
            <div class="details_item">
                <span class="item_title">ID Request</span>
                <span class="item_value">{{ id }}</span>
            </div>
            <div class="details_item">
                <span class="item_title">Họ tên khách hàng</span>
                <span class="item_value">{{ advisingDetail.fullname }}</span>
            </div>
            <div class="details_item">
                <span class="item_title">Số điện thoại</span>
                <span class="item_value">{{ advisingDetail.phone }}</span>
            </div>
            <div class="details_item">
                <span class="item_title">Email</span>
                <span class="item_value">{{ advisingDetail.email }}</span>
            </div>
            <div class="details_item">
                <span class="item_title">Tên tour</span>
                <span class="item_value">{{ advisingDetail.tourName }}</span>
            </div>
            <div class="details_item">
                <span class="item_title">Ngày yêu cầu tư vấn</span>
                <span class="item_value">{{ advisingDetail.dateAdvisingRequest }}</span>
            </div>
            <div class="details_item">
                <span class="item_title">Trạng thái</span>
                <span class="item_value">
                    <span :class="getStatusClass(advisingDetail.status)">
                        {{ advisingDetail.status }}
                    </span>
                </span>
            </div>
            <div class="details_item">
                <span class="item_title">Yêu cầu khác</span>
                <span class="item_value">{{ advisingDetail.content }}</span>
            </div>
        </div>
        <div class="add-notice" v-if="advisingDetail">
            <h3>Phản hồi</h3>
            <div v-if="advisingDetail.isReplied === '0'">
                <div v-for="(response, index) in filteredResponses" :key="response.id" class="contact-detail">
                    <p>Lần: <span>{{ index + 1 }}</span></p>
                    <p>Ngày: <span>{{ response.date }}</span></p>
                    <p>Nhân viên liên hệ: <span>{{ getResponserName(response.responserId) }}</span></p>
                    <p>Nội dung: <span>{{ response.content }}</span></p>
                </div>
                <div class="response-container">
                    <advising-response-component v-for="(response, index) in responses" :key="index"
                        :response="response" :index="index" @update-response="updateResponse" />
                    <button v-if="filteredResponses.length && responses.length < 3" @click="addResponse"
                        class="add-response-button">
                        <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                        Thêm ngày liên hệ
                    </button>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="completed" name="completed" value="status" v-model="isCompleted">
                    <label for="completed">Đã hoàn thành tư vấn</label><br>
                </div>
                <button class="submit-btn" @click="completeAdvising">Hoàn thành</button>
            </div>
            <div v-if="advisingDetail.isReplied === '1'">
                <button @click="toggleContactDetails" class="toggle-details-button">
                    {{ showContactDetails ? 'Ẩn' : ' Hiển thị' }} chi tiết liên hệ
                </button>
                <div v-if="showContactDetails">
                    <div v-for="(response, index) in filteredResponses" :key="response.id" class="contact-detail">
                        <p>Lần: <span>{{ index + 1 }}</span></p>
                        <p>Ngày: <span>{{ response.date }}</span></p>
                        <p>Nhân viên liên hệ: <span>{{ getResponserName(response.responserId) }}</span></p>
                        <p>Nội dung: <span>{{ response.content }}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdvisingResponseComponent from '@/components/admin/components/AdvisingResponseComponent.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'advisingDetailView',
    props: ['id'],
    components: {
        AdvisingResponseComponent
    },
    data() {
        return {
            responses: [{ date: '', content: '', responserId: '' }],
            showContactDetails: false,
            isCompleted: false
        }
    },
    computed: {
        ...mapGetters('booking', ['allAdvisingRequests', 'allAdvisingResponses']),
        ...mapGetters('tours', ['tourById']),
        ...mapGetters('auth', ['user', 'allUsers']),
        advisingDetail() {
            const request = this.allAdvisingRequests.find(request => request.id === this.id);
            if (request) {
                const tour = this.tourById(request.tourId);
                return {
                    ...request,
                    tourName: tour ? tour.name : "Unknown Tour",
                    status: request.isReplied === '1' ? 'Đã xử lý' : 'Đang chờ xử lý'
                };
            }
            return null;
        },
        filteredResponses() {
            return this.allAdvisingResponses.filter(response => response.advisingRequestId === this.id);
        }
    },
    async created() {
        await Promise.all([
            this.getAllAdvisingRequests(),
            this.getAllAdvisingResponses(),
            this.getAllTour(),
            this.getAllUsers() // Đảm bảo gọi hành động này để tải allUsers
        ]);
        this.fetchAdvisingDetail();
    },
    methods: {
        ...mapActions('booking', ['getAllAdvisingRequests', 'createAdvisingResponse', 'updateAdvisingRequest', 'getAllAdvisingResponses']),
        ...mapActions('tours', ['getAllTour']),
        ...mapActions('auth', ['getAllUsers']),
        fetchAdvisingDetail() {
            this.advisingDetail = this.allAdvisingRequests.find(request => request.id === this.id);
        },
        getStatusClass(status) {
            return {
                'status-replied': status === 'Đã xử lý',
                'status-pending': status === 'Đang chờ xử lý',
            }
        },
        addResponse() {
            const existingResponses = this.allAdvisingResponses.filter(response => response.advisingRequestId === this.id);
            if (existingResponses.length + this.responses.length >= 3) {
                alert('Không thể thêm quá 3 phản hồi cho một yêu cầu tư vấn.');
                return;
            }
            this.responses.push({ date: '', content: '', responserId: '' });
        },
        updateResponse(index, response) {
            this.responses[index] = response;
        },
        toggleContactDetails() {
            this.showContactDetails = !this.showContactDetails;
        },
        async completeAdvising() {
            try {
                const existingResponses = this.allAdvisingResponses.filter(response => response.advisingRequestId === this.id);
                if (existingResponses.length + this.responses.length > 3) {
                    alert('Không thể thêm quá 3 phản hồi cho một yêu cầu tư vấn.');
                    return;
                }
                for (const response of this.responses) {
                    await this.createAdvisingResponse({
                        advisingRequestId: this.id,
                        date: response.date,
                        content: response.content,
                        responserId: this.user.id
                    });
                }
                await this.updateAdvisingRequest({
                    id: this.id,
                    isReplied: this.isCompleted ? '1' : '0'
                });
                this.fetchAdvisingDetail();
                alert('Thông tin đã được lưu thành công!');
            } catch (error) {
                console.error('Error completing advising:', error);
                alert('Đã xảy ra lỗi khi lưu thông tin.');
            }
        },
        getResponserName(responserId) {
            if (!this.allUsers || this.allUsers.length === 0) {
                console.error('allUsers is not defined or empty');
                return 'Unknown User';
            }
            const responser = this.allUsers.find(user => user.id === responserId);
            return responser ? responser.fullname : 'Unknown User';
        }
    }
}
</script>
<style scoped>
.container2 {
    padding: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    overflow-y: auto;
    height: 100%;
}

.request-detail {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.details_item {
    display: flex;
    margin-bottom: 10px;
    text-align: left;
    line-height: 2;
}

.details_item .item_title {
    font-weight: bold;
    width: 35%;
}

.details_item .item_value {
    width: 65%;
    font-weight: 600;
}

.status-pending {
    padding: 5px 10px;
    background-color: orange;
    color: white;
    border: 1px solid orange;
    border-radius: 8px;
    font-weight: bold;
    font-style: italic;
}

.status-replied {
    padding: 5px 10px;
    background-color: green;
    color: white;
    border: 1px solid green;
    border-radius: 8px;
    font-weight: bold;
    font-style: italic;
}

.add-notice {
    width: 40%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: #fff;
    line-height: 1.5;
    text-align: left;
}

.add-notice h3 {
    font-size: 40px;
    margin-bottom: 10px;
}

.add-notice textarea {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.add-notice .checkbox {
    padding: 10px 0;
}

.add-notice .checkbox input {
    margin-right: 10px;
}

.add-notice .checkbox label {
    font-size: 18px;
}

.add-notice .send-button {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
}

.toggle-details-button {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background-color: #003c71;
    color: white;
    cursor: pointer;
}

.toggle-details-button:hover {
    background-color: #002a50;
}

.contact-detail {
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.contact-detail span {
    font-weight: bold;
    font-style: italic;
}
.add-response-button {
    width: 50%;
    margin-left: 25%;
    background-color: #003c71;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
}
.submit-btn {
    width: 50%;
    margin-left: 25%;
    background-color: #003c71;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
}
</style>
