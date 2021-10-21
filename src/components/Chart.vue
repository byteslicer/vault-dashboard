<template>
  <apexchart
    width="100%"
    type="line"
    :options="options"
    :series="series"
    @mouseover="setToolsVisible(true)"
    @mouseout="setToolsVisible(false)"
  ></apexchart>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, computed, toRaw } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const toolBarVisible = ref(false);
    const options = computed(() => ({
      chart: {
        id: 'vuechart-example',
        background: 'var(--el-card-background-color)',
        foreColor: '#93A1A1',
        toolbar: {
          show: toolBarVisible.value,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: (value: number) => value.toFixed(),
        },
      },
      colors: [
        '#268BD2', // Blue
        '#D33682', // Magenta
        '#B58900', // Orange
        '#CB4B16', // Red
        '#DC322F', // Yellow
        '#6C71C4', // Violet
        '#2AA198', // Cyan
        '#859900', // Green
      ],
      theme: {
        mode: 'dark',
      },
      stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
      grid: {
        show: true,
        borderColor: '#586E75',
        strokeDashArray: 2,
      },
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

    const setToolsVisible = (visible: boolean) => {
      toolBarVisible.value = visible;
    };

    return {
      series,
      options,
      setToolsVisible,
    };
  },
});
</script>

<style></style>
