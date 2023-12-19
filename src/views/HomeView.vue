<script setup>
import WeatherContent from '@/components/WeatherContent.vue';
import WeatherHeader from '@/components/WeatherHeader.vue';

import { ref } from 'vue';

const title = ref('Weather App')

</script>

<template>
  <div class="container">
    <WeatherHeader class="header" v-bind:title="title"></WeatherHeader>
    <WeatherContent class="content"></WeatherContent>
  </div>
</template>

<style>
@import '../assets/base.css';

.container {
  margin: auto;
}
</style>
