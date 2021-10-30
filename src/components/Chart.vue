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
  <WidgetContainer>
    <vue3-chart-js
      id="test"
      ref="chartRef"
      type="line"
      :data="data"
      :options="options"
    ></vue3-chart-js>
  </WidgetContainer>
</template>

<script lang="ts">
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import { ref, defineComponent, Ref, computed, toRaw } from 'vue';
import axios from 'axios';
import WidgetContainer from './WidgetContainer.vue';

export default defineComponent({
  components: {
    Vue3ChartJs,
    WidgetContainer,
  },
  setup() {
    const chartRef: any = ref(null);
    const options = {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'timeseries',
        },
        y: {
          type: 'linear',
        },
      },
    };
    const series: Ref<any> = ref([]);
    const data: any = {
      datasets: [],
    };

    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly'
      )
      .then(res => {
        series.value = res.data.prices.map(([x, y]: any) => ({ x, y }));
        data.datasets = [
          {
            label: 'BTC/USD',
            data: series.value,
            fill: false,
            borderColor: '#00D8FF',
            tension: 0.5,
            backgroundColor: 'blue',
          },
        ];
        chartRef.value && chartRef.value.update();
      });

    return {
      chartRef,
      data,
      options,
    };
  },
});
</script>

<style></style>
