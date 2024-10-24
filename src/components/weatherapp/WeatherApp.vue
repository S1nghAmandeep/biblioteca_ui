<template>
    <div class="widget-wrapper">
        <div class="row">
            <div class="card">
                <div class="weather-tem col-6">
                    <h1 class="temprature">{{ store.todayTemprature[0] }}&deg;</h1>
                    <p class="place">{{ store.coordinate.display_name }}</p>
                </div>
                <div class="icon col-6">
                    <font-awesome-icon :icon="getWeatherIcons(store.weatherCode[0])" />
                    <p class="today">Today</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card-days">
                <div class="days" v-for="(weather, i) in store.weekWeather" :key="i">
                    <div class="sm-icon">
                        <font-awesome-icon :icon="getWeatherIcons(weather.iconCode)" />
                        {{ weather.maxTemp }}&deg;
                    </div>
                    <p class="days-text">{{ getDate(weather.timestamp) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWeatherAppStore } from '@/stores/weatherAppStore.js';
import { DateTime } from "luxon"
import { ref } from 'vue'

const store = useWeatherAppStore();

// Funzione per ottenere le icone del meteo
const getWeatherIcons = (weatherCode) => {
    switch (weatherCode) {
        case 0:
            return ['fas', 'sun']
        case 1:
        case 2:
        case 3:
            return ['fas', 'cloud-sun']
        case 45:
        case 48:
            return ['fas', 'smog']
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return ['fas', 'cloud-rain']
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return ['fas', 'cloud-showers-heavy']
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return ['fas', 'snowflake']
        case 80:
        case 81:
        case 82:
            return ['fas', 'cloud-showers-water']
        case 95:
        case 96:
        case 99:
            return ['fas', 'cloud-bolt']
        default:
            return ['fas', 'sun']
    }
}

// Funzione per ottenere la data formattata 
const getDate = (dateStr) => {
    return DateTime.fromFormat(dateStr, 'yyyy-LL-dd').toFormat('cccc')
}
</script>

<style scoped>
.col-4 {
    flex-basis: calc((100% / 12) * 4);
}

.col-5 {
    flex-basis: calc((100% / 12) * 5);
}

.col-6 {
    flex-basis: calc((100% / 12) * 6);
}

.widget-wapper {
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.row .card {
    width: auto;
    display: flex;
    justify-content: space-between;
}

.row .card .weather-tem {
    align-self: center;
}

.row .card .temprature {
    font-size: 4rem;
    color: #333333;
    margin: 0;
}

.row .card .place {
    font-size: 0.7rem;
    color: #333333;
    margin: 0 0 2rem;
}

.row .card .icon {
    font-size: 3rem;
    align-self: center;
    text-align: right;
    color: #333333;
}

.row .card .today {
    font-size: 1rem;
    text-align: right;
    color: #333333;
}

/* days card */

.row .card-days {
    margin-top: 2rem;
    width: 100%;
    height: 0rem;
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.row .card-days .days {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    color: #333333;
}

.row .card-days .days:last-child {
    border-right: none;
}

.row .card-days .sm-icon {
    font-size: 22px;
    color: #333333;
}

.row .card-days .days-text {
    font-size: 7px;
    color: #333333;
}

@media (min-width: 700px) {

    .row .card {
        width: 100%;
    }

    .row {
        justify-content: center;
    }

    .row .card .temprature {
        font-size: 8rem;
    }

    .row .card .place {
        font-size: 1rem;
        margin: 0 0 2rem;
    }

    .row .card .icon {
        font-size: 8rem;
    }

    .row .card .icon {
        font-size: 8rem;
    }

    .row .card .today {
        font-size: 1.5rem;
        padding-right: 2rem;
    }

    /* days card */

    .row .card-days .days {
        padding: 10px;
    }

    .row .card-days .sm-icon {
        font-size: 2rem;
    }

    .row .card-days .days-text {
        font-size: 1.4rem;
    }

    .row .card-days {
        height: 5rem;
    }


}
</style>