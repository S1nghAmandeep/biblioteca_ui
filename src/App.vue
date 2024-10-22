<script setup>
import HeaderPage from './components/HeaderPage.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-body">
    <div class="header">
      <HeaderPage />
    </div>
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-body {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  backdrop-filter: blur(5px);
}

.header {
  border-bottom: 1px solid #dbd9db;
  flex-shrink: 0;
}

.page-content {
  flex-grow: 1;
  padding: 2rem;
}
</style>
