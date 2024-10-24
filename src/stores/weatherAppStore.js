import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherAppStore = defineStore('weatherAppStore', () => {

    const todayTemprature = ref([]);
    const weatherCode = ref([]);
    const lat = ref('');
    const log = ref('');
    const coordinate = ref('');
    const city = ref('');
    const time = ref([]);
    const weekWeather = ref([]);

    return { todayTemprature, weatherCode, lat, log, coordinate, city, time, weekWeather }
})
