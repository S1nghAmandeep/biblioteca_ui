<script setup>
import { onMounted, ref } from 'vue'

const clockElement = ref(null)

onMounted(() => {
  const $ = window.$;

  // Data di partenza
  const start = new Date();
  start.setDate(start.getDate());
  start.setHours(0, 0, 0, 0);

  const now = new Date();
  const diff = (now.getTime() - start.getTime()) / 1000;

  // Inizializza l'orologio FlipClock su clockElement
  $(clockElement.value).FlipClock(diff, {
    clockFace: 'HourlyCounter',
  });
});
</script>

<template>
  <main class="bg">
    <div class="clock" id="clock1" ref="clockElement"></div>
  </main>
</template>

<style>
#clock1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg {
  min-height: 67vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: white; */
  border-radius: 0.5rem;
}

@media (min-width: 720px) {

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
}
</style>