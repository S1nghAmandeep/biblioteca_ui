<template>
    <WeatherApp />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
//   import HelloWorld from './components/HelloWorld.vue';
//   import { store } from './store.js'; 
import WeatherApp from './WeatherApp.vue';
import { useWeatherAppStore } from '@/stores/weatherAppStore';

const store = useWeatherAppStore();

// Funzione per ottenere le coordinate della città
const getCoordinate = () => {
    document.body.classList.add('blurred');
    axios.get('https://nominatim.openstreetmap.org/search?format=json&limit=3&q=' + 'castelgomberto')
        .then(res => {
            store.coordinate = res.data[0];

            axios.get('https://api.open-meteo.com/v1/forecast?&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon', {
                params: {
                    latitude: store.coordinate.lat,
                    longitude: store.coordinate.lon
                }
            }).then(res => {
                store.todayTemprature = res.data.daily.temperature_2m_max.map(num => Math.round(num));
                store.weatherCode = res.data.daily.weather_code;
                store.time = res.data.daily.time;

                store.weekWeather = res.data.daily.time.map((time, index) => ({
                    timestamp: time,
                    iconCode: res.data.daily.weather_code[index],
                    maxTemp: Math.round(res.data.daily.temperature_2m_max[index])
                }));

                store.weekWeather.shift(); // Rimuove il primo elemento
            });
        })
        .finally(() => {
            store.city = '';
            setTimeout(() => {
                document.body.classList.remove('blurred');
            }, 200);
        });
};

// Imposta la città predefinita su "Lonigo" e richiama getCoordinate() al montaggio del componente
onMounted(() => {
    // store.city = 'Lonigo';
    getCoordinate();
});
</script>

<style scoped>
.search {
    padding-bottom: 2rem;
}

.searchbar {
    width: 100%;
    padding-left: 0.5rem;
    height: 2rem;
    border-radius: 1rem;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>