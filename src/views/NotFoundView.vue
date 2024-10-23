<template>
    <div class="error">
        <h1>404</h1>
        <p>
            <FrownOutlined /> Oops... page not found.
        </p>
    </div>
</template>

<script setup>
import { FrownOutlined } from '@ant-design/icons-vue';


</script>

<style scoped>
.error {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: white; */
    border-radius: 0.5rem;
}

h1 {
    font-size: 10rem;
    margin-bottom: 0;
}

p {
    font-size: 3rem;
}
</style>