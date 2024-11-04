<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="description">Tiêu đề</label>
            <input type="text" placeholder="Nhập tiêu đề" required />
        </div>
        <div class="form-group">
            <label for="description">Nội dung</label>
            <textarea placeholder="Nhập nội dung" required></textarea>
        </div> 
        <button type="button" align="right">Trước</button>
        <button type="submit" align="right">Tiếp theo</button>
    </form>
</template>
<script>
export default {
    methods: {
        handleSubmit() {
            this.$store.commit('tours/setDescription', {
                title: this.title,
                content: this.content
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
    display: flex;
    flex-direction: row;
    font-size: 20px;
    justify-content: space-between;
    padding: 10px 2.5%;
    align-items: end;
}
.form-group label {
    width: 20%;
    display: block;
    text-align: left;
    font-weight: bold;
    justify-content: left;
}
.form-group textarea, .form-group input {
    width: 80%;
    padding: 5px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid gray;
}
.form-group textarea:focus, .form-group input:focus {
    outline: #003c71;
    border-bottom: 2px solid #003c71;
    transition: all 0.3s ease;
    transform: scale(1.01);
}
.form-group textarea::placeholder { 
    font-size: 16px;
    font-style: italic;
    align-items: flex-end;
}
button {
    margin-top: 20px;
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 0;
}
button[type="button"] {
    background-color: gray;
}
button[type="submit"] {
    background-color: #003c71;
}
</style>