<template>
    <div class="tab">
        <div class="tab-title">Danh sách yêu cầu</div>
        <div class="advising-component">
            <table>
                <thead>
                    <tr>
                        <th v-for="(header) in headers" :key="header.field">{{ header.label }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td v-for="header in headers" :key="header.field">
                            <span :class="getStatusClass(item.status)">
                                {{ item[header.field] }}
                            </span>
                        </td>
                        <td class="action-buttons">
                            <router-link :to="{ name: 'advisingDetailView', params: { id: item.id } }">
                                <button class="detail-button">Detail</button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        headers: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getStatusClass(status) {
            return {
                'status-replied': status === 'Đã xử lý',
                'status-pending': status === 'Đang chờ xử lý',
            }
        },
    }
};
</script>
<style scoped>
.tab {
    width: 100%;
    padding: 0 5%;
}

.tab-title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    padding: 10px 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead {
    background-color: #f4f4f4;
    color: #000;
    font-weight: bold;
}

th,
td {
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

th {
    background-color: #f4f4f4;
}

.status-pending {
    color: orange;
    font-weight: bold;
}

.status-replied {
    color: green;
    font-weight: bold;
}

.action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
}

button:hover {
    opacity: 0.8;
}

.detail-button {
    background-color: #003c71;
    color: white;
}
</style>