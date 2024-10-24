import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const isLoged = ref(true);

  return { count, doubleCount, increment, isLoged }
})
