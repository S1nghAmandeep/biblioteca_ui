<script setup>
import { PlusOutlined } from '@ant-design/icons-vue';

</script>
<template>
    <div>
        <a-float-button @click="click" :style="{ right: '24px' }">
            <template #icon>
                <PlusOutlined />
            </template>
        </a-float-button>
    </div>
</template>
<style></style>