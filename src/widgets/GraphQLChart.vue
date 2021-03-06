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
import WidgetContainer from '../components/WidgetContainer.vue';
import axios from 'axios';
import { JSONPath } from 'jsonpath-plus';
import { DateTime, Duration } from 'luxon';

export default defineComponent({
  components: { WidgetContainer },
  props: {
    url: {
      type: String,
      default: 'https://api.subquery.network/sq/byteslicer/interbtc',
    },
    query: { type: String, required: true },
    dataPath: { type: String, required: true },
    title: String,
  },
  setup(props) {
    const options = computed(() => ({
      chart: {
        id: 'graphql-chart',
        fontFamily: 'Work Sans',
        toolbar: {
          show: true,
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
        text: props.title,
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

    const getTimeseriesFromQueryResult = (data: any, path: string) => {
      const timeseries = JSONPath({ path, json: data, wrap: false });
      return timeseries.map((entry: any) => [entry.timestamp, entry.value]);
    };

    const fromDate = DateTime.now()
      .minus(Duration.fromObject({ days: 7 }))
      .toISO();

    axios
      .post(props.url, { query: props.query, variables: { fromDate } })
      .then(res => {
        const timeseries = getTimeseriesFromQueryResult(
          res.data,
          props.dataPath
        );

        series.value = [
          {
            name: 'Oracle Price',
            data: timeseries,
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
