<template>
    <div class="container3">
        <div class="date-response">
            <div class="date-reply">
                <p>Ngày liên hệ:</p>
                <div class="input">
                    <input type="date" :value="localResponse.date || ''" :min="today"
                        @change="updateDate($event.target.value)" />
                </div>
            </div>
            <div class="response-content">
                <textarea v-model="localResponse.content" placeholder="Nhập nội dung đã tư vấn ..." @input="updateContent"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        response: {
            type: Object,
            default: () => ({ date: '', content: '' })
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            today: new Date().toISOString().split('T')[0],
            localResponse: { ...this.response }
        };
    },
    methods: {
        updateDate(date) {
            this.localResponse.date = date;
            this.$emit('update-response', this.index, {...this.localResponse});
        },
        updateContent(event) {
            this.localResponse.content = event.target.value;
            this.$emit('update-response', this.index, {...this.localResponse});
        },
    }
};
</script>
<style scoped>
.container3 {
    padding: 20px;
    background-color: whitesmoke;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 100%;
    overflow-y: auto;
}
.date-response {
    margin-bottom: 15px;
}
.date-reply {
    display: flex;
    width: 100%;
}
.date-reply p {
    margin-right: 10px;
    font-weight: bold;
    width: 50%;
}
.date-reply .input {
    margin-bottom: 10px;
    border-radius: 8px;
    width: 50%;
}
.date-reply .input input {
    width: 100%;
    border-radius: 8px;
}
.date-response .response-content {
    width: 100%;
}
.date-response .response-content textarea {
    width: 100%;
    border-radius: 8px;
}
.add-response-button {
    background-color: #003c71;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-response-button:hover {
    background-color: #002a50;
}
</style>