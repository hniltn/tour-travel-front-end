<template>
    <the-header></the-header>
    <div class="admin-layout">
        <router-view></router-view>
    </div>
</template>
<script>
import TheHeader from '@/components/admin/layout/TheHeader.vue';
export default {
    components: {
        TheHeader
    }
}
</script>
<style scoped>
.admin-layout {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    width: calc(100% - 250px);
    position: fixed;
    top: 70px;
    left: 250px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    margin-bottom: 10px;
}
</style>