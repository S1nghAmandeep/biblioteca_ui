<template>
  <main class="bg">
    <div class="clock" id="clock1" ref="clockElement"></div>
    <WeatherWidget />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import WeatherWidget from '@/components/weatherapp/WeatherWidget.vue';

const clockElement = ref(null);

onMounted(() => {

  // Data di partenza
  const start = new Date();
  start.setDate(start.getDate());
  start.setHours(0, 0, 0, 0);

  const now = new Date();
  const diff = (now.getTime() - start.getTime()) / 1000;
  const el = document.querySelector('.clock')

  // Inizializza l'orologio FlipClock su clockElement
  clockElement.value = new FlipClock(el, diff, {
    clockFace: 'HourlyCounter',
    showseconds: false,
  });
});
</script>


<style>
#clock1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0 3rem 0;
}

.bg {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.flip-clock-wrapper ul:nth-last-child(-n+2) {
  display: none;
}

.seconds {
  display: none;
}

@media (min-width: 720px) {

  .bg {
    min-height: 67vh;
    justify-content: center;
  }

  #clock1 {
    margin: initial;
  }

  .flip-clock-wrapper ul {
    height: 186px;
    width: 106px;
  }

  .flip-clock-wrapper ul li {
    line-height: 194px;
  }

  .flip-clock-wrapper ul li a div div.inn {
    font-size: 123px;
    font-weight: bold;
  }

  .flip-clock-wrapper ul li a div.up:after {
    top: 91px;
  }

  .flip-clock-wrapper ul:nth-last-child(-n+2) {
    display: block;
  }

  .seconds {
    display: block;
  }


}
</style>