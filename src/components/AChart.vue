<template>
  <WidgetContainer>
    <apexchart
      width="100%"
      height="100%"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
  </WidgetContainer>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, computed } from 'vue';
import axios from 'axios';
import WidgetContainer from '../components/WidgetContainer.vue';

export default defineComponent({
  components: { WidgetContainer },
  setup() {
    const toolBarVisible = ref(false);
    const options = computed(() => ({
      chart: {
        id: 'vuechart-example',
        fontFamily: 'Work Sans',
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
      title: {
        text: 'BTC/USD',
        align: 'center',
      },
      yaxis: {
        labels: {
          formatter: (value: number) => value.toFixed(),
        },
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
        strokeDashArray: 2,
      },
    }));

    const series: Ref<Record<string, any>> = ref([]);

    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=hourly'
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
    };
  },
});
</script>

<style></style>
