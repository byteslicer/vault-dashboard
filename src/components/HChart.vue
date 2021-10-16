<template>
  <Chart :options="options" />
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { Chart } from 'highcharts-vue'

const options = reactive({
  series: [{
    data: [] // sample data
  }],
  chart: {
    width: "100%",
    height: "100%",
  }
});


axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly').then((res) => {
  options.series = [{
          data: res.data.prices // sample data
  }];
})
</script>

<style>

</style>
