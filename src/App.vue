<template>
  <div v-if="mainStore.isLoged" class="app-body">
    <div class="header">
      <HeaderPage />
    </div>
    <main class="page-content">
      <RouterView />
    </main>
  </div>
  <div v-else class="login-page-wrapper">
    <div class="app-body login-page-card">
      <LoginView />
    </div>
  </div>
</template>

<script setup>
import HeaderPage from './components/HeaderPage.vue'
import LoginView from './views/LoginView.vue';
import { RouterView } from 'vue-router'
import { useMainStore } from './stores/mainStore';


const mainStore = useMainStore();
</script>

<style scoped>
.login-page-wrapper {
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-page-card {
  padding: 2rem;
  width: 800px;
}

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
  padding: 1rem;
}

@media (min-width: 600px) {
  .page-content {
    padding: 2rem;
  }
}
</style>
