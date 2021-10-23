<template>
  <!-- <div style="height: 100%">
    <apexchart
      width="100%"
      type="line"
      :options="options"
      :series="series"
      @mouseover="setToolsVisible(true)"
      @mouseout="setToolsVisible(false)"
    ></apexchart>
  </div> -->
  <vue3-chart-js id="test" type="line" :data="data"></vue3-chart-js>
</template>

<script lang="ts">
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import { ref, defineComponent, Ref, computed, toRaw } from 'vue';
import axios from 'axios';

export default defineComponent({
  components: {
    Vue3ChartJs,
  },
  setup() {
    const data = computed(() => ({
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    }));

    const series: Ref<Record<string, any>> = ref([]);

    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly'
      )
      .then(res => {
        series.value = [
          {
            name: 'BTC/USD',
            data: res.data.prices,
          },
        ];
      });

    return {
      data,
    };
  },
});
</script>

<style></style>
