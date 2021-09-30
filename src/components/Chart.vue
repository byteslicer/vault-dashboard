<template>
  <apexchart width="100%" height="100%" type="line" :options="options" :series="series"></apexchart>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const options = {
    chart: {
        id: 'vuechart-example',
    },
    xaxis: {
    type: 'datetime'
  }
    // xaxis: {
    //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    // }
};

const series = ref([]);


axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly').then((res) => {
  series.value = [{
    name: 'BTC/USD',
    data: res.data.prices
  }]
})
</script>

<style>

</style>
