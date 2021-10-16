<template>
  <apexchart
    width="100%"
    :height="heightPx"
    type="line"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
import { inject, ref, watch, computed } from 'vue';
import axios from 'axios';

export default {
  setup(props) {
    const height = ref(300 - 80);
    const heightPx = computed(() =>
      height.value ? `${height.value}px ` : '100px'
    );

    const grid = inject('Grid');

    watch(grid, grid => {
      if (!grid) {
        return;
      }

      grid.on('resizestop', function(event, el) {
        if (el.id === props.gridId) {
          height.value = el.clientHeight - 80;
          console.log('resize');
        }
      });
    });

    const options = {
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        type: 'datetime',
      },
      // xaxis: {
      //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      // }
    };

    const series = ref([]);

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
      series,
      options,
      heightPx,
    };
  },
};
</script>

<style></style>
